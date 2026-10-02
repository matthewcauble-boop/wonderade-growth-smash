// Address picker regression test (mobile viewport, fake Google Places, signup API stubbed - nothing reaches Klaviyo).
//   npm run dev  (another terminal), then: node tests/address_picker.mjs [http://localhost:3000]
import { chromium, devices } from "playwright";
const BASE = process.argv[2] || "http://localhost:3000";
const FAKE_MAPS = `
window.google = { maps: { importLibrary: async () => ({
  AutocompleteSuggestion: { fetchAutocompleteSuggestions: async ({ input }) => ({ suggestions: [
    { placePrediction: { placeId: "p1", text: { text: "123 Main St, Austin, TX, USA" } } },
    { placePrediction: { placeId: "p2", text: { text: "123 Main Ave, Dallas, TX, USA" } } } ] }) },
  Place: function ({ id }) { this.fetchFields = async () => { this.addressComponents = id === "p1"
    ? [{ types: ["street_number"], longText: "123" }, { types: ["route"], longText: "Main St" }, { types: ["locality"], longText: "Austin" },
       { types: ["administrative_area_level_1"], shortText: "TX" }, { types: ["postal_code"], longText: "78701" }]
    : []; }; } }) } };
if (window.__gmCallback) window.__gmCallback();`;
const results = []; const check = (name, ok, extra = "") => { results.push([name, ok]); console.log(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`); };
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
let sent = null;
await page.route("**/api/klaviyo", async r => { sent = JSON.parse(r.request().postData()); await r.fulfill({ status: 200, body: "{}" }); });
await page.route("**/share**", r => r.fulfill({ status: 200, body: "ok" }));
// the Maps loader injects a script tag; answer it with the fake and fire its callback
await page.route(/maps\.googleapis\.com\/maps\/api\/js/, async r => {
  const cb = new URL(r.request().url()).searchParams.get("callback");
  await r.fulfill({ status: 200, contentType: "text/javascript", body: FAKE_MAPS + (cb ? `\n;(${cb.split(".").reduce((a, k) => a + "[" + JSON.stringify(k) + "]", "window")})()` : "") });
});
await page.goto(`${BASE}/claim?email=${encodeURIComponent("qa+picker@example.com")}`);
const street = page.getByPlaceholder("START TYPING ADDRESS...");
await street.waitFor({ timeout: 30000 });
const list = page.getByText(/123 Main (St|Ave), /);
// 1. typing opens the list; tapping outside closes it
await street.fill("123 Main");
await page.waitForTimeout(300);
check("list opens while typing", await list.count() > 0);
await page.getByRole("heading", { name: /Step 2/ }).tap();
await page.waitForTimeout(250);
check("tap outside closes the list", await list.count() === 0);
// 2. Escape closes it too
await street.fill("123 Main S"); await page.waitForTimeout(300);
await street.press("Escape"); await page.waitForTimeout(150);
check("Escape closes the list", await list.count() === 0);
// 3. "not listed" lets you type it by hand
await street.fill("123 Main"); await page.waitForTimeout(300);
check("'address isn't listed' option shown", await page.getByText(/address isn.t listed/i).count() === 1);
// 4. pick a suggestion: fields fill, list closes, box shows the street line
await page.getByText("123 Main St, Austin, TX, USA").tap(); await page.waitForTimeout(300);
check("pick closes the list", await list.count() === 0);
check("pick fills the street line", await street.inputValue() === "123 Main St", await street.inputValue());
check("pick fills city/state/zip", await page.getByPlaceholder("CITY").inputValue() === "Austin" && await page.getByPlaceholder("ZIP").inputValue() === "78701");
// 5. retyping the street after a pick clears the old city/state/zip (the wrong-address bug)
await street.fill("456 Oak Rd"); await page.waitForTimeout(300);
check("retyping after a pick clears city/state/zip", await page.getByPlaceholder("CITY").inputValue() === "" && await page.getByPlaceholder("ZIP").inputValue() === "");
await page.keyboard.press("Escape");
// 6. manual entry submits exactly what was typed (and the unit)
await page.getByPlaceholder("FIRST NAME").fill("Test"); await page.getByPlaceholder("LAST NAME").fill("Picker");
await page.getByPlaceholder("APT / UNIT (OPTIONAL)").fill("Apt 4B");
await page.getByPlaceholder("CITY").fill("Round Rock"); await page.getByPlaceholder("ST", { exact: true }).fill("TX"); await page.getByPlaceholder("ZIP").fill("78664");
await page.getByRole("button", { name: /CONFIRM ADDRESS/ }).tap();
await page.waitForTimeout(800);
check("submits the street the customer typed", sent && sent.address === "456 Oak Rd", JSON.stringify(sent));
check("submits the unit", sent && sent.address2 === "Apt 4B");
check("submits the typed city/state/zip", sent && sent.city === "Round Rock" && sent.state === "TX" && sent.postalCode === "78664");
check("flags a hand-typed address", sent && sent.addressPicked === false);
await browser.close();
const failed = results.filter(r => !r[1]).length;
console.log(failed ? `${failed} FAILED` : "ALL PASSED"); process.exit(failed ? 1 : 0);
