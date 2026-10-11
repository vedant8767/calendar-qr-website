// Organ explorer content. `calendar` entries link back to month pages.
// `map` is the organ's position on the body silhouette (viewBox 0 0 100 220).
export const organs = [
  {
    slug: "heart",
    name: "Heart",
    tagline: "The tireless pump",
    color: "#e0344a",
    vital: "72 BPM",
    map: { x: 54, y: 74, r: 5 },
    intro:
      "A muscular pump about the size of your fist that pushes blood through roughly 100,000 km of blood vessels — delivering oxygen and nutrients to every cell.",
    stats: [
      ["~100,000", "beats a day"],
      ["~7,200 L", "blood pumped daily"],
      ["4", "chambers"],
    ],
    steps: [
      ["Collect", "Oxygen-poor blood from the body returns through the vena cava into the right atrium."],
      ["Send to lungs", "The right ventricle pumps it through the pulmonary artery to the lungs to pick up oxygen."],
      ["Refill", "Oxygen-rich blood flows back into the left atrium, then drops into the strong left ventricle."],
      ["Power out", "The left ventricle squeezes it into the aorta and out to the whole body. Valves snapping shut make the “lub-dub” sound."],
    ],
    why: "When the heart or its arteries are damaged — by high blood pressure, cholesterol build-up or smoking — the result can be a heart attack, stroke or heart failure. Cardiovascular disease is the world's leading cause of death.",
    tips: [
      "Get at least 150 minutes of brisk activity every week",
      "Keep salt under 5 g a day and eat plenty of fruit and vegetables",
      "Check your blood pressure and cholesterol regularly",
      "Don't smoke — your heart risk drops within a year of quitting",
    ],
    fact: "Your heart has its own electrical system — it can keep beating for a short while even outside the body.",
    calendar: [
      { month: "september", title: "World Heart Day", date: "29 Sep" },
      { month: "may", title: "World Hypertension Day", date: "17 May" },
      { month: "february", title: "Congenital Heart Defect Awareness Day", date: "14 Feb" },
    ],
  },
  {
    slug: "lungs",
    name: "Lungs",
    tagline: "Your breath of life",
    color: "#f2849a",
    vital: "15 breaths / min",
    map: { x: 50, y: 70, r: 9 },
    intro:
      "Two spongy organs that swap the air you breathe for the oxygen your body needs — and carry carbon dioxide back out with every breath.",
    stats: [
      ["~22,000", "breaths a day"],
      ["~480 mn", "tiny air sacs (alveoli)"],
      ["~70 m²", "surface for gas exchange"],
    ],
    steps: [
      ["Breathe in", "The diaphragm tightens and moves down, drawing air in through the nose, windpipe (trachea) and bronchi."],
      ["Branch out", "The airways split again and again into thousands of bronchioles, like the branches of an upside-down tree."],
      ["Swap gases", "In the alveoli, oxygen passes into tiny blood capillaries while carbon dioxide passes out."],
      ["Breathe out", "The diaphragm relaxes and the lungs recoil, pushing the used air out."],
    ],
    why: "Smoke, polluted air and infections like TB and pneumonia damage the delicate airways and alveoli, making every breath harder. Chronic lung diseases such as COPD and asthma affect hundreds of millions of people.",
    tips: [
      "Avoid smoking and second-hand smoke",
      "Get tested if a cough lasts more than two weeks",
      "Stay up to date with flu and pneumococcal vaccines",
      "Exercise regularly — it strengthens your breathing muscles",
    ],
    fact: "The right lung has three lobes but the left has only two — it leaves room for your heart.",
    calendar: [
      { month: "march", title: "World Tuberculosis Day", date: "24 Mar" },
      { month: "may", title: "World Asthma Day", date: "4 May" },
      { month: "may", title: "World No Tobacco Day", date: "31 May" },
      { month: "november", title: "World Pneumonia Day", date: "12 Nov" },
      { month: "november", title: "World COPD Day", date: "17 Nov" },
    ],
  },
  {
    slug: "brain",
    name: "Brain",
    tagline: "Mission control",
    color: "#f4a6b8",
    vital: "86 bn neurons",
    map: { x: 50, y: 17, r: 9 },
    intro:
      "The command centre for everything you think, feel, remember and do — from solving a puzzle to keeping your heart beating while you sleep.",
    stats: [
      ["~86 bn", "nerve cells (neurons)"],
      ["~1.4 kg", "average weight"],
      ["~20%", "of the body's energy"],
    ],
    steps: [
      ["Sense", "Eyes, ears, skin and other senses send signals along nerves to the brain."],
      ["Signal", "Neurons pass messages as electrical impulses and chemical messengers across connections called synapses."],
      ["Think & act", "The cerebrum handles thinking, memory, language and movement; the cerebellum keeps you balanced and coordinated."],
      ["Keep you alive", "The brainstem automatically controls breathing, heart rate and sleep cycles."],
    ],
    why: "Stroke, dementia, epilepsy and mental health conditions all involve the brain. Controlling blood pressure and getting help early make a huge difference.",
    tips: [
      "Sleep 7–9 hours — the brain clears waste while you sleep",
      "Wear a helmet on two-wheelers",
      "Stay socially and mentally active: read, learn, connect",
      "Know stroke signs: Face, Arms, Speech — Time to call for help",
    ],
    fact: "Your brain makes up only about 2% of your body weight but uses around a fifth of its energy.",
    calendar: [
      { month: "july", title: "World Brain Day", date: "22 Jul" },
      { month: "september", title: "World Alzheimer's Day", date: "21 Sep" },
      { month: "october", title: "World Mental Health Day", date: "10 Oct" },
      { month: "october", title: "World Stroke Day", date: "29 Oct" },
      { month: "march", title: "World Sleep Day", date: "19 Mar" },
    ],
  },
  {
    slug: "liver",
    name: "Liver",
    tagline: "The body's chemical factory",
    color: "#a8443f",
    vital: "500+ jobs",
    map: { x: 44, y: 91, r: 7 },
    intro:
      "Your largest internal organ quietly handles hundreds of jobs — cleaning the blood, storing energy and making the bile that digests fat.",
    stats: [
      ["500+", "vital functions"],
      ["~1.5 kg", "largest internal organ"],
      ["~1 L", "bile made daily"],
    ],
    steps: [
      ["Receive", "Nutrient-rich blood from the gut arrives through the portal vein."],
      ["Process & store", "It turns nutrients into energy, stores glucose as glycogen, and keeps vitamins and iron in reserve."],
      ["Detox", "It filters toxins and breaks down medicines and alcohol so they can leave the body."],
      ["Build", "It makes bile (stored in the gallbladder) plus proteins like albumin and clotting factors."],
    ],
    why: "Viral hepatitis, alcohol and fatty liver disease can silently scar the liver for years. Malaria parasites also multiply in the liver before attacking the blood.",
    tips: [
      "Get vaccinated against hepatitis B",
      "Limit alcohol and avoid unnecessary medicines",
      "Keep a healthy weight to prevent fatty liver",
      "Drink safe water and eat hygienically prepared food",
    ],
    fact: "The liver can regrow — even after a large part of it is surgically removed.",
    calendar: [
      { month: "july", title: "World Hepatitis Day", date: "28 Jul" },
      { month: "april", title: "World Malaria Day", date: "25 Apr" },
    ],
  },
  {
    slug: "kidneys",
    name: "Kidneys",
    tagline: "Expert filters",
    color: "#b5524c",
    vital: "~180 L filtered / day",
    map: { x: 50, y: 106, r: 7 },
    intro:
      "Two bean-shaped organs that filter your entire blood supply many times a day, removing waste and balancing water, salts and blood pressure.",
    stats: [
      ["~180 L", "of blood filtered daily"],
      ["~1 mn", "filters (nephrons) per kidney"],
      ["1–2 L", "urine made a day"],
    ],
    steps: [
      ["Inflow", "Blood enters each kidney through the renal artery."],
      ["Filter", "About a million tiny units called nephrons strain out waste products and extra water."],
      ["Reclaim", "Useful things — glucose, salts and most of the water — are reabsorbed back into the blood."],
      ["Outflow", "What's left becomes urine, flowing down the ureters to the bladder."],
    ],
    why: "Kidneys also control blood pressure, make a hormone that tells the body to produce red blood cells, and activate vitamin D. Diabetes and high blood pressure are the leading causes of kidney failure.",
    tips: [
      "Drink enough water through the day",
      "Keep blood sugar and blood pressure under control",
      "Avoid overusing painkillers like ibuprofen",
      "Cut down on salt and processed foods",
    ],
    fact: "You can live a healthy life with just one working kidney.",
    calendar: [
      { month: "march", title: "World Kidney Day", date: "11 Mar" },
      { month: "may", title: "World Hypertension Day", date: "17 May" },
      { month: "november", title: "World Diabetes Day", date: "14 Nov" },
    ],
  },
  {
    slug: "stomach",
    name: "Stomach",
    tagline: "The mixing bowl",
    color: "#ec8f86",
    vital: "3 waves / min",
    map: { x: 58, y: 94, r: 6 },
    intro:
      "A stretchy, muscular bag that churns your food with acid and enzymes, turning a meal into a smooth paste your intestines can absorb.",
    stats: [
      ["~1.5 L", "comfortable capacity"],
      ["pH 1.5–3.5", "acidic gastric juice"],
      ["3–5 days", "for the lining to renew"],
    ],
    steps: [
      ["Arrive", "Swallowed food travels down the oesophagus into the stomach."],
      ["Churn", "Muscle waves (peristalsis) roll across the stomach about three times a minute, mashing the food."],
      ["Digest", "Hydrochloric acid kills germs and the enzyme pepsin starts breaking down proteins, forming chyme."],
      ["Release", "The pyloric valve lets small amounts of chyme into the small intestine at a time."],
    ],
    why: "Unsafe food and water cause infections, while H. pylori bacteria and overuse of painkillers can cause ulcers. Good hygiene protects the whole digestive system.",
    tips: [
      "Wash hands with soap before eating",
      "Eat smaller, regular meals and don't lie down right after",
      "Limit spicy, fried food and alcohol if you get acidity",
      "See a doctor for persistent pain, vomiting or black stools",
    ],
    fact: "A layer of mucus stops your stomach from digesting itself in its own acid.",
    calendar: [
      { month: "june", title: "World Food Safety Day", date: "7 Jun" },
      { month: "october", title: "Global Handwashing Day", date: "15 Oct" },
      { month: "july", title: "World ORS Day", date: "29 Jul" },
    ],
  },
  {
    slug: "pancreas",
    name: "Pancreas",
    tagline: "The sugar balancer",
    color: "#f0b764",
    vital: "Insulin on demand",
    map: { x: 52, y: 100, r: 5 },
    intro:
      "A gland tucked behind the stomach with two jobs: making digestive juices, and releasing insulin and glucagon to keep blood sugar steady.",
    stats: [
      ["~15 cm", "long"],
      ["~1 mn", "islets of Langerhans"],
      ["~1.5 L", "digestive juice a day"],
    ],
    steps: [
      ["Sugar rises", "After a meal, glucose from your food enters the blood."],
      ["Insulin", "Beta cells in the islets release insulin, which unlocks cells so they can take in glucose."],
      ["Glucagon", "When sugar falls, alpha cells release glucagon, telling the liver to release stored glucose."],
      ["Digest", "Separately, enzymes flow into the small intestine to break down fats, proteins and carbohydrates."],
    ],
    why: "In type 1 diabetes the body attacks the insulin-making cells; in type 2 the body stops responding to insulin properly. Uncontrolled diabetes damages the eyes, kidneys, nerves and heart.",
    tips: [
      "Choose whole grains and limit sugary drinks",
      "Stay active — muscles use glucose even at rest",
      "Get your blood sugar tested, especially with a family history",
      "Keep a healthy waistline",
    ],
    fact: "Insulin was discovered in 1921 — before that, type 1 diabetes was a fatal disease.",
    calendar: [
      { month: "november", title: "World Diabetes Day", date: "14 Nov" },
      { month: "october", title: "World Food Day", date: "16 Oct" },
    ],
  },
  {
    slug: "eye",
    name: "Eye",
    tagline: "Your window to the world",
    color: "#4aa3d8",
    vital: "Follows your finger",
    map: { x: 55, y: 20, r: 3 },
    intro:
      "A living camera that focuses light, adjusts to brightness in a blink and turns images into signals your brain can understand.",
    stats: [
      ["~120 mn", "rods for dim light"],
      ["~6 mn", "cones for colour"],
      ["15–20", "blinks a minute"],
    ],
    steps: [
      ["Let light in", "Light passes through the clear cornea and the pupil."],
      ["Adjust", "The coloured iris widens or shrinks the pupil to control how much light gets in."],
      ["Focus", "The lens bends the light to form a sharp image on the retina at the back of the eye."],
      ["Send", "Rods and cones turn light into signals that travel along the optic nerve to the brain."],
    ],
    why: "Cataract, glaucoma, uncorrected refractive errors and diabetic eye disease are major causes of vision loss — and most can be prevented or treated if caught early.",
    tips: [
      "Have regular eye check-ups, yearly if you have diabetes",
      "Follow the 20-20-20 rule for screens: every 20 min, look 20 ft away for 20 s",
      "Wear sunglasses that block UV light",
      "Eat leafy greens and colourful vegetables",
    ],
    fact: "The image on your retina is upside down — your brain flips it the right way up.",
    calendar: [
      { month: "october", title: "World Sight Day", date: "14 Oct" },
      { month: "august", title: "National Eye Donation Fortnight", date: "25 Aug" },
      { month: "january", title: "World Braille Day", date: "4 Jan" },
    ],
  },
];

export function getOrgan(slug) {
  return organs.find((o) => o.slug === slug);
}

export function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
