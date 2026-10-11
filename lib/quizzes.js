// One 5-question quiz per month, themed on that month's major health campaign.
// `answer` is the index of the correct option.
export const quizzes = {
  january: {
    topic: "Cervical Cancer",
    questions: [
      {
        q: "Which virus causes almost all cases of cervical cancer?",
        options: ["HIV", "Human papillomavirus (HPV)", "Hepatitis B", "Epstein–Barr virus"],
        answer: 1,
        explanation:
          "Persistent infection with high-risk HPV types — especially 16 and 18 — is responsible for nearly all cervical cancers.",
      },
      {
        q: "Which test is used to screen for abnormal cervical cells?",
        options: ["Mammogram", "Colonoscopy", "Pap smear", "ECG"],
        answer: 2,
        explanation:
          "A Pap smear (and HPV DNA testing) can find changes in cervical cells long before they turn into cancer.",
      },
      {
        q: "When is the HPV vaccine most effective?",
        options: [
          "After age 50",
          "Only after a cancer diagnosis",
          "Before exposure to HPV, ideally at age 9–14",
          "Only during pregnancy",
        ],
        answer: 2,
        explanation:
          "The vaccine works best when given before any exposure to HPV, which is why it's recommended for girls aged 9–14.",
      },
      {
        q: "WHO's elimination goal aims for 90% of girls to be fully HPV-vaccinated by what age?",
        options: ["15", "25", "35", "45"],
        answer: 0,
        explanation:
          "WHO's 90-70-90 targets: 90% of girls vaccinated by 15, 70% of women screened by 35 and 45, and 90% of women with cervical disease treated.",
      },
      {
        q: "What is typical of early-stage cervical cancer?",
        options: [
          "Severe headaches",
          "It often causes no symptoms",
          "A persistent dry cough",
          "Itchy skin rash",
        ],
        answer: 1,
        explanation:
          "Early cervical cancer is usually silent — which is exactly why regular screening matters.",
      },
    ],
  },
  february: {
    topic: "Cancer Awareness",
    questions: [
      {
        q: "Which organisation leads World Cancer Day?",
        options: ["UNICEF", "Union for International Cancer Control (UICC)", "Red Cross", "World Bank"],
        answer: 1,
        explanation:
          "World Cancer Day on 4 February is led by the UICC, uniting organisations and people around the world.",
      },
      {
        q: "What is the single largest preventable risk factor for cancer?",
        options: ["Drinking water", "Tobacco use", "Eating fruit", "Lack of sunlight"],
        answer: 1,
        explanation:
          "Tobacco is linked to many cancers including lung, mouth, throat and bladder — quitting at any age helps.",
      },
      {
        q: "Roughly what share of cancers could be prevented by avoiding risk factors and using proven prevention?",
        options: ["Under 1%", "5–10%", "30–50%", "80–90%"],
        answer: 2,
        explanation:
          "According to WHO, between 30% and 50% of cancers can currently be prevented.",
      },
      {
        q: "Mammography is used to screen for which cancer?",
        options: ["Lung cancer", "Breast cancer", "Skin cancer", "Bone cancer"],
        answer: 1,
        explanation:
          "A mammogram is a low-dose X-ray of the breast that can detect cancer before a lump can be felt.",
      },
      {
        q: "Which vaccine helps prevent a type of liver cancer?",
        options: ["BCG", "MMR", "Hepatitis B vaccine", "Polio vaccine"],
        answer: 2,
        explanation:
          "Chronic hepatitis B infection is a major cause of liver cancer, so the hepatitis B vaccine is also a cancer-prevention vaccine.",
      },
    ],
  },
  march: {
    topic: "Tuberculosis",
    questions: [
      {
        q: "What causes tuberculosis (TB)?",
        options: ["A virus", "A bacterium", "A fungus", "A parasite"],
        answer: 1,
        explanation: "TB is caused by the bacterium Mycobacterium tuberculosis.",
      },
      {
        q: "Why is World TB Day held on 24 March?",
        options: [
          "It's the date the first TB hospital opened",
          "Robert Koch announced the discovery of the TB bacterium on that day in 1882",
          "It's the date the BCG vaccine was invented",
          "It marks the end of winter",
        ],
        answer: 1,
        explanation:
          "On 24 March 1882 Dr Robert Koch announced he had discovered the cause of TB, paving the way for diagnosis and cure.",
      },
      {
        q: "How does TB usually spread?",
        options: [
          "Through mosquito bites",
          "By shaking hands",
          "Through the air when someone with active lung TB coughs or sneezes",
          "By sharing clothes",
        ],
        answer: 2,
        explanation:
          "TB germs are released into the air when a person with active lung TB coughs, sneezes or speaks.",
      },
      {
        q: "Which symptom should prompt a TB test?",
        options: [
          "A cough lasting more than two weeks",
          "A one-day sneeze",
          "Dry skin",
          "Blurred vision after reading",
        ],
        answer: 0,
        explanation:
          "A persistent cough of 2 weeks or more — often with fever, night sweats or weight loss — should be checked for TB.",
      },
      {
        q: "The BCG vaccine is mainly given to whom?",
        options: ["Older adults", "Newborns and infants", "Pregnant women only", "Athletes"],
        answer: 1,
        explanation:
          "BCG is given at birth in countries like India and protects young children against severe forms of TB.",
      },
    ],
  },
  april: {
    topic: "Malaria",
    questions: [
      {
        q: "What causes malaria?",
        options: ["Plasmodium parasites", "A virus", "Bacteria in water", "A fungal spore"],
        answer: 0,
        explanation: "Malaria is caused by Plasmodium parasites that infect red blood cells.",
      },
      {
        q: "How is malaria transmitted to humans?",
        options: [
          "Through contaminated food",
          "Bite of an infected female Anopheles mosquito",
          "Touching an infected person",
          "Bite of a housefly",
        ],
        answer: 1,
        explanation:
          "Only female Anopheles mosquitoes transmit malaria — they need a blood meal to produce eggs.",
      },
      {
        q: "Which Plasmodium species causes the most severe malaria?",
        options: ["P. vivax", "P. malariae", "P. ovale", "P. falciparum"],
        answer: 3,
        explanation:
          "P. falciparum causes the most deaths and can quickly lead to severe complications if not treated.",
      },
      {
        q: "What is a classic symptom pattern of malaria?",
        options: [
          "Fever with chills and sweating",
          "Itchy eyes and sneezing",
          "Toothache",
          "Joint clicking",
        ],
        answer: 0,
        explanation:
          "Malaria typically causes cycles of high fever, shaking chills and heavy sweating. Any fever in a malaria area needs a test.",
      },
      {
        q: "What is one of the best ways to prevent malaria at night?",
        options: [
          "Keeping lights on",
          "Sleeping under an insecticide-treated bed net",
          "Drinking more water",
          "Eating spicy food",
        ],
        answer: 1,
        explanation:
          "Anopheles mosquitoes bite mostly between dusk and dawn, so insecticide-treated nets give strong protection.",
      },
    ],
  },
  may: {
    topic: "Hypertension",
    questions: [
      {
        q: "WHO defines hypertension as blood pressure consistently at or above…",
        options: ["100/60 mmHg", "120/70 mmHg", "140/90 mmHg", "180/120 mmHg"],
        answer: 2,
        explanation:
          "Hypertension is diagnosed when readings on two different days are 140/90 mmHg or higher (WHO).",
      },
      {
        q: "Why is hypertension called the “silent killer”?",
        options: [
          "It only happens at night",
          "It usually has no symptoms",
          "It makes you lose your voice",
          "It only affects quiet people",
        ],
        answer: 1,
        explanation:
          "Most people with high blood pressure feel fine — regular measurement is the only way to know.",
      },
      {
        q: "How much salt does WHO recommend adults eat per day, at most?",
        options: ["Less than 5 g (about a teaspoon)", "10–12 g", "20 g", "No limit"],
        answer: 0,
        explanation:
          "Keeping salt below 5 g per day helps lower blood pressure and reduces the risk of heart disease and stroke.",
      },
      {
        q: "Uncontrolled high blood pressure is a major risk factor for…",
        options: ["Common cold", "Stroke and heart attack", "Short-sightedness", "Hair loss"],
        answer: 1,
        explanation:
          "Hypertension damages blood vessels and is a leading cause of stroke, heart attack and kidney disease.",
      },
      {
        q: "Which lifestyle habit helps lower blood pressure?",
        options: [
          "Adding extra salt",
          "Smoking",
          "Regular physical activity",
          "Skipping sleep",
        ],
        answer: 2,
        explanation:
          "Being active most days, eating less salt, limiting alcohol and keeping a healthy weight all help control BP.",
      },
    ],
  },
  june: {
    topic: "Blood Donation",
    questions: [
      {
        q: "World Blood Donor Day falls on the birthday of which scientist?",
        options: ["Louis Pasteur", "Karl Landsteiner", "Alexander Fleming", "Edward Jenner"],
        answer: 1,
        explanation:
          "Karl Landsteiner discovered the ABO blood group system and won the Nobel Prize in 1930.",
      },
      {
        q: "Which blood group is known as the universal red-cell donor?",
        options: ["AB positive", "A negative", "O negative", "B positive"],
        answer: 2,
        explanation:
          "O negative red cells lack A, B and RhD antigens, so they can be given to almost anyone in an emergency.",
      },
      {
        q: "Which blood group is the universal red-cell recipient?",
        options: ["O negative", "AB positive", "A positive", "B negative"],
        answer: 1,
        explanation:
          "People with AB positive blood can receive red cells from any ABO and RhD group.",
      },
      {
        q: "About how much blood is collected in a typical whole-blood donation?",
        options: ["50 mL", "350–450 mL", "1.5 litres", "3 litres"],
        answer: 1,
        explanation:
          "A standard donation is about 350–450 mL — the body replaces the fluid within a day.",
      },
      {
        q: "In India, how often can a healthy male donor give whole blood?",
        options: ["Every week", "Every month", "Once every 3 months", "Once in 5 years"],
        answer: 2,
        explanation:
          "Indian guidelines allow men to donate every 90 days and women every 120 days.",
      },
    ],
  },
  july: {
    topic: "Viral Hepatitis",
    questions: [
      {
        q: "Hepatitis mainly affects which organ?",
        options: ["Heart", "Lungs", "Liver", "Kidneys"],
        answer: 2,
        explanation: "Hepatitis means inflammation of the liver, most often caused by a virus.",
      },
      {
        q: "World Hepatitis Day honours the birthday of which scientist?",
        options: ["Baruch Blumberg", "Jonas Salk", "Robert Koch", "Ronald Ross"],
        answer: 0,
        explanation:
          "Dr Baruch Blumberg discovered the hepatitis B virus and helped develop its vaccine, earning a Nobel Prize.",
      },
      {
        q: "Hepatitis A and E spread mainly through…",
        options: [
          "Mosquito bites",
          "Contaminated food and water",
          "Blood transfusions only",
          "Sunlight",
        ],
        answer: 1,
        explanation:
          "Hepatitis A and E spread by the faecal-oral route — safe water, sanitation and handwashing prevent them.",
      },
      {
        q: "Which hepatitis vaccine is given to newborns in India's immunisation programme?",
        options: ["Hepatitis A", "Hepatitis B", "Hepatitis C", "Hepatitis E"],
        answer: 1,
        explanation:
          "A birth dose of hepatitis B vaccine protects babies from infection passed on during delivery.",
      },
      {
        q: "Which statement about hepatitis C is true today?",
        options: [
          "It has no treatment",
          "Most people can be cured with antiviral tablets",
          "It is spread by coughing",
          "It only affects children",
        ],
        answer: 1,
        explanation:
          "Direct-acting antiviral medicines cure more than 95% of people with hepatitis C, usually in 8–12 weeks.",
      },
    ],
  },
  august: {
    topic: "Breastfeeding",
    questions: [
      {
        q: "WHO recommends exclusive breastfeeding for the first…",
        options: ["1 month", "3 months", "6 months", "12 months"],
        answer: 2,
        explanation:
          "For the first 6 months, breast milk alone gives babies all the nutrition and fluids they need — not even water is required.",
      },
      {
        q: "What is the first thick, yellowish milk called?",
        options: ["Colostrum", "Formula", "Plasma", "Lactose"],
        answer: 0,
        explanation:
          "Colostrum is rich in antibodies and is often called a baby's first vaccine.",
      },
      {
        q: "When should breastfeeding ideally begin after birth?",
        options: ["Within the first hour", "After 24 hours", "After 3 days", "After a week"],
        answer: 0,
        explanation:
          "Early initiation within an hour of birth protects newborns and helps establish breastfeeding.",
      },
      {
        q: "WHO advises continuing breastfeeding alongside other foods up to…",
        options: ["6 months", "1 year", "2 years or beyond", "5 years"],
        answer: 2,
        explanation:
          "After 6 months, safe complementary foods should be added while breastfeeding continues to 2 years or beyond.",
      },
      {
        q: "Which is a health benefit of breastfeeding for the mother?",
        options: [
          "Higher risk of diabetes",
          "Lower risk of breast and ovarian cancer",
          "Weaker bones",
          "No benefits",
        ],
        answer: 1,
        explanation:
          "Breastfeeding lowers a mother's risk of breast and ovarian cancer and type 2 diabetes.",
      },
    ],
  },
  september: {
    topic: "Heart Health",
    questions: [
      {
        q: "What is the leading cause of death worldwide?",
        options: ["Road accidents", "Cardiovascular disease", "Malaria", "Flu"],
        answer: 1,
        explanation:
          "Cardiovascular diseases — mainly heart attacks and strokes — cause more deaths globally than any other condition.",
      },
      {
        q: "Which is a common warning sign of a heart attack?",
        options: [
          "Chest pain that may spread to the arm, jaw or back",
          "Itchy feet",
          "Hiccups",
          "Watery eyes",
        ],
        answer: 0,
        explanation:
          "Chest pain or pressure, breathlessness, sweating and nausea are classic signs. Call for emergency help immediately.",
      },
      {
        q: "WHO recommends adults get at least how much moderate activity per week?",
        options: ["30 minutes", "60 minutes", "150 minutes", "500 minutes"],
        answer: 2,
        explanation:
          "At least 150–300 minutes of moderate activity a week (like brisk walking) protects the heart.",
      },
      {
        q: "Which cholesterol is known as “bad” cholesterol?",
        options: ["HDL", "LDL", "Omega-3", "Vitamin D"],
        answer: 1,
        explanation:
          "LDL builds up in artery walls. HDL is the “good” cholesterol that helps remove it.",
      },
      {
        q: "During CPR, how fast should chest compressions be?",
        options: ["20–30 per minute", "50–60 per minute", "100–120 per minute", "200 per minute"],
        answer: 2,
        explanation:
          "Push hard and fast in the centre of the chest at 100–120 compressions per minute.",
      },
    ],
  },
  october: {
    topic: "Breast Cancer",
    questions: [
      {
        q: "What is the international symbol of breast cancer awareness?",
        options: ["Red ribbon", "Pink ribbon", "Blue circle", "Yellow star"],
        answer: 1,
        explanation: "The pink ribbon has represented breast cancer awareness since the early 1990s.",
      },
      {
        q: "Which of these can be a warning sign of breast cancer?",
        options: [
          "A new lump in the breast or underarm",
          "Feeling sleepy after lunch",
          "A sore throat",
          "Cold hands",
        ],
        answer: 0,
        explanation:
          "A new lump, skin dimpling, nipple changes or discharge should be checked by a doctor promptly.",
      },
      {
        q: "A mammogram is a type of…",
        options: ["Blood test", "Low-dose X-ray", "Ultrasound of the heart", "Eye exam"],
        answer: 1,
        explanation:
          "Mammography uses low-dose X-rays to find breast changes early, often before they can be felt.",
      },
      {
        q: "Can men get breast cancer?",
        options: [
          "No, never",
          "Yes, though it is rare",
          "Only after age 90",
          "Only if they smoke",
        ],
        answer: 1,
        explanation:
          "Men have breast tissue too. Male breast cancer accounts for around 1% of cases.",
      },
      {
        q: "Which breast cancer risk factor can you change?",
        options: ["Age", "Family history", "Alcohol use and physical inactivity", "Inherited genes"],
        answer: 2,
        explanation:
          "Limiting alcohol, staying active and keeping a healthy weight lower risk. Age and genes can't be changed.",
      },
    ],
  },
  november: {
    topic: "Diabetes",
    questions: [
      {
        q: "World Diabetes Day marks the birthday of…",
        options: [
          "Sir Frederick Banting, co-discoverer of insulin",
          "Florence Nightingale",
          "Marie Curie",
          "Louis Pasteur",
        ],
        answer: 0,
        explanation:
          "Banting and Charles Best discovered insulin in 1921, transforming diabetes from a fatal disease into a manageable one.",
      },
      {
        q: "What is the symbol of diabetes awareness?",
        options: ["Red ribbon", "Pink ribbon", "Blue circle", "Green leaf"],
        answer: 2,
        explanation: "The blue circle represents the global unity of the diabetes community.",
      },
      {
        q: "Which is the most common type of diabetes?",
        options: ["Type 1", "Type 2", "Gestational", "Type 3"],
        answer: 1,
        explanation:
          "Type 2 diabetes makes up the vast majority of cases and is strongly linked to weight, diet and inactivity.",
      },
      {
        q: "A fasting plasma glucose at or above which value suggests diabetes?",
        options: ["70 mg/dL", "100 mg/dL", "126 mg/dL", "300 mg/dL"],
        answer: 2,
        explanation:
          "Fasting glucose of 126 mg/dL (7.0 mmol/L) or higher, confirmed on repeat testing, indicates diabetes.",
      },
      {
        q: "The HbA1c test shows your average blood sugar over the past…",
        options: ["24 hours", "1 week", "2–3 months", "5 years"],
        answer: 2,
        explanation:
          "HbA1c reflects glucose attached to red blood cells, which live about 3 months — giving a 2–3 month average.",
      },
    ],
  },
  december: {
    topic: "HIV & AIDS",
    questions: [
      {
        q: "What does HIV stand for?",
        options: [
          "Human Immunodeficiency Virus",
          "High Infection Virus",
          "Human Inflammatory Virus",
          "Hepatic Immune Virus",
        ],
        answer: 0,
        explanation: "HIV is the Human Immunodeficiency Virus, which weakens the immune system.",
      },
      {
        q: "Which cells does HIV mainly attack?",
        options: ["Red blood cells", "CD4 T-cells", "Nerve cells", "Skin cells"],
        answer: 1,
        explanation:
          "HIV destroys CD4 T-cells, which coordinate the immune response. Without treatment this can lead to AIDS.",
      },
      {
        q: "Which of these can NOT transmit HIV?",
        options: [
          "Sharing needles",
          "Unprotected sex",
          "Hugging or sharing a meal",
          "From mother to baby without treatment",
        ],
        answer: 2,
        explanation:
          "HIV isn't spread by everyday contact like hugging, sharing utensils, toilets or mosquito bites.",
      },
      {
        q: "What does “U = U” mean?",
        options: [
          "Unknown = Untreatable",
          "Undetectable = Untransmittable",
          "Universal = Unprotected",
          "Urgent = Unavoidable",
        ],
        answer: 1,
        explanation:
          "A person on effective treatment with an undetectable viral load cannot pass HIV to sexual partners.",
      },
      {
        q: "In which year was World AIDS Day first observed?",
        options: ["1968", "1988", "2000", "2015"],
        answer: 1,
        explanation:
          "World AIDS Day began in 1988 — the first-ever global health day.",
      },
    ],
  },
};

export function getQuiz(slug) {
  return quizzes[slug];
}
