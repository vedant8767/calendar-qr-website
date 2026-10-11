export const YEAR = 2027;

// type: "global" = WHO/UN observed, "india" = national observance, "week"/"month" = multi-day campaigns
export const months = [
  {
    slug: "january",
    name: "January",
    short: "Jan",
    index: 0,
    theme: { accent: "#0d9488", soft: "#ccfbf1", deep: "#134e4a" },
    campaign: {
      title: "Cervical Cancer Awareness Month",
      icon: "ribbon",
      blurb:
        "A month to talk about HPV vaccination and regular screening — two tools that make cervical cancer one of the most preventable cancers.",
    },
    days: [
      {
        day: 4,
        title: "World Braille Day",
        type: "global",
        description:
          "Celebrates Louis Braille's birthday and the importance of braille for the rights and independence of people who are blind or partially sighted.",
      },
      {
        day: 30,
        title: "Anti-Leprosy Day",
        type: "india",
        description:
          "Observed on Mahatma Gandhi's death anniversary to honour his care for people affected by leprosy and to fight stigma. Leprosy is curable with multidrug therapy.",
      },
      {
        day: 31,
        title: "World Leprosy Day",
        type: "global",
        description:
          "Held on the last Sunday of January to raise awareness that leprosy is curable and to end discrimination against those affected.",
      },
    ],
  },
  {
    slug: "february",
    name: "February",
    short: "Feb",
    index: 1,
    theme: { accent: "#4f46e5", soft: "#e0e7ff", deep: "#312e81" },
    campaign: {
      title: "World Cancer Day",
      icon: "ribbon",
      blurb:
        "On 4 February the world unites to close the care gap — improving prevention, early detection and treatment of cancer for everyone.",
    },
    days: [
      {
        day: 4,
        title: "World Cancer Day",
        type: "global",
        description:
          "Led by the Union for International Cancer Control (UICC) to raise awareness, encourage prevention and push for equitable access to cancer care.",
      },
      {
        day: 10,
        title: "National Deworming Day",
        type: "india",
        description:
          "Children aged 1–19 receive albendazole tablets in schools and anganwadis to protect them from intestinal worm infections.",
      },
      {
        day: 14,
        title: "Congenital Heart Defect Awareness Day",
        type: "global",
        description:
          "Raises awareness of heart defects present at birth — the most common type of birth defect — and the need for early diagnosis.",
      },
      {
        day: 15,
        title: "International Childhood Cancer Day",
        type: "global",
        description:
          "Supports children and adolescents with cancer, survivors and their families, and highlights the need for timely diagnosis.",
      },
      {
        day: 28,
        title: "Rare Disease Day",
        type: "global",
        description:
          "Held on the last day of February to raise awareness of rare diseases and improve access to diagnosis and treatment.",
      },
    ],
  },
  {
    slug: "march",
    name: "March",
    short: "Mar",
    index: 2,
    theme: { accent: "#7c3aed", soft: "#ede9fe", deep: "#4c1d95" },
    organ: "lungs",
    campaign: {
      title: "World TB Day",
      icon: "wind",
      blurb:
        "Tuberculosis is preventable and curable. March is a push to find every case early, treat it fully, and end TB.",
    },
    days: [
      {
        day: 8,
        title: "International Women's Day",
        type: "global",
        description:
          "A moment to focus on women's health — from maternal care and anaemia to screening for breast and cervical cancer.",
      },
      {
        day: 11,
        title: "World Kidney Day",
        type: "global",
        description:
          "Observed on the second Thursday of March to raise awareness of kidney health and chronic kidney disease.",
      },
      {
        day: 16,
        title: "National Vaccination Day",
        type: "india",
        description:
          "Marks the first dose of oral polio vaccine given in India in 1995 and celebrates the power of immunisation.",
      },
      {
        day: 19,
        title: "World Sleep Day",
        type: "global",
        description:
          "Held on the Friday before the March equinox to celebrate healthy sleep and draw attention to sleep disorders.",
      },
      {
        day: 20,
        title: "World Oral Health Day",
        type: "global",
        description:
          "Encourages good oral hygiene — brushing twice a day with fluoride toothpaste and regular dental check-ups.",
      },
      {
        day: 21,
        title: "World Down Syndrome Day",
        type: "global",
        description:
          "The date (21/3) represents the three copies of chromosome 21 that cause Down syndrome. Celebrates inclusion and rights.",
      },
      {
        day: 24,
        title: "World Tuberculosis Day",
        type: "global",
        description:
          "Commemorates 24 March 1882, when Dr Robert Koch announced the discovery of the bacterium that causes TB.",
      },
    ],
  },
  {
    slug: "april",
    name: "April",
    short: "Apr",
    index: 3,
    theme: { accent: "#059669", soft: "#d1fae5", deep: "#064e3b" },
    organ: "liver",
    campaign: {
      title: "World Malaria Day",
      icon: "bug",
      blurb:
        "Malaria is preventable and treatable, yet it still claims hundreds of thousands of lives every year. Know how to protect yourself.",
    },
    days: [
      {
        day: 2,
        title: "World Autism Awareness Day",
        type: "global",
        description:
          "Promotes understanding and acceptance of autistic people and their full participation in society.",
      },
      {
        day: 7,
        title: "World Health Day",
        type: "global",
        description:
          "Marks the founding of the World Health Organization in 1948. Each year WHO spotlights a priority area of global health.",
      },
      {
        day: 11,
        title: "World Parkinson's Day",
        type: "global",
        description:
          "Held on the birthday of Dr James Parkinson, who first described the condition, to raise awareness of this movement disorder.",
      },
      {
        day: 11,
        title: "National Safe Motherhood Day",
        type: "india",
        description:
          "Focuses on access to quality care during pregnancy, childbirth and after delivery for every mother in India.",
      },
      {
        day: 17,
        title: "World Haemophilia Day",
        type: "global",
        description:
          "Raises awareness of haemophilia and other inherited bleeding disorders and improving access to care.",
      },
      {
        day: 24,
        endDay: 30,
        title: "World Immunization Week",
        type: "week",
        description:
          "Highlights how vaccines protect people of all ages against disease — from childhood shots to adult boosters.",
      },
      {
        day: 25,
        title: "World Malaria Day",
        type: "global",
        description:
          "Recognises global efforts to control malaria — through bed nets, prompt testing and effective treatment.",
      },
    ],
  },
  {
    slug: "may",
    name: "May",
    short: "May",
    index: 4,
    theme: { accent: "#ea580c", soft: "#ffedd5", deep: "#7c2d12" },
    organ: "heart",
    campaign: {
      title: "World Hypertension Day",
      icon: "gauge",
      blurb:
        "High blood pressure rarely causes symptoms — so the only way to know is to measure it. Know your numbers this May.",
    },
    days: [
      {
        day: 4,
        title: "World Asthma Day",
        type: "global",
        description:
          "Observed on the first Tuesday of May to improve asthma awareness and care around the world.",
      },
      {
        day: 5,
        title: "World Hand Hygiene Day",
        type: "global",
        description:
          "A reminder that clean hands save lives — especially in hospitals and clinics.",
      },
      {
        day: 8,
        title: "World Red Cross & Thalassaemia Day",
        type: "global",
        description:
          "Honours humanitarian volunteers and raises awareness of thalassaemia, an inherited blood disorder, and the value of carrier screening.",
      },
      {
        day: 12,
        title: "International Nurses Day",
        type: "global",
        description:
          "Celebrated on Florence Nightingale's birthday to honour the contribution of nurses to healthcare.",
      },
      {
        day: 16,
        title: "National Dengue Day",
        type: "india",
        description:
          "Ahead of the monsoon, a push to stop mosquito breeding by clearing stagnant water around homes.",
      },
      {
        day: 17,
        title: "World Hypertension Day",
        type: "global",
        description:
          "Encourages everyone to check their blood pressure and learn how to prevent and control hypertension.",
      },
      {
        day: 31,
        title: "World No Tobacco Day",
        type: "global",
        description:
          "WHO's annual campaign on the harms of tobacco use and support for those who want to quit.",
      },
    ],
  },
  {
    slug: "june",
    name: "June",
    short: "Jun",
    index: 5,
    theme: { accent: "#dc2626", soft: "#fee2e2", deep: "#7f1d1d" },
    campaign: {
      title: "World Blood Donor Day",
      icon: "droplet",
      blurb:
        "One donation can help save up to three lives. June thanks voluntary donors and invites new ones to roll up their sleeves.",
    },
    days: [
      {
        day: 5,
        title: "World Environment Day",
        type: "global",
        description:
          "A healthy planet means healthy people — clean air and water are the foundation of public health.",
      },
      {
        day: 7,
        title: "World Food Safety Day",
        type: "global",
        description:
          "Raises awareness about preventing foodborne illness — from farm to plate.",
      },
      {
        day: 14,
        title: "World Blood Donor Day",
        type: "global",
        description:
          "Held on the birthday of Karl Landsteiner, who discovered the ABO blood group system. Thanks donors for their gift of life.",
      },
      {
        day: 19,
        title: "World Sickle Cell Day",
        type: "global",
        description:
          "Raises awareness of sickle cell disease, an inherited red blood cell disorder, and the importance of early screening.",
      },
      {
        day: 21,
        title: "International Day of Yoga",
        type: "global",
        description:
          "Celebrates yoga's benefits for physical and mental well-being on the longest day of the year in the northern hemisphere.",
      },
      {
        day: 26,
        title: "International Day Against Drug Abuse",
        type: "global",
        description:
          "Strengthens action to prevent drug misuse and support people affected by substance use disorders.",
      },
    ],
  },
  {
    slug: "july",
    name: "July",
    short: "Jul",
    index: 6,
    theme: { accent: "#d97706", soft: "#fef3c7", deep: "#78350f" },
    organ: "liver",
    campaign: {
      title: "World Hepatitis Day",
      icon: "shield",
      blurb:
        "Viral hepatitis is often silent until the liver is badly damaged. Testing, vaccination and treatment can stop it.",
    },
    days: [
      {
        day: 1,
        title: "National Doctors' Day",
        type: "india",
        description:
          "Honours Dr Bidhan Chandra Roy — physician and former Chief Minister of West Bengal — and thanks every doctor for their service.",
      },
      {
        day: 11,
        title: "World Population Day",
        type: "global",
        description:
          "Focuses attention on population issues, including family planning and reproductive health.",
      },
      {
        day: 22,
        title: "World Brain Day",
        type: "global",
        description:
          "Organised by the World Federation of Neurology to raise awareness of brain health and neurological disorders.",
      },
      {
        day: 25,
        title: "World Drowning Prevention Day",
        type: "global",
        description:
          "Drowning is a leading cause of death among children. Supervision and swimming skills save lives.",
      },
      {
        day: 28,
        title: "World Hepatitis Day",
        type: "global",
        description:
          "Held on the birthday of Nobel laureate Dr Baruch Blumberg, who discovered the hepatitis B virus and helped develop its vaccine.",
      },
      {
        day: 29,
        title: "World ORS Day",
        type: "global",
        description:
          "Celebrates oral rehydration solution — a simple, low-cost treatment that has saved millions of lives from diarrhoea.",
      },
    ],
  },
  {
    slug: "august",
    name: "August",
    short: "Aug",
    index: 7,
    theme: { accent: "#c026d3", soft: "#fae8ff", deep: "#701a75" },
    campaign: {
      title: "World Breastfeeding Week",
      icon: "baby",
      blurb:
        "Breast milk is a baby's first vaccine. 1–7 August celebrates and supports breastfeeding families everywhere.",
    },
    days: [
      {
        day: 1,
        endDay: 7,
        title: "World Breastfeeding Week",
        type: "week",
        description:
          "Promotes exclusive breastfeeding for the first six months and support for mothers at home and at work.",
      },
      {
        day: 12,
        title: "International Youth Day",
        type: "global",
        description:
          "A spotlight on young people's health and well-being, including mental health.",
      },
      {
        day: 13,
        title: "World Organ Donation Day",
        type: "india",
        description:
          "Encourages people to pledge their organs and talk to their families about their decision.",
      },
      {
        day: 20,
        title: "World Mosquito Day",
        type: "global",
        description:
          "Marks Sir Ronald Ross's 1897 discovery that female mosquitoes transmit malaria.",
      },
      {
        day: 25,
        endDay: 31,
        title: "National Eye Donation Fortnight",
        type: "india",
        description:
          "Runs from 25 August to 8 September to encourage eye donation pledges and fight corneal blindness.",
      },
    ],
  },
  {
    slug: "september",
    name: "September",
    short: "Sep",
    index: 8,
    theme: { accent: "#e11d48", soft: "#ffe4e6", deep: "#881337" },
    organ: "heart",
    campaign: {
      title: "World Heart Day",
      icon: "heart",
      blurb:
        "Cardiovascular disease is the world's number one killer — and most of it can be prevented. Use your heart for action.",
    },
    days: [
      {
        day: 1,
        endDay: 7,
        title: "National Nutrition Week",
        type: "india",
        description:
          "Promotes healthy eating habits and awareness of the role of nutrition in health and development.",
      },
      {
        day: 8,
        title: "World Physiotherapy Day",
        type: "global",
        description:
          "Celebrates physiotherapists and how movement keeps people healthy, mobile and independent.",
      },
      {
        day: 10,
        title: "World Suicide Prevention Day",
        type: "global",
        description:
          "Reminds us that suicide is preventable. Reach out, listen, and help someone connect with support.",
      },
      {
        day: 17,
        title: "World Patient Safety Day",
        type: "global",
        description:
          "Promotes safer healthcare and reducing avoidable harm to patients.",
      },
      {
        day: 21,
        title: "World Alzheimer's Day",
        type: "global",
        description:
          "Raises awareness of Alzheimer's disease and other dementias and challenges the stigma around them.",
      },
      {
        day: 25,
        title: "World Pharmacists Day",
        type: "global",
        description:
          "Recognises pharmacists' role in safe medicine use and improving health.",
      },
      {
        day: 28,
        title: "World Rabies Day",
        type: "global",
        description:
          "Rabies is almost 100% fatal once symptoms appear — but 100% preventable with timely vaccination after a bite.",
      },
      {
        day: 29,
        title: "World Heart Day",
        type: "global",
        description:
          "Led by the World Heart Federation to raise awareness of cardiovascular disease and how to prevent it.",
      },
    ],
  },
  {
    slug: "october",
    name: "October",
    short: "Oct",
    index: 9,
    theme: { accent: "#db2777", soft: "#fce7f3", deep: "#831843" },
    campaign: {
      title: "Breast Cancer Awareness Month",
      icon: "ribbon",
      blurb:
        "Think pink! Early detection saves lives. Know what's normal for you and get screened as advised by your doctor.",
    },
    days: [
      {
        day: 1,
        title: "International Day of Older Persons",
        type: "global",
        description:
          "Celebrates the contributions of older people and highlights healthy ageing.",
      },
      {
        day: 10,
        title: "World Mental Health Day",
        type: "global",
        description:
          "Raises awareness of mental health issues and mobilises support for better mental health care.",
      },
      {
        day: 12,
        title: "World Arthritis Day",
        type: "global",
        description:
          "Raises awareness of rheumatic and musculoskeletal diseases that affect millions of people.",
      },
      {
        day: 14,
        title: "World Sight Day",
        type: "global",
        description:
          "Held on the second Thursday of October to focus attention on blindness and vision impairment.",
      },
      {
        day: 15,
        title: "Global Handwashing Day",
        type: "global",
        description:
          "Handwashing with soap is one of the easiest, most effective ways to prevent infections.",
      },
      {
        day: 16,
        title: "World Food Day",
        type: "global",
        description:
          "Promotes action against hunger and for healthy diets for all.",
      },
      {
        day: 20,
        title: "World Osteoporosis Day",
        type: "global",
        description:
          "Raises awareness about bone health and preventing fragility fractures.",
      },
      {
        day: 24,
        title: "World Polio Day",
        type: "global",
        description:
          "Celebrates progress towards a polio-free world. India was certified polio-free in 2014.",
      },
      {
        day: 29,
        title: "World Stroke Day",
        type: "global",
        description:
          "Learn the signs of stroke — Face drooping, Arm weakness, Speech difficulty, Time to call for help (FAST).",
      },
    ],
  },
  {
    slug: "november",
    name: "November",
    short: "Nov",
    index: 10,
    theme: { accent: "#2563eb", soft: "#dbeafe", deep: "#1e3a8a" },
    organ: "pancreas",
    campaign: {
      title: "World Diabetes Day",
      icon: "activity",
      blurb:
        "Over 800 million adults live with diabetes worldwide. Knowing the risk factors and getting tested early changes outcomes.",
    },
    days: [
      {
        day: 7,
        title: "National Cancer Awareness Day",
        type: "india",
        description:
          "Observed on Marie Curie's birthday to encourage early detection and screening for cancer.",
      },
      {
        day: 12,
        title: "World Pneumonia Day",
        type: "global",
        description:
          "Pneumonia is a leading infectious killer of children under five. Vaccines, clean air and good nutrition help prevent it.",
      },
      {
        day: 14,
        title: "World Diabetes Day",
        type: "global",
        description:
          "Held on the birthday of Sir Frederick Banting, who co-discovered insulin in 1921. Its symbol is the blue circle.",
      },
      {
        day: 17,
        title: "World Prematurity Day",
        type: "global",
        description:
          "Raises awareness of preterm birth and the care that premature babies and their families need.",
      },
      {
        day: 17,
        title: "World COPD Day",
        type: "global",
        description:
          "Observed in November to improve understanding of chronic obstructive pulmonary disease and lung health.",
      },
      {
        day: 18,
        endDay: 24,
        title: "World AMR Awareness Week",
        type: "week",
        description:
          "Antimicrobial resistance threatens modern medicine. Use antibiotics only when prescribed and complete the course.",
      },
      {
        day: 19,
        title: "World Toilet Day",
        type: "global",
        description:
          "Safe sanitation prevents disease. Highlights the billions of people still living without safely managed toilets.",
      },
    ],
  },
  {
    slug: "december",
    name: "December",
    short: "Dec",
    index: 11,
    theme: { accent: "#b91c1c", soft: "#fee2e2", deep: "#450a0a" },
    campaign: {
      title: "World AIDS Day",
      icon: "ribbon",
      blurb:
        "With testing and treatment, HIV is a manageable condition. December 1 is about ending stigma and ending AIDS.",
    },
    days: [
      {
        day: 1,
        title: "World AIDS Day",
        type: "global",
        description:
          "First observed in 1988. Unites people in the fight against HIV, supports those living with HIV and remembers those lost.",
      },
      {
        day: 2,
        title: "National Pollution Control Day",
        type: "india",
        description:
          "Remembers the victims of the 1984 Bhopal gas tragedy and raises awareness about preventing industrial pollution.",
      },
      {
        day: 3,
        title: "International Day of Persons with Disabilities",
        type: "global",
        description:
          "Promotes the rights and well-being of persons with disabilities in every sphere of society.",
      },
      {
        day: 12,
        title: "Universal Health Coverage Day",
        type: "global",
        description:
          "Calls for strong, equitable health systems so that everyone can get quality care without financial hardship.",
      },
    ],
  },
];

export function getMonth(slug) {
  return months.find((m) => m.slug === slug);
}

export function getAdjacentMonths(index) {
  return {
    prev: months[(index + 11) % 12],
    next: months[(index + 1) % 12],
  };
}

// Builds a Sunday-first grid for the month: an array of weeks, each an array
// of 7 cells (null for padding days outside the month).
export function buildMonthGrid(year, monthIndex) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function eventsOnDay(month, day) {
  return month.days.filter((d) =>
    d.endDay ? day >= d.day && day <= d.endDay : d.day === day,
  );
}

export function themeStyle(theme) {
  return {
    "--accent": theme.accent,
    "--accent-soft": theme.soft,
    "--accent-deep": theme.deep,
  };
}

export const typeLabels = {
  global: "Global",
  india: "India",
  week: "Week",
  month: "Month",
};
