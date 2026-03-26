const apiKey = "AIzaSyAh1i2DRHurSJ4fKR5E5RtYAZyRkW9NqNM";
const url = "https://places.googleapis.com/v1/places:autocomplete";

async function runHealthCheck() {
    process.stdout.write("Initializing Google Maps Core Sentinel...\n");
    let elapsedMinutes = 0;
    
    while(elapsedMinutes < 30) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "suggestions.placePrediction.text"
                },
                body: JSON.stringify({ input: "1600 Amphitheatre" })
            });

            if (response.ok) {
                process.stdout.write(`\n[SUCCESS] Google Firewall CLEARED after ${elapsedMinutes} minute(s)! Autocomplete is physically active.\n`);
                process.exit(0);
            } else {
                const data = await response.json();
                process.stdout.write(`\n[${elapsedMinutes}m elapsed] API still blocking: ${data?.error?.message}`);
            }
        } catch(error) {
            process.stdout.write(`\n[${elapsedMinutes}m elapsed] Diagnostics error: ${error.message}`);
        }
        
        elapsedMinutes++;
        await new Promise(r => setTimeout(r, 60000));
    }
    
    process.stdout.write("\n[TIMEOUT] 30 minutes elapsed. Diagnostics suspended.\n");
    process.exit(1);
}

runHealthCheck();
