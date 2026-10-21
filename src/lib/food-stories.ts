// Food Stories: short, sourced videos with Major Orange and Princess Punch.
//
// The transcript, sources and accuracy notes come from the ops vault (marketing/food-stories/NN-slug/SCRIPT.md and
// lines.json) via content/food-stories/episodes.json. Regenerate that file from the vault rather than editing it here.
// This file adds the web layer: URL, page title, summary, FAQ and the YouTube id once an episode is uploaded.
//
// Rules for anything written here: plain English, facts only from the episode's sources, and no claim that Wonderade
// (or any food) prevents or treats illness. Episode 16 (zinc) is about colds, so it is a standalone article: no product
// call to action, and it is never linked from product pages or listed as "related" on other episodes.
import { marked } from "marked"
import raw from "../../content/food-stories/episodes.json"

type RawEpisode = {
    num: string
    dir: string
    title: string
    transcript: string[]
    sourcesMd: string
    notesMd: string
}

export type EpisodeKind = "Why does...?" | "Ingredient origin" | "Food brand history"

export type EpisodeMeta = {
    num: string
    slug: string
    seoTitle: string
    description: string
    kind: EpisodeKind
    summary: string
    keyFacts: string[]
    faq: { question: string; answer: string }[]
    youtubeId?: string
    uploadDate?: string
    durationSeconds?: number
    // false = standalone article: no product CTA, excluded from product-adjacent links and "related" lists.
    productLinks: boolean
}

export type Episode = EpisodeMeta & {
    title: string
    transcript: string[]
    sourcesHtml: string
    notesHtml: string
    poster: string
    datePublished: string
}

// Scripts were researched and checked between 2026-10-11 and 2026-10-14.
const PUBLISHED = "2026-10-14"

const META: EpisodeMeta[] = [
    {
        num: "01",
        slug: "do-carrots-give-you-night-vision",
        seoTitle: "Do Carrots Give You Night Vision? The WWII Story Behind the Myth",
        description:
            "The carrot night-vision myth started in WWII Britain, when radar needed a cover story. What carrots really do for eyes, and why the first carrots were purple.",
        kind: "Why does...?",
        summary:
            "Eating carrots will not give anyone super night vision. The idea spread in Britain during World War II, when night-fighter pilot John Cunningham was nicknamed \"Cat's Eyes\" and newspapers were told pilots ate lots of carrots. The real secret was a new airborne radar. Carrots do supply the body with vitamin A, which the eyes need to see in dim light, so they help people who are low on it.",
        keyFacts: [
            "Cunningham later said the \"Cat's Eyes\" nickname was made up to hide radar.",
            "Vitamin A matters for seeing in dim light; extra carrots don't improve vision in people who already get enough.",
            "The first farmed carrots, in Central Asia, were purple and yellow. Orange carrots appeared in Europe around the 1500s.",
            "Carrot historians say there is no proof the Dutch bred orange carrots to honor William of Orange.",
        ],
        faq: [
            {
                question: "Do carrots really improve your eyesight?",
                answer: "Only if you are low on vitamin A. Carrots provide beta carotene, which the body turns into vitamin A, and the eyes need vitamin A to see in dim light. People who already get enough won't see better by eating more.",
            },
            {
                question: "Where did the carrots and night vision myth come from?",
                answer: "World War II Britain. Pilot John Cunningham's success at night was put down to carrots in the press, while the real reason was a new airborne radar. Britain also had a carrot surplus and ran posters saying carrots help you see in the blackout.",
            },
            {
                question: "What color were the first carrots?",
                answer: "Purple and yellow. Genetic and historical studies place the first farmed carrots in Central Asia; orange carrots showed up in Europe around the 16th century.",
            },
        ],
        productLinks: true,
    },
    {
        num: "02",
        slug: "why-does-cilantro-taste-like-soap",
        seoTitle: "Why Does Cilantro Taste Like Soap to Some People?",
        description:
            "About 1 in 7 people in one big study said cilantro tastes like soap. The smell chemicals, the gene near a smell receptor, and why genes are only part of it.",
        kind: "Why does...?",
        summary:
            "Cilantro is full of smell chemicals called aldehydes, and soap makers often use aldehydes too. In a 2012 study of about 14,600 people, almost 2,000 said fresh cilantro tastes like soap. The soap tasters were more likely to carry a small DNA change next to a group of smell receptor genes, but the genes researchers could measure explained only a small part of the difference.",
        keyFacts: [
            "1,994 of 14,604 people (about 1 in 7) in one study said cilantro tastes like soap.",
            "A DNA variant near smell receptor genes, including OR6A2, was linked to the soapy taste.",
            "Scientists think the difference is mostly smell, not taste.",
            "In a Toronto study, dislike ranged from about 21% of East Asian young adults to about 3% of Middle Eastern young adults.",
        ],
        faq: [
            {
                question: "Why does cilantro taste like soap?",
                answer: "Cilantro contains aldehydes, the same family of smell chemicals often used to scent soap. Some people's noses pick up those smells more strongly, so the leaf reads as soapy.",
            },
            {
                question: "Is the soapy cilantro taste genetic?",
                answer: "Partly. A 2012 study linked it to a DNA variant near smell receptor genes, but the genes the researchers could measure explained only a small part of who tastes soap.",
            },
            {
                question: "How many people think cilantro tastes like soap?",
                answer: "In the largest study, about 1 in 7 people of European ancestry said yes. A Toronto study found dislike of cilantro varied by background, from about 3% to about 21%.",
            },
        ],
        productLinks: true,
    },
    {
        num: "03",
        slug: "what-is-brain-freeze",
        seoTitle: "What Is Brain Freeze? What Happens and How to Stop It",
        description:
            "Brain freeze isn't your brain freezing. What a 2012 blood-flow study saw, the kid-led ice cream study, and two simple ways to make it stop.",
        kind: "Why does...?",
        summary:
            "Brain freeze is the sharp forehead pain you get from cold food or drink hitting the roof of your mouth. Doctors call it sphenopalatine ganglioneuralgia. In a small 2012 study, a large blood vessel near the front of the brain widened when the pain started and narrowed as it faded. Scientists are still working out exactly why it hurts. It usually passes in seconds and is not harmful.",
        keyFacts: [
            "Your brain does not freeze; blood vessels in the head react to sudden cold.",
            "A 2002 study led by a 13-year-old found fast ice cream eaters got brain freeze about twice as often as slow eaters (27% vs 13%).",
            "Pressing your tongue or thumb to the roof of your mouth, or sipping something not cold, can help it pass.",
        ],
        faq: [
            {
                question: "What causes brain freeze?",
                answer: "Something icy touches the roof of the mouth and the blood vessels in the head react to the sudden cold. In one small study, an artery near the front of the brain widened as the pain began.",
            },
            {
                question: "How do you stop brain freeze fast?",
                answer: "Press your tongue or thumb against the roof of your mouth, or sip something warm or room temperature. It usually goes away within seconds.",
            },
            {
                question: "Is brain freeze dangerous?",
                answer: "No. Cleveland Clinic describes it as not serious and short-lived. Frequent long headaches are a different matter and worth asking a doctor about.",
            },
        ],
        productLinks: true,
    },
    {
        num: "04",
        slug: "are-bananas-radioactive",
        seoTitle: "Are Bananas Radioactive? The Banana Equivalent Dose, Explained",
        description:
            "Bananas contain a tiny amount of radioactive potassium-40, and so do you. Why it's harmless, what the banana equivalent dose is, and which foods have more.",
        kind: "Why does...?",
        summary:
            "Yes, a tiny bit. Bananas are rich in potassium, and a small fraction of all potassium is the radioactive form potassium-40. One banana gives about 0.1 microsieverts, and you would need to eat about 100 bananas to match the natural background radiation a person in the United States gets each day. Your body keeps its potassium level steady, so bananas don't build up radiation inside you.",
        keyFacts: [
            "All plants and animals, including people, contain some potassium-40.",
            "The banana equivalent dose (about 0.1 microsieverts) is an informal comparison unit.",
            "Carrots and potatoes have almost as much potassium-40 as bananas; lima beans and Brazil nuts have more.",
            "The EPA says these foods do not pose a radiation risk.",
        ],
        faq: [
            {
                question: "Are bananas radioactive?",
                answer: "Slightly. They contain potassium, and a small fraction of potassium is radioactive potassium-40. The EPA says this does not pose a radiation risk.",
            },
            {
                question: "How many bananas would it take to be dangerous?",
                answer: "Bananas don't build up radiation in your body, because the body keeps potassium steady and gets rid of the extra. About 100 bananas equal one ordinary day of natural background radiation in the US.",
            },
            {
                question: "What is the banana equivalent dose?",
                answer: "An informal unit of about 0.1 microsieverts, the dose often credited to eating one banana. Scientists use it to make tiny radiation amounts easier to picture.",
            },
        ],
        youtubeId: "fKXQo_FQKuU",
        uploadDate: "2026-10-13T06:44:33-07:00",
        durationSeconds: 100,
        productLinks: true,
    },
    {
        num: "05",
        slug: "why-do-kids-love-sweet",
        seoTitle: "Why Do Kids Love Sweet So Much? The Science of the Sweet Tooth",
        description:
            "Kids are born liking sweet and prefer it about 50% sweeter than adults. What the bliss point is, why it drops in the teen years, and what shapes it.",
        kind: "Why does...?",
        summary:
            "Babies are born liking sweet tastes, which helps draw them to milk. Children also have a higher \"bliss point\", their favorite level of sweetness. In a 2020 study, kids and teens preferred sugar water about 50% sweeter than adults did. One idea is that growing bodies need lots of energy. Most people's preference settles to adult levels by the late teens, and early tastes can shape later likes.",
        keyFacts: [
            "Adults in a 2020 study liked about 8 sugar cubes in a glass of water; kids and teens liked about 12.",
            "In one study, teens whose bones were growing less tended to like sugar less.",
            "Children were better than their mothers at telling which blueberries were sweeter.",
            "A lot of a kid's sweet tooth is biology, not a lack of willpower.",
        ],
        faq: [
            {
                question: "Why do kids like sweet foods more than adults?",
                answer: "Children are born preferring sweet and have a higher bliss point than adults. Researchers think this may relate to a growing body's need for energy. The preference usually declines to adult levels in the late teens.",
            },
            {
                question: "What is a bliss point?",
                answer: "The level of sweetness a person likes best. In a 2020 study, kids' and teens' bliss point was about 50% sweeter than adults'.",
            },
            {
                question: "Can you change a child's taste for sweet?",
                answer: "Research from the Monell Chemical Senses Center suggests early taste experiences help shape what children like later on.",
            },
        ],
        productLinks: true,
    },
    {
        num: "06",
        slug: "edmond-albius-vanilla",
        seoTitle: "Edmond Albius: The 12-Year-Old Who Cracked Vanilla Pollination",
        description:
            "Why real vanilla is expensive, and how Edmond, an enslaved 12-year-old on Réunion, worked out the hand-pollination method farmers still use.",
        kind: "Ingredient origin",
        summary:
            "Vanilla comes from an orchid native to Mexico, where bees pollinate it. Planted elsewhere, the vines flowered but made hardly any beans. In 1841 on the island of Réunion, Edmond, an enslaved 12-year-old, worked out a quick way to pollinate each flower by hand with a thin stick and his thumb. Farmers still use his method, one flower at a time, which is a big part of why real vanilla costs so much.",
        keyFacts: [
            "Each vanilla flower can be pollinated for only a few hours.",
            "Pods grow for about eight months, then are cured for months more.",
            "A botanist later claimed Edmond copied him; historians who studied the letters say Edmond worked it out himself.",
            "Edmond became free in 1848 when France abolished slavery in its colonies. He was never paid for his discovery.",
        ],
        faq: [
            {
                question: "Who discovered how to hand-pollinate vanilla?",
                answer: "Edmond Albius, a 12-year-old enslaved boy on Réunion, in 1841. A Belgian professor had pollinated vanilla in a lab in 1837, but Edmond's fast method is the one farmers use.",
            },
            {
                question: "Why is real vanilla so expensive?",
                answer: "Outside Mexico every flower has to be pollinated by hand within a few hours, the pods take about eight months to grow, and curing takes months more.",
            },
            {
                question: "Where does vanilla come from?",
                answer: "Vanilla is an orchid native to Mexico. The vanilla bean is the pod that grows after the flower is pollinated.",
            },
        ],
        productLinks: true,
    },
    {
        num: "07",
        slug: "ketchup-history-fish-sauce",
        seoTitle: "Ketchup Was Fish: The Strange History of Ketchup",
        description:
            "The first ketchups had no tomatoes. How a fish sauce became a tomato sauce, plus the 1830s tomato pill craze that fizzled by 1850.",
        kind: "Ingredient origin",
        summary:
            "Food historians think ketchup began as a salty fish sauce made by Chinese communities in Southeast Asia, with a name that sounded like \"ke-tsiap\". British and Dutch sailors brought the idea home in the 1600s, and British cooks made ketchups from mushrooms, walnuts, oysters and anchovies. A Philadelphia doctor printed a tomato ketchup recipe in 1812. In the 1830s, tomato pills were sold as cure-alls; tests found some had no tomato at all.",
        keyFacts: [
            "Early English ketchups were made from mushrooms, walnuts, oysters and anchovies.",
            "James Mease published the first known tomato ketchup recipe in 1812.",
            "\"Dr. Miles' Compound Extract of Tomato\" pills were popular in the late 1830s; the craze was over by about 1850.",
            "In Indonesian, soy sauce is called kecap.",
        ],
        faq: [
            {
                question: "What was ketchup originally made from?",
                answer: "Fish. The early sauce was a brine of pickled fish. British cooks later made ketchups from mushrooms, walnuts and oysters, and tomato ketchup came in the 1800s.",
            },
            {
                question: "When was tomato ketchup invented?",
                answer: "The first known tomato ketchup recipe was published by Philadelphia doctor James Mease in 1812.",
            },
            {
                question: "Were tomatoes once sold as medicine?",
                answer: "Yes. In the 1830s tomato pills were advertised as remedies for many complaints. Critics found some contained no tomato, and the craze ended around 1850.",
            },
        ],
        productLinks: true,
    },
    {
        num: "08",
        slug: "chocolate-history-cacao-money",
        seoTitle: "When Chocolate Was Money: The History of Cacao",
        description:
            "Chocolate started as a bitter, foamy drink, and cacao beans were used as money. A 1545 price list, the Ecuador find, and how sugar changed everything.",
        kind: "Ingredient origin",
        summary:
            "People in Mexico and Central America have drunk cacao for more than 3,500 years, and the oldest traces found so far come from Ecuador, about 5,300 years ago. The drink was bitter, frothy and often spiced with chili. Cacao beans were valuable enough to use as money: a 1545 price list from Tlaxcala, Mexico, priced a turkey egg at 3 beans. Europeans added sugar, and factories later made chocolate cheap.",
        keyFacts: [
            "The Olmec, Maya and Aztecs all drank cacao; the Aztecs did not invent it.",
            "Cacao drinks were poured from cup to cup to raise a foam.",
            "Counterfeiters hollowed out beans and filled them with sand.",
            "One European traveler said it seemed like a drink for pigs, until sugar was added.",
        ],
        faq: [
            {
                question: "Did the Aztecs invent chocolate?",
                answer: "No. Older peoples, including the Olmec, drank cacao long before the Aztecs, and the oldest known cacao use is in Ecuador, about 5,300 years ago.",
            },
            {
                question: "Were cacao beans really used as money?",
                answer: "Yes. Cacao was one of several currencies in the region. A 1545 price list from Tlaxcala, Mexico, set a turkey egg at 3 beans and a good turkey hen at 100.",
            },
            {
                question: "What did early chocolate taste like?",
                answer: "Bitter and foamy, with no sugar. It was often flavored with chili, corn, vanilla or flowers.",
            },
        ],
        productLinks: true,
    },
    {
        num: "09",
        slug: "pineapple-status-symbol-history",
        seoTitle: "The Pineapple You Couldn't Eat: Pineapples as a Status Symbol",
        description:
            "In 1700s Britain a pineapple took years to grow in a heated greenhouse, so it was shown off, not eaten. The rental story and the Dunmore Pineapple.",
        kind: "Ingredient origin",
        summary:
            "Pineapples come from South America and could not grow outdoors in cold Britain. In the 1700s, wealthy families built heated greenhouses called pineries, and each plant took three or four years to make one fruit. A fine pineapple might sit on dinner tables for weeks as a display. Writers say some shops rented pineapples out for parties, though no old rental receipt has turned up.",
        keyFacts: [
            "Gardeners tended pinery stoves, sometimes sleeping beside the plants.",
            "Prize pineapples were sometimes eaten only once they began to rot.",
            "The Dunmore Pineapple in Scotland, a garden building topped with a giant stone pineapple, dates from 1761 and you can stay inside it.",
        ],
        faq: [
            {
                question: "Why were pineapples a status symbol?",
                answer: "In 18th-century Britain they needed years of constant heat in special greenhouses to grow, so owning one showed great wealth.",
            },
            {
                question: "Did people really rent pineapples?",
                answer: "Probably. A historian who wrote a book on pineapples says some confectioners rented them out by the day, but no period rental record has been published.",
            },
            {
                question: "Where do pineapples come from?",
                answer: "South America. Kew Gardens places the cultivated pineapple's origin in Brazil and Paraguay.",
            },
        ],
        productLinks: true,
    },
    {
        num: "10",
        slug: "who-invented-the-popsicle",
        seoTitle: "Who Really Invented the Popsicle? The Legend and the Court Case",
        description:
            "The famous story says 11-year-old Frank Epperson invented the popsicle in 1905. What the record shows: a 1924 patent, lawsuits, and a legend.",
        kind: "Food brand history",
        summary:
            "The story everybody tells is that in 1905, near San Francisco, 11-year-old Frank Epperson left a drink outside with a stick in it and found it frozen by morning. Nobody wrote that night down at the time. What is documented is Epperson's 1924 patent for a frozen treat on a wooden stick and the lawsuits that followed, in which rivals said others had made frozen treats on sticks before him. The National Archives says the popsicle's birth belongs in legends.",
        keyFacts: [
            "Epperson first called it the \"Epsicle\".",
            "US Patent 1,505,592 for a frozen confection on a stick was granted in 1924.",
            "His own children called them \"Pop's sicles\", which is where the name came from.",
        ],
        faq: [
            {
                question: "Who invented the popsicle?",
                answer: "Frank Epperson patented the frozen treat on a stick in 1924. The story that he invented it as an 11-year-old in 1905 is popular but unverified.",
            },
            {
                question: "Is the popsicle origin story true?",
                answer: "It can't be confirmed. The 1905 date entered the record during 1920s patent lawsuits, and the National Archives calls the popsicle's birth a legend.",
            },
            {
                question: "Where does the name popsicle come from?",
                answer: "Epperson's children called the treats \"Pop's sicles\". He had first named them Epsicles.",
            },
        ],
        youtubeId: "MIv4Yaa8e7I",
        uploadDate: "2026-10-14T05:54:59-07:00",
        durationSeconds: 108,
        productLinks: true,
    },
    {
        num: "11",
        slug: "who-invented-the-juice-box",
        seoTitle: "Who Invented the Juice Box? The Carton From Sweden",
        description:
            "The juice box traces back to a paper carton invented in 1940s Sweden. Erik Wallenberg's tetrahedron, the Tetra Brik, and how boxes reached US lunchboxes.",
        kind: "Food brand history",
        summary:
            "The juice box started in Sweden. In the 1940s Ruben Rausing wanted a cheap paper carton for milk, and young lab assistant Erik Wallenberg came up with a one-piece tetrahedron. Wallenberg's name wasn't on the patent, but he received a major Swedish engineering medal for it in 1991. The brick shape followed in 1963, then germ-free filling meant boxes could sit on a shelf without a fridge. Juice boxes reached the US in the early 1980s.",
        keyFacts: [
            "The first carton machine went to a dairy in Lund, Sweden, in 1952, filling small pyramids with cream.",
            "Aseptic (germ-free) packing let boxes be stored without refrigeration.",
            "By the end of the 1980s about one fifth of all juice sold in the US came in boxes.",
            "In 1989 food scientists named aseptic processing and packaging the most significant food science innovation of the previous 50 years.",
        ],
        faq: [
            {
                question: "Who invented the juice box?",
                answer: "The carton behind it came from Tetra Pak in Sweden. Founder Ruben Rausing is the famous name, but Sweden's patent office credits the original tetrahedron idea to lab assistant Erik Wallenberg.",
            },
            {
                question: "When did juice boxes come to America?",
                answer: "In the early 1980s. By the end of that decade about one fifth of all juice sold in the US came in boxes.",
            },
            {
                question: "Why don't juice boxes need a fridge?",
                answer: "They are filled aseptically: the drink and the package are sterilized and sealed germ free, so unopened boxes can be stored on a shelf.",
            },
        ],
        productLinks: true,
    },
    {
        num: "12",
        slug: "gatorade-history-florida-gators",
        seoTitle: "The Drink Named After a Football Team: How Gatorade Started",
        description:
            "In 1965 a University of Florida coach asked a kidney doctor why players didn't need to pee after games. How that question became Gatorade, legend vs record.",
        kind: "Food brand history",
        summary:
            "In 1965 a University of Florida assistant coach asked kidney specialist Robert Cade why football players didn't need to pee after games. Cade's team found players in the heat were losing water and salt and had low blood sugar, so they mixed water, salt and sugar. The first batch tasted terrible until Cade's wife, Mary, suggested lemon juice. Team member Jim Free suggested the name. The famous comeback-scrimmage story is, by the university's own account, a legend.",
        keyFacts: [
            "The researchers measured water and salt loss and low blood sugar in players.",
            "Newspapers in 1966 linked the Gators' second-half play to the drink.",
            "The University of Florida says the drink has earned it more than $250 million, which helps fund research.",
        ],
        faq: [
            {
                question: "Who invented Gatorade?",
                answer: "A University of Florida team led by kidney specialist Dr. Robert Cade, with Dana Shires, Jim Free and A.M. de Quesada, in 1965.",
            },
            {
                question: "Why is it called Gatorade?",
                answer: "It was made for the Florida Gators football team. University of Florida Health credits team member Jim Free with suggesting the name.",
            },
            {
                question: "Is the Gatorade scrimmage story true?",
                answer: "The University of Florida's own article introduces the freshmen-beat-the-B-team story with \"according to legend\". The 1966 newspaper coverage is documented.",
            },
        ],
        productLinks: true,
    },
    {
        num: "13",
        slug: "original-twinkie-filling-banana",
        seoTitle: "The Original Twinkie Filling Was Banana: Twinkie History",
        description:
            "The first Twinkie, made near Chicago in 1930, had banana cream filling, says the company. Why it switched to vanilla in WWII, and the shelf-life myth.",
        kind: "Food brand history",
        summary:
            "In 1930 bakery manager James Dewar, near Chicago, filled small cakes with cream to keep idle strawberry-shortcake machines busy. He said the name came from a sign for Twinkle Toe Shoes. The company says the first filling was banana cream; during World War II shipping problems made bananas hard to get, and the filling switched to vanilla. Twinkies don't last forever: the stated shelf life was 26 days, then 45 days from 2013.",
        keyFacts: [
            "The idle machines only ran during strawberry season.",
            "An NPR reporter kept a Twinkie about a year and a half; it turned hard as a rock.",
            "Banana Twinkies came back for a while in the 2000s.",
        ],
        faq: [
            {
                question: "What was the original Twinkie filling?",
                answer: "Banana cream, according to the company. It switched to vanilla during World War II.",
            },
            {
                question: "Do Twinkies really last forever?",
                answer: "No. Their stated shelf life was 26 days, extended to 45 days in 2013.",
            },
            {
                question: "Who invented the Twinkie?",
                answer: "James Dewar, a bakery manager for Continental Baking near Chicago, in 1930.",
            },
        ],
        productLinks: true,
    },
    {
        num: "14",
        slug: "kool-aid-history-edwin-perkins",
        seoTitle: "Take the Water Out: How Kool-Aid Became a Powder",
        description:
            "Edwin Perkins turned his bottled Fruit Smack syrup into a powder in 1927 Nebraska. Why he took the water out, and the unproven story behind the spelling.",
        kind: "Food brand history",
        summary:
            "Edwin Perkins grew up in Nebraska working in his father's store, where he was fascinated by powdered Jell-O. As an adult in Hastings, he sold a drink syrup called Fruit Smack in glass bottles that were heavy, leaked and broke. In 1927 he took the water out, sold the drink as a powder in paper envelopes, and called it Kool-Ade. A packet cost 10 cents, cut to 5 cents in the Great Depression.",
        keyFacts: [
            "The company moved to Chicago in 1931.",
            "The story that the government made it change \"-ade\" to \"-aid\" has never been matched to an actual rule.",
            "Nebraska made Kool-Aid its official state soft drink in 1998.",
        ],
        faq: [
            {
                question: "Who invented Kool-Aid?",
                answer: "Edwin Perkins, in Hastings, Nebraska, in 1927. It began as a bottled syrup called Fruit Smack.",
            },
            {
                question: "Why is Kool-Aid a powder?",
                answer: "Glass bottles of syrup were heavy, leaked and broke in shipping. Removing the water made the drink light and cheap to send.",
            },
            {
                question: "Why did Kool-Ade change its name to Kool-Aid?",
                answer: "Nobody is sure. A popular story says a government rule limited \"-ade\" to fruit-juice drinks, but no such rule has been found.",
            },
        ],
        productLinks: true,
    },
    {
        num: "15",
        slug: "was-the-chocolate-chip-cookie-an-accident",
        seoTitle: "Was the Chocolate Chip Cookie an Accident? Ruth Wakefield's Story",
        description:
            "The famous story says Ruth Wakefield invented chocolate chip cookies by accident. In the 1970s she said she did it on purpose. The legend vs the record.",
        kind: "Food brand history",
        summary:
            "Ruth Wakefield and her husband Kenneth opened the Toll House Inn in Whitman, Massachusetts, in 1930. The popular story says she ran out of nuts or baker's chocolate and chopped up a chocolate bar expecting it to melt. In the 1970s Wakefield told interviewers she chopped the chocolate on purpose to give her guests something new. The recipe appeared in her 1938 cookbook, and in 1939 Nestlé agreed to print it on its chocolate in return for free chocolate for life.",
        keyFacts: [
            "Wakefield studied home economics before running the inn's kitchen.",
            "The 1938 cookbook called it the Toll House Chocolate Crunch Cookie.",
            "In 1997 a third-grade class helped make the chocolate chip cookie the official state cookie of Massachusetts.",
        ],
        faq: [
            {
                question: "Was the chocolate chip cookie invented by accident?",
                answer: "That's the popular story, but Ruth Wakefield later said adding chopped chocolate was intentional. Historians at the Library of Congress note both versions.",
            },
            {
                question: "Who invented the chocolate chip cookie?",
                answer: "Ruth Wakefield, at the Toll House Inn in Whitman, Massachusetts, in the 1930s. The recipe was in her 1938 cookbook.",
            },
            {
                question: "What did Ruth Wakefield get from Nestlé?",
                answer: "A 1939 agreement let Nestlé print her recipe on its chocolate packages in return for a lifetime supply of Nestlé chocolate.",
            },
        ],
        productLinks: true,
    },
    {
        num: "16",
        slug: "zinc-and-colds",
        seoTitle: "Zinc and Colds: What the Research Says (and Doesn't)",
        description:
            "A sourced look at zinc: what it does in the body, where the zinc lozenge idea came from, what trials and a 2024 review found, and safety warnings.",
        kind: "Why does...?",
        summary:
            "Zinc is a mineral the body needs every day; about one in ten human proteins holds zinc, and it plays a part in growth, healing, taste and smell. Some trials in adults found zinc lozenges started early shortened colds, but a 2024 Cochrane review rated the overall evidence as low certainty. Zinc should never be put in the nose, too much zinc can lower copper, and for children the advice is to ask a doctor or pharmacist. This article is general information, not medical advice.",
        keyFacts: [
            "Dr. Ananda Prasad first described human zinc deficiency in 1961, in young men in Iran who had stopped growing.",
            "In a pooled analysis of three adult trials, 70% on zinc acetate lozenges had recovered by day five versus 27% on placebo.",
            "A 2024 Cochrane review of 34 trials called the evidence uncertain.",
            "The FDA warned in 2009 that nasal zinc products were linked to loss of smell, sometimes permanent.",
            "Foods with zinc include oysters, beef and pumpkin seeds.",
        ],
        faq: [
            {
                question: "Does zinc help with colds?",
                answer: "The evidence is mixed. Some trials in adults found zinc lozenges started early shortened colds, but a 2024 Cochrane review rated the evidence low certainty. Ask a doctor or pharmacist before using zinc, especially for children.",
            },
            {
                question: "Is too much zinc harmful?",
                answer: "Yes. The NIH sets upper limits by age, and too much zinc can lower copper levels. Zinc should never be used in the nose; the FDA linked nasal zinc products to loss of smell.",
            },
            {
                question: "What foods have zinc?",
                answer: "Oysters have the most per serving. Beef, crab, pumpkin seeds and cheese also provide zinc, according to the NIH Office of Dietary Supplements.",
            },
        ],
        productLinks: false,
    },
]

const RAW = raw as RawEpisode[]

function render(md: string): string {
    // Sources are markdown bullets with bare URLs; GFM turns those into links.
    const html = marked.parse(md, { gfm: true }) as string
    return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"')
}

export const EPISODES: Episode[] = META.map((m) => {
    const r = RAW.find((x) => x.num === m.num)
    if (!r) throw new Error(`Food Stories: no script data for episode ${m.num}`)
    return {
        ...m,
        title: r.title,
        transcript: r.transcript,
        sourcesHtml: render(r.sourcesMd),
        notesHtml: r.notesMd ? render(r.notesMd) : "",
        poster: `/food-stories/${r.dir}.jpg`,
        datePublished: m.uploadDate ? m.uploadDate.slice(0, 10) : PUBLISHED,
    }
})

export function getEpisode(slug: string): Episode | undefined {
    return EPISODES.find((e) => e.slug === slug)
}

// Episodes safe to link from product pages and "related" lists (excludes standalone articles like zinc).
export const PRODUCT_SAFE_EPISODES = EPISODES.filter((e) => e.productLinks)

export function relatedEpisodes(e: Episode, n = 3): Episode[] {
    const pool = PRODUCT_SAFE_EPISODES.filter((x) => x.slug !== e.slug)
    const same = pool.filter((x) => x.kind === e.kind)
    const i = pool.findIndex((x) => Number(x.num) > Number(e.num))
    const next = i === -1 ? pool : [...pool.slice(i), ...pool.slice(0, i)]
    const out: Episode[] = []
    for (const x of [...same.filter((s) => next.indexOf(s) < 4), ...next]) {
        if (!out.includes(x)) out.push(x)
        if (out.length === n) break
    }
    return out
}
