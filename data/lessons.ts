import type { Lesson } from "@/types/learning";

const LESSON_IMAGES = {
  greetings: "https://picsum.photos/seed/greetings-lesson/200/200",
  dailyLife: "https://picsum.photos/seed/daily-life-lesson/200/200",
  cafe: "https://picsum.photos/seed/cafe-lesson/200/200",
  travel: "https://picsum.photos/seed/travel-lesson/200/200",
  shopping: "https://picsum.photos/seed/shopping-lesson/200/200",
  family: "https://picsum.photos/seed/family-lesson/200/200",
};

export const LESSONS: Lesson[] = [
  // ── Spanish · Unit 1 ───────────────────────────────────────────────────────

  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Greetings & Introductions",
    description: "Say hello, goodbye, and introduce yourself.",
    order: 1,
    xpReward: 10,
    image: LESSON_IMAGES.greetings,
    goals: [
      { description: "Learn 5 common greeting words." },
      { description: "Understand when to use formal vs informal greetings." },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOS" },
          { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
          { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
          { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
        ],
      },
      {
        id: "es-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          {
            phrase: "¿Cómo te llamas?",
            translation: "What is your name?",
            pronunciation: "KOH-mo teh YAH-mas",
            context: "Informal — use with friends or children.",
          },
          {
            phrase: "Me llamo Ana.",
            translation: "My name is Ana.",
            pronunciation: "meh YAH-mo AH-nah",
          },
          {
            phrase: "Mucho gusto.",
            translation: "Nice to meet you.",
            pronunciation: "MOO-cho GOOS-toh",
          },
        ],
      },
      {
        id: "es-u1-l1-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in Spanish?",
        options: ["Hola", "Gracias", "Adiós", "Por favor"],
        answer: "Gracias",
      },
    ],
    aiTeacherPrompt: {
      intro: "Hey, welcome to your very first Spanish lesson — I'm so excited you're here! Our first word is 'Hola', which just means 'Hello'. Can you say 'Hola' back to me?",
      encouragement: "Yes! That's it — you're already speaking Spanish! You're doing amazing.",
      lessonContext:
        "This lesson covers five everyday Spanish greetings: Hola, Adiós, Buenos días, Gracias, Por favor. Teach only these words and the three phrases listed. Introduce each word slowly with its translation and pronunciation. Do not teach unrelated vocabulary or switch to other languages.",
    },
  },

  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    title: "Daily Life",
    description: "Talk about your everyday routine and common activities.",
    order: 2,
    xpReward: 15,
    image: LESSON_IMAGES.dailyLife,
    goals: [
      { description: "Learn 5 words for daily activities." },
      { description: "Describe your morning routine in Spanish." },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Casa", translation: "House", pronunciation: "KAH-sah" },
          { word: "Trabajo", translation: "Work", pronunciation: "trah-BAH-ho" },
          { word: "Comer", translation: "To eat", pronunciation: "koh-MEHR" },
          { word: "Dormir", translation: "To sleep", pronunciation: "dor-MEER" },
          { word: "Tiempo", translation: "Time / Weather", pronunciation: "TYEM-poh" },
        ],
      },
      {
        id: "es-u1-l2-a2",
        type: "phrase",
        title: "Daily Routines",
        phrases: [
          {
            phrase: "¿A qué hora te levantas?",
            translation: "What time do you wake up?",
            pronunciation: "ah keh OH-rah teh leh-VAN-tas",
          },
          {
            phrase: "Me levanto a las siete.",
            translation: "I wake up at seven.",
            pronunciation: "meh leh-VAN-toh ah las SYEH-teh",
          },
          {
            phrase: "Voy al trabajo en autobús.",
            translation: "I go to work by bus.",
            pronunciation: "BOY al trah-BAH-ho en ow-toh-BOOS",
          },
        ],
      },
      {
        id: "es-u1-l2-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'to eat' in Spanish?",
        options: ["Dormir", "Comer", "Trabajo", "Casa"],
        answer: "Comer",
      },
    ],
    aiTeacherPrompt: {
      intro: "Hola again — great to see you back! Today we're talking about daily life in Spanish. Let's start with 'casa', which means 'house' — can you say 'casa'?",
      encouragement: "¡Muy bien! You're building a real Spanish vocabulary now — keep going!",
      lessonContext:
        "This lesson covers five Spanish daily-life words: casa, trabajo, comer, dormir, tiempo. Teach only these words and the three routine phrases listed. Introduce each word with its translation and pronunciation. Do not introduce other topics or languages.",
    },
  },

  {
    id: "es-u1-l3",
    unitId: "es-unit-1",
    title: "At the Café",
    description: "Order food and drinks at a Spanish café.",
    order: 3,
    xpReward: 15,
    image: LESSON_IMAGES.cafe,
    goals: [
      { description: "Learn vocabulary for café items." },
      { description: "Order food and ask for the bill." },
    ],
    activities: [
      {
        id: "es-u1-l3-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Café", translation: "Coffee", pronunciation: "kah-FEH" },
          { word: "Agua", translation: "Water", pronunciation: "AH-gwah" },
          { word: "Mesa", translation: "Table", pronunciation: "MEH-sah" },
          { word: "Camarero", translation: "Waiter", pronunciation: "kah-mah-REH-roh" },
          { word: "Cuenta", translation: "Bill / Check", pronunciation: "KWEN-tah" },
        ],
      },
      {
        id: "es-u1-l3-a2",
        type: "phrase",
        title: "Ordering",
        phrases: [
          {
            phrase: "Me gustaría un café, por favor.",
            translation: "I would like a coffee, please.",
            pronunciation: "meh goos-tah-REE-ah oon kah-FEH por fah-VOR",
          },
          {
            phrase: "¿Tiene una mesa libre?",
            translation: "Do you have a free table?",
            pronunciation: "TYEH-neh OO-nah MEH-sah LEE-breh",
          },
          {
            phrase: "La cuenta, por favor.",
            translation: "The bill, please.",
            pronunciation: "lah KWEN-tah por fah-VOR",
          },
        ],
      },
      {
        id: "es-u1-l3-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'water' in Spanish?",
        options: ["Café", "Mesa", "Agua", "Cuenta"],
        answer: "Agua",
      },
    ],
    aiTeacherPrompt: {
      intro: "Welcome to the café! Today we're learning how to order food and drinks in Spanish — so useful for real life! Our first word is 'café', which means 'coffee'. Can you say 'café'?",
      encouragement: "¡Excelente! You'd fit right in at a café in Madrid — seriously!",
      lessonContext:
        "This lesson covers five Spanish café words: café, agua, mesa, camarero, cuenta. Teach only these words and the three ordering phrases listed. Introduce each word with translation and pronunciation. Do not teach unrelated vocabulary or switch to other languages.",
    },
  },

  {
    id: "es-u1-l4",
    unitId: "es-unit-1",
    title: "Travel & Directions",
    description: "Ask for and give directions in Spanish.",
    order: 4,
    xpReward: 20,
    image: LESSON_IMAGES.travel,
    goals: [
      { description: "Learn words for left, right, and straight ahead." },
      { description: "Ask where a place is located." },
    ],
    activities: [
      {
        id: "es-u1-l4-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Izquierda", translation: "Left", pronunciation: "ees-KYEHR-dah" },
          { word: "Derecha", translation: "Right", pronunciation: "deh-REH-chah" },
          { word: "Recto", translation: "Straight ahead", pronunciation: "REHK-toh" },
          { word: "Calle", translation: "Street", pronunciation: "KAH-yeh" },
          { word: "Cerca", translation: "Near / Close", pronunciation: "SEHR-kah" },
        ],
      },
      {
        id: "es-u1-l4-a2",
        type: "phrase",
        title: "Asking Directions",
        phrases: [
          {
            phrase: "¿Dónde está la estación?",
            translation: "Where is the station?",
            pronunciation: "DON-deh es-TAH lah es-tah-SYON",
          },
          {
            phrase: "Gire a la derecha.",
            translation: "Turn right.",
            pronunciation: "HEE-reh ah lah deh-REH-chah",
          },
          {
            phrase: "Está cerca de aquí.",
            translation: "It is close to here.",
            pronunciation: "es-TAH SEHR-kah deh ah-KEE",
          },
        ],
      },
      {
        id: "es-u1-l4-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'left' in Spanish?",
        options: ["Derecha", "Recto", "Izquierda", "Calle"],
        answer: "Izquierda",
      },
    ],
    aiTeacherPrompt: {
      intro: "¡Vámonos — let's go! Today we're learning how to find our way around a Spanish city. First word: 'izquierda', which means 'left' — say it slowly: 'ees-KYEHR-dah'. Can you give it a try?",
      encouragement: "¡Perfecto! You'd never get lost in Spain now — great work!",
      lessonContext:
        "This lesson covers five Spanish direction words: izquierda, derecha, recto, calle, cerca. Teach only these words and the three direction phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "es-u1-l5",
    unitId: "es-unit-1",
    title: "Shopping",
    description: "Buy things and talk about prices in Spanish.",
    order: 5,
    xpReward: 20,
    image: LESSON_IMAGES.shopping,
    goals: [
      { description: "Learn words for shopping and prices." },
      { description: "Ask how much something costs." },
    ],
    activities: [
      {
        id: "es-u1-l5-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Tienda", translation: "Shop / Store", pronunciation: "TYEHN-dah" },
          { word: "Precio", translation: "Price", pronunciation: "PREH-syoh" },
          { word: "Barato", translation: "Cheap", pronunciation: "bah-RAH-toh" },
          { word: "Caro", translation: "Expensive", pronunciation: "KAH-roh" },
          { word: "Comprar", translation: "To buy", pronunciation: "kom-PRAHR" },
        ],
      },
      {
        id: "es-u1-l5-a2",
        type: "phrase",
        title: "Shopping Phrases",
        phrases: [
          {
            phrase: "¿Cuánto cuesta esto?",
            translation: "How much does this cost?",
            pronunciation: "KWAN-toh KWES-tah ES-toh",
          },
          {
            phrase: "¿Tiene una talla más grande?",
            translation: "Do you have a larger size?",
            pronunciation: "TYEH-neh OO-nah TAH-yah mas GRAN-deh",
          },
          {
            phrase: "Es muy caro.",
            translation: "It is very expensive.",
            pronunciation: "es MOO-ee KAH-roh",
          },
        ],
      },
      {
        id: "es-u1-l5-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'expensive' in Spanish?",
        options: ["Barato", "Tienda", "Comprar", "Caro"],
        answer: "Caro",
      },
    ],
    aiTeacherPrompt: {
      intro: "Let's go shopping in Spanish! Today you'll learn how to talk about prices and buy things. First word: 'tienda', which means 'shop' or 'store' — say it: 'TYEHN-dah'. Ready to try?",
      encouragement: "¡Bien hecho! You're ready to hit the market — seriously impressive!",
      lessonContext:
        "This lesson covers five Spanish shopping words: tienda, precio, barato, caro, comprar. Teach only these words and the three shopping phrases listed. Introduce each word with translation and pronunciation. Do not introduce unrelated vocabulary.",
    },
  },

  {
    id: "es-u1-l6",
    unitId: "es-unit-1",
    title: "Family & Friends",
    description: "Talk about your family and describe relationships.",
    order: 6,
    xpReward: 20,
    image: LESSON_IMAGES.family,
    goals: [
      { description: "Learn words for family members." },
      { description: "Describe your family in a simple sentence." },
    ],
    activities: [
      {
        id: "es-u1-l6-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Familia", translation: "Family", pronunciation: "fah-MEE-lyah" },
          { word: "Madre", translation: "Mother", pronunciation: "MAH-dreh" },
          { word: "Padre", translation: "Father", pronunciation: "PAH-dreh" },
          { word: "Hermano", translation: "Brother", pronunciation: "ehr-MAH-noh" },
          { word: "Amigo", translation: "Friend", pronunciation: "ah-MEE-goh" },
        ],
      },
      {
        id: "es-u1-l6-a2",
        type: "phrase",
        title: "Talking About Family",
        phrases: [
          {
            phrase: "Tengo dos hermanos.",
            translation: "I have two brothers.",
            pronunciation: "TEN-goh dos ehr-MAH-nos",
          },
          {
            phrase: "Mi madre se llama María.",
            translation: "My mother's name is María.",
            pronunciation: "mee MAH-dreh seh YAH-mah mah-REE-ah",
          },
          {
            phrase: "Somos una familia grande.",
            translation: "We are a big family.",
            pronunciation: "SOH-mos OO-nah fah-MEE-lyah GRAN-deh",
          },
        ],
      },
      {
        id: "es-u1-l6-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'brother' in Spanish?",
        options: ["Familia", "Padre", "Hermano", "Amigo"],
        answer: "Hermano",
      },
    ],
    aiTeacherPrompt: {
      intro: "Today we're talking about something close to everyone's heart — family! In Spanish, 'familia' means 'family'. It sounds familiar, right? Can you say 'familia'?",
      encouragement: "¡Fantástico! You can now talk about your loved ones in Spanish — that's really special!",
      lessonContext:
        "This lesson covers five Spanish family words: familia, madre, padre, hermano, amigo. Teach only these words and the three family phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  // ── French · Unit 1 ────────────────────────────────────────────────────────

  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Greetings & Introductions",
    description: "Say hello and introduce yourself in French.",
    order: 1,
    xpReward: 10,
    image: LESSON_IMAGES.greetings,
    goals: [
      { description: "Learn 5 essential French greetings." },
      { description: "Introduce yourself with a simple sentence." },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Bonjour", translation: "Hello / Good morning", pronunciation: "bohn-ZHOOR" },
          { word: "Bonsoir", translation: "Good evening", pronunciation: "bohn-SWAHR" },
          { word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
          { word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
          { word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLEH" },
        ],
      },
      {
        id: "fr-u1-l1-a2",
        type: "phrase",
        title: "Introduce Yourself",
        phrases: [
          {
            phrase: "Je m'appelle Marie.",
            translation: "My name is Marie.",
            pronunciation: "zhuh mah-PEL mah-REE",
          },
          {
            phrase: "Enchanté(e).",
            translation: "Nice to meet you.",
            pronunciation: "ahn-shahn-TAY",
            context: "Add -e at the end if you are a woman.",
          },
        ],
      },
      {
        id: "fr-u1-l1-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in French?",
        options: ["Bonjour", "Au revoir", "Merci", "Bonsoir"],
        answer: "Merci",
      },
    ],
    aiTeacherPrompt: {
      intro: "Bonjour — and welcome to French! I'm so glad you're here! Our very first word is 'Bonjour', which means 'Hello' or 'Good morning'. Can you say 'Bonjour' back to me?",
      encouragement: "Très bien — very good! You're already sounding French — I love it!",
      lessonContext:
        "This lesson covers five French greetings: Bonjour, Bonsoir, Au revoir, Merci, S'il vous plaît. Teach only these words and the two introduction phrases listed. Introduce each word with translation and pronunciation. Do not teach other French topics or switch languages.",
    },
  },

  {
    id: "fr-u1-l2",
    unitId: "fr-unit-1",
    title: "Daily Life",
    description: "Talk about your everyday routine in French.",
    order: 2,
    xpReward: 15,
    image: LESSON_IMAGES.dailyLife,
    goals: [
      { description: "Learn 5 words for daily activities." },
      { description: "Describe your morning routine in French." },
    ],
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Maison", translation: "House", pronunciation: "meh-ZON" },
          { word: "Travail", translation: "Work", pronunciation: "trah-VAY" },
          { word: "Manger", translation: "To eat", pronunciation: "mahn-ZHAY" },
          { word: "Dormir", translation: "To sleep", pronunciation: "dor-MEER" },
          { word: "Temps", translation: "Time / Weather", pronunciation: "TAH" },
        ],
      },
      {
        id: "fr-u1-l2-a2",
        type: "phrase",
        title: "Daily Routines",
        phrases: [
          {
            phrase: "À quelle heure tu te lèves?",
            translation: "What time do you wake up?",
            pronunciation: "ah kel EUR tü tuh LEV",
          },
          {
            phrase: "Je me lève à sept heures.",
            translation: "I wake up at seven.",
            pronunciation: "zhuh muh LEV ah set EUR",
          },
          {
            phrase: "Je vais au travail en métro.",
            translation: "I go to work by metro.",
            pronunciation: "zhuh vay oh trah-VAY ahn meh-TROH",
          },
        ],
      },
      {
        id: "fr-u1-l2-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'to eat' in French?",
        options: ["Dormir", "Manger", "Travail", "Maison"],
        answer: "Manger",
      },
    ],
    aiTeacherPrompt: {
      intro: "Bonjour encore — hello again! Today we're talking about daily life in French. Let's start with 'maison', which means 'house' — say it: 'meh-ZON'. Can you try?",
      encouragement: "Très bien! Your French is really coming along — you should be proud!",
      lessonContext:
        "This lesson covers five French daily-life words: maison, travail, manger, dormir, temps. Teach only these words and the three routine phrases listed. Introduce each word with translation and pronunciation. Do not introduce other topics.",
    },
  },

  {
    id: "fr-u1-l3",
    unitId: "fr-unit-1",
    title: "At the Café",
    description: "Order food and drinks at a French café.",
    order: 3,
    xpReward: 15,
    image: LESSON_IMAGES.cafe,
    goals: [
      { description: "Learn vocabulary for café items." },
      { description: "Order food and ask for the bill in French." },
    ],
    activities: [
      {
        id: "fr-u1-l3-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Café", translation: "Coffee", pronunciation: "kah-FAY" },
          { word: "Eau", translation: "Water", pronunciation: "OH" },
          { word: "Table", translation: "Table", pronunciation: "TAH-bluh" },
          { word: "Serveur", translation: "Waiter", pronunciation: "sehr-VUR" },
          { word: "Addition", translation: "Bill / Check", pronunciation: "ah-dee-SYON" },
        ],
      },
      {
        id: "fr-u1-l3-a2",
        type: "phrase",
        title: "Ordering",
        phrases: [
          {
            phrase: "Je voudrais un café, s'il vous plaît.",
            translation: "I would like a coffee, please.",
            pronunciation: "zhuh voo-DREH uhn kah-FAY seel voo PLEH",
          },
          {
            phrase: "Avez-vous une table libre?",
            translation: "Do you have a free table?",
            pronunciation: "ah-veh-VOO ün TAH-bluh LEE-bruh",
          },
          {
            phrase: "L'addition, s'il vous plaît.",
            translation: "The bill, please.",
            pronunciation: "lah-dee-SYON seel voo PLEH",
          },
        ],
      },
      {
        id: "fr-u1-l3-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'water' in French?",
        options: ["Café", "Table", "Eau", "Addition"],
        answer: "Eau",
      },
    ],
    aiTeacherPrompt: {
      intro: "Bienvenue au café — welcome to the café! Imagine you're sitting in Paris right now! Our first word is 'café', which means 'coffee'. Can you say 'café'?",
      encouragement: "Excellent! You could genuinely order at a Parisian café right now — well done!",
      lessonContext:
        "This lesson covers five French café words: café, eau, table, serveur, addition. Teach only these words and the three ordering phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "fr-u1-l4",
    unitId: "fr-unit-1",
    title: "Travel & Directions",
    description: "Ask for and give directions in French.",
    order: 4,
    xpReward: 20,
    image: LESSON_IMAGES.travel,
    goals: [
      { description: "Learn words for left, right, and straight ahead." },
      { description: "Ask for directions to a place." },
    ],
    activities: [
      {
        id: "fr-u1-l4-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Gauche", translation: "Left", pronunciation: "GOHSH" },
          { word: "Droite", translation: "Right", pronunciation: "DRWAHT" },
          { word: "Tout droit", translation: "Straight ahead", pronunciation: "too DRWAH" },
          { word: "Rue", translation: "Street", pronunciation: "RÜ" },
          { word: "Près", translation: "Near / Close", pronunciation: "PREH" },
        ],
      },
      {
        id: "fr-u1-l4-a2",
        type: "phrase",
        title: "Asking Directions",
        phrases: [
          {
            phrase: "Où est la gare?",
            translation: "Where is the train station?",
            pronunciation: "oo eh lah GAHR",
          },
          {
            phrase: "Tournez à droite.",
            translation: "Turn right.",
            pronunciation: "toor-NAY ah DRWAHT",
          },
          {
            phrase: "C'est près d'ici.",
            translation: "It is close to here.",
            pronunciation: "say PREH dee-SEE",
          },
        ],
      },
      {
        id: "fr-u1-l4-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'left' in French?",
        options: ["Droite", "Tout droit", "Gauche", "Rue"],
        answer: "Gauche",
      },
    ],
    aiTeacherPrompt: {
      intro: "Allons-y — let's go! Today we're navigating through a French city together. First word: 'gauche', which means 'left' — say it: 'GOHSH'. Give it a try!",
      encouragement: "Parfait — perfect! You could find your way around Paris now — I'm impressed!",
      lessonContext:
        "This lesson covers five French direction words: gauche, droite, tout droit, rue, près. Teach only these words and the three direction phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "fr-u1-l5",
    unitId: "fr-unit-1",
    title: "Shopping",
    description: "Buy things and ask about prices in French.",
    order: 5,
    xpReward: 20,
    image: LESSON_IMAGES.shopping,
    goals: [
      { description: "Learn words for shopping and prices." },
      { description: "Ask how much something costs in French." },
    ],
    activities: [
      {
        id: "fr-u1-l5-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Magasin", translation: "Shop / Store", pronunciation: "mah-gah-ZAN" },
          { word: "Prix", translation: "Price", pronunciation: "PREE" },
          { word: "Bon marché", translation: "Cheap / Inexpensive", pronunciation: "bon mar-SHAY" },
          { word: "Cher", translation: "Expensive", pronunciation: "SHEHR" },
          { word: "Acheter", translation: "To buy", pronunciation: "ahsh-TAY" },
        ],
      },
      {
        id: "fr-u1-l5-a2",
        type: "phrase",
        title: "Shopping Phrases",
        phrases: [
          {
            phrase: "Combien ça coûte?",
            translation: "How much does this cost?",
            pronunciation: "kom-BYAN sah KOOT",
          },
          {
            phrase: "Avez-vous une taille plus grande?",
            translation: "Do you have a larger size?",
            pronunciation: "ah-veh-VOO ün TAY plü GRAND",
          },
          {
            phrase: "C'est trop cher.",
            translation: "It is too expensive.",
            pronunciation: "say troh SHEHR",
          },
        ],
      },
      {
        id: "fr-u1-l5-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'expensive' in French?",
        options: ["Bon marché", "Magasin", "Acheter", "Cher"],
        answer: "Cher",
      },
    ],
    aiTeacherPrompt: {
      intro: "Faisons du shopping — let's go shopping in French! First word: 'magasin', which means 'shop' or 'store' — say it: 'mah-gah-ZAN'. Ready to try?",
      encouragement: "Bravo! You're genuinely ready to shop on the Champs-Élysées now — great work!",
      lessonContext:
        "This lesson covers five French shopping words: magasin, prix, bon marché, cher, acheter. Teach only these words and the three shopping phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "fr-u1-l6",
    unitId: "fr-unit-1",
    title: "Family & Friends",
    description: "Talk about your family in French.",
    order: 6,
    xpReward: 20,
    image: LESSON_IMAGES.family,
    goals: [
      { description: "Learn words for family members in French." },
      { description: "Describe your family in a simple sentence." },
    ],
    activities: [
      {
        id: "fr-u1-l6-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Famille", translation: "Family", pronunciation: "fah-MEE" },
          { word: "Mère", translation: "Mother", pronunciation: "MEHR" },
          { word: "Père", translation: "Father", pronunciation: "PEHR" },
          { word: "Frère", translation: "Brother", pronunciation: "FREHR" },
          { word: "Ami(e)", translation: "Friend", pronunciation: "ah-MEE" },
        ],
      },
      {
        id: "fr-u1-l6-a2",
        type: "phrase",
        title: "Talking About Family",
        phrases: [
          {
            phrase: "J'ai deux frères.",
            translation: "I have two brothers.",
            pronunciation: "zhay duh FREHR",
          },
          {
            phrase: "Ma mère s'appelle Marie.",
            translation: "My mother's name is Marie.",
            pronunciation: "mah MEHR sah-PEL mah-REE",
          },
          {
            phrase: "Nous sommes une grande famille.",
            translation: "We are a big family.",
            pronunciation: "noo SOM ün GRAND fah-MEE",
          },
        ],
      },
      {
        id: "fr-u1-l6-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'brother' in French?",
        options: ["Famille", "Père", "Frère", "Ami"],
        answer: "Frère",
      },
    ],
    aiTeacherPrompt: {
      intro: "Parlons de la famille — let's talk about family! Today's first word is 'famille', which means 'family' — it even sounds like English! Say it: 'fah-MEE'. Can you try?",
      encouragement: "Magnifique! You can now talk about your family in French — really fantastic!",
      lessonContext:
        "This lesson covers five French family words: famille, mère, père, frère, ami(e). Teach only these words and the three family phrases listed. Introduce each word with translation and pronunciation. Do not introduce other topics.",
    },
  },

  // ── German · Unit 1 ────────────────────────────────────────────────────────

  {
    id: "de-u1-l1",
    unitId: "de-unit-1",
    title: "Greetings & Introductions",
    description: "Say hello and introduce yourself in German.",
    order: 1,
    xpReward: 10,
    image: LESSON_IMAGES.greetings,
    goals: [
      { description: "Learn 5 essential German greetings." },
      { description: "Understand formal and informal greetings." },
    ],
    activities: [
      {
        id: "de-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh" },
          { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen" },
          { word: "Auf Wiedersehen", translation: "Goodbye", pronunciation: "owf VEE-der-zay-en" },
          { word: "Danke", translation: "Thank you", pronunciation: "DAHN-kuh" },
          { word: "Bitte", translation: "Please / You're welcome", pronunciation: "BIT-uh" },
        ],
      },
      {
        id: "de-u1-l1-a2",
        type: "phrase",
        title: "Introduce Yourself",
        phrases: [
          {
            phrase: "Wie heißen Sie?",
            translation: "What is your name? (formal)",
            pronunciation: "vee HY-sen zee",
          },
          {
            phrase: "Ich heiße Thomas.",
            translation: "My name is Thomas.",
            pronunciation: "ikh HY-suh TOH-mas",
          },
        ],
      },
      {
        id: "de-u1-l1-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in German?",
        options: ["Bitte", "Hallo", "Danke", "Tschüss"],
        answer: "Danke",
      },
    ],
    aiTeacherPrompt: {
      intro: "Hallo — and welcome to your very first German lesson! German's going to surprise you — it's more fun than it sounds! Our first word: 'Hallo', which is just 'Hello'. Can you say 'Hallo'?",
      encouragement: "Sehr gut — very good! You're picking this up so fast — keep it up!",
      lessonContext:
        "This lesson covers five German greetings: Hallo, Guten Morgen, Auf Wiedersehen, Danke, Bitte. Teach only these words and the two introduction phrases listed. Note the formal (Sie) vs informal (du) distinction where it comes up. Do not teach other German topics.",
    },
  },

  {
    id: "de-u1-l2",
    unitId: "de-unit-1",
    title: "Daily Life",
    description: "Talk about your everyday routine in German.",
    order: 2,
    xpReward: 15,
    image: LESSON_IMAGES.dailyLife,
    goals: [
      { description: "Learn 5 words for daily activities." },
      { description: "Describe your morning routine in German." },
    ],
    activities: [
      {
        id: "de-u1-l2-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Haus", translation: "House", pronunciation: "HOWS" },
          { word: "Arbeit", translation: "Work", pronunciation: "AHR-byt" },
          { word: "Essen", translation: "To eat / Food", pronunciation: "ES-en" },
          { word: "Schlafen", translation: "To sleep", pronunciation: "SHLAH-fen" },
          { word: "Zeit", translation: "Time", pronunciation: "TSYT" },
        ],
      },
      {
        id: "de-u1-l2-a2",
        type: "phrase",
        title: "Daily Routines",
        phrases: [
          {
            phrase: "Wann stehst du auf?",
            translation: "When do you get up?",
            pronunciation: "van SHTAYST doo OWF",
          },
          {
            phrase: "Ich stehe um sieben Uhr auf.",
            translation: "I get up at seven o'clock.",
            pronunciation: "ikh SHTEH-uh oom ZEE-ben OOR owf",
          },
          {
            phrase: "Ich fahre mit der U-Bahn zur Arbeit.",
            translation: "I take the subway to work.",
            pronunciation: "ikh FAH-ruh mit dehr OO-bahn tsoor AHR-byt",
          },
        ],
      },
      {
        id: "de-u1-l2-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'to sleep' in German?",
        options: ["Essen", "Arbeit", "Schlafen", "Haus"],
        answer: "Schlafen",
      },
    ],
    aiTeacherPrompt: {
      intro: "Guten Tag — good day! Today we're talking about everyday life in German. Let's start with 'Haus', which means 'house' — it even sounds a bit like English! Can you say 'Haus'?",
      encouragement: "Sehr gut! You're building a great foundation — I'm really proud of you!",
      lessonContext:
        "This lesson covers five German daily-life words: Haus, Arbeit, Essen, Schlafen, Zeit. Teach only these words and the three routine phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "de-u1-l3",
    unitId: "de-unit-1",
    title: "At the Café",
    description: "Order food and drinks at a German café.",
    order: 3,
    xpReward: 15,
    image: LESSON_IMAGES.cafe,
    goals: [
      { description: "Learn vocabulary for café items." },
      { description: "Order food and ask for the bill in German." },
    ],
    activities: [
      {
        id: "de-u1-l3-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Kaffee", translation: "Coffee", pronunciation: "KAH-feh" },
          { word: "Wasser", translation: "Water", pronunciation: "VAH-ser" },
          { word: "Tisch", translation: "Table", pronunciation: "TISH" },
          { word: "Kellner", translation: "Waiter", pronunciation: "KEL-ner" },
          { word: "Rechnung", translation: "Bill / Check", pronunciation: "REKH-noong" },
        ],
      },
      {
        id: "de-u1-l3-a2",
        type: "phrase",
        title: "Ordering",
        phrases: [
          {
            phrase: "Ich hätte gerne einen Kaffee.",
            translation: "I would like a coffee.",
            pronunciation: "ikh HET-uh GEHR-nuh EY-nen KAH-feh",
          },
          {
            phrase: "Haben Sie einen freien Tisch?",
            translation: "Do you have a free table?",
            pronunciation: "HAH-ben zee EY-nen FRY-en TISH",
          },
          {
            phrase: "Die Rechnung, bitte.",
            translation: "The bill, please.",
            pronunciation: "dee REKH-noong BIT-uh",
          },
        ],
      },
      {
        id: "de-u1-l3-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'water' in German?",
        options: ["Kaffee", "Tisch", "Wasser", "Rechnung"],
        answer: "Wasser",
      },
    ],
    aiTeacherPrompt: {
      intro: "Willkommen im Café — welcome to the café! Today we're ordering food and drinks in German. First word: 'Kaffee', which means 'coffee' — say it: 'KAH-feh'. Can you try?",
      encouragement: "Wunderbar — wonderful! You could genuinely order at a German café now!",
      lessonContext:
        "This lesson covers five German café words: Kaffee, Wasser, Tisch, Kellner, Rechnung. Teach only these words and the three ordering phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "de-u1-l4",
    unitId: "de-unit-1",
    title: "Travel & Directions",
    description: "Ask for and give directions in German.",
    order: 4,
    xpReward: 20,
    image: LESSON_IMAGES.travel,
    goals: [
      { description: "Learn words for left, right, and straight ahead." },
      { description: "Ask for directions in German." },
    ],
    activities: [
      {
        id: "de-u1-l4-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Links", translation: "Left", pronunciation: "LINKS" },
          { word: "Rechts", translation: "Right", pronunciation: "REKHTS" },
          { word: "Geradeaus", translation: "Straight ahead", pronunciation: "geh-RAH-deh-ows" },
          { word: "Straße", translation: "Street", pronunciation: "SHTRAH-seh" },
          { word: "Nah", translation: "Near / Close", pronunciation: "NAH" },
        ],
      },
      {
        id: "de-u1-l4-a2",
        type: "phrase",
        title: "Asking Directions",
        phrases: [
          {
            phrase: "Wo ist der Bahnhof?",
            translation: "Where is the train station?",
            pronunciation: "voh ist dehr BAHN-hohf",
          },
          {
            phrase: "Biegen Sie rechts ab.",
            translation: "Turn right.",
            pronunciation: "BEE-gen zee REKHTS ahp",
          },
          {
            phrase: "Es ist hier in der Nähe.",
            translation: "It is close to here.",
            pronunciation: "es ist heer in dehr NEH-uh",
          },
        ],
      },
      {
        id: "de-u1-l4-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'left' in German?",
        options: ["Rechts", "Geradeaus", "Links", "Straße"],
        answer: "Links",
      },
    ],
    aiTeacherPrompt: {
      intro: "Los geht's — let's go! Today we're navigating a German city together. First word: 'links', which means 'left' — short and sharp: 'LINKS'. Can you say it?",
      encouragement: "Prima! You could find your way around Berlin now — seriously well done!",
      lessonContext:
        "This lesson covers five German direction words: links, rechts, geradeaus, Straße, nah. Teach only these words and the three direction phrases listed. Introduce each word with translation and pronunciation. Do not introduce other topics.",
    },
  },

  {
    id: "de-u1-l5",
    unitId: "de-unit-1",
    title: "Shopping",
    description: "Buy things and ask about prices in German.",
    order: 5,
    xpReward: 20,
    image: LESSON_IMAGES.shopping,
    goals: [
      { description: "Learn words for shopping and prices." },
      { description: "Ask how much something costs in German." },
    ],
    activities: [
      {
        id: "de-u1-l5-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Geschäft", translation: "Shop / Store", pronunciation: "guh-SHEFT" },
          { word: "Preis", translation: "Price", pronunciation: "PRYS" },
          { word: "Günstig", translation: "Cheap / Affordable", pronunciation: "GÜNS-tikh" },
          { word: "Teuer", translation: "Expensive", pronunciation: "TOY-er" },
          { word: "Kaufen", translation: "To buy", pronunciation: "KOW-fen" },
        ],
      },
      {
        id: "de-u1-l5-a2",
        type: "phrase",
        title: "Shopping Phrases",
        phrases: [
          {
            phrase: "Was kostet das?",
            translation: "How much does this cost?",
            pronunciation: "vas KOS-tet dahs",
          },
          {
            phrase: "Haben Sie das in einer größeren Größe?",
            translation: "Do you have this in a larger size?",
            pronunciation: "HAH-ben zee dahs in EY-ner GRUH-ser-en GRUH-seh",
          },
          {
            phrase: "Das ist zu teuer.",
            translation: "That is too expensive.",
            pronunciation: "dahs ist tsoo TOY-er",
          },
        ],
      },
      {
        id: "de-u1-l5-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'expensive' in German?",
        options: ["Günstig", "Geschäft", "Kaufen", "Teuer"],
        answer: "Teuer",
      },
    ],
    aiTeacherPrompt: {
      intro: "Auf zum Einkaufen — let's go shopping in German! First word: 'Geschäft', which means 'shop' or 'store' — say it: 'guh-SHEFT'. Want to give it a try?",
      encouragement: "Ausgezeichnet — excellent! You're genuinely ready to shop in Germany now!",
      lessonContext:
        "This lesson covers five German shopping words: Geschäft, Preis, günstig, teuer, kaufen. Teach only these words and the three shopping phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "de-u1-l6",
    unitId: "de-unit-1",
    title: "Family & Friends",
    description: "Talk about your family in German.",
    order: 6,
    xpReward: 20,
    image: LESSON_IMAGES.family,
    goals: [
      { description: "Learn words for family members in German." },
      { description: "Describe your family in a simple sentence." },
    ],
    activities: [
      {
        id: "de-u1-l6-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "Familie", translation: "Family", pronunciation: "fah-MEE-lyeh" },
          { word: "Mutter", translation: "Mother", pronunciation: "MOOT-er" },
          { word: "Vater", translation: "Father", pronunciation: "FAH-ter" },
          { word: "Bruder", translation: "Brother", pronunciation: "BROO-der" },
          { word: "Freund(in)", translation: "Friend", pronunciation: "FROYND" },
        ],
      },
      {
        id: "de-u1-l6-a2",
        type: "phrase",
        title: "Talking About Family",
        phrases: [
          {
            phrase: "Ich habe zwei Brüder.",
            translation: "I have two brothers.",
            pronunciation: "ikh HAH-buh tsvy BRÜH-der",
          },
          {
            phrase: "Meine Mutter heißt Maria.",
            translation: "My mother's name is Maria.",
            pronunciation: "MY-nuh MOOT-er HYTST mah-REE-ah",
          },
          {
            phrase: "Wir sind eine große Familie.",
            translation: "We are a big family.",
            pronunciation: "veer zint EY-nuh GROH-seh fah-MEE-lyeh",
          },
        ],
      },
      {
        id: "de-u1-l6-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'brother' in German?",
        options: ["Familie", "Vater", "Bruder", "Freund"],
        answer: "Bruder",
      },
    ],
    aiTeacherPrompt: {
      intro: "Sprechen wir über die Familie — let's talk about family! First word: 'Familie', which means 'family' — and it sounds so close to English! Say it: 'fah-MEE-lyeh'. Can you try?",
      encouragement: "Toll gemacht — well done! You can now talk about your family in German — that's brilliant!",
      lessonContext:
        "This lesson covers five German family words: Familie, Mutter, Vater, Bruder, Freund(in). Teach only these words and the three family phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  // ── Japanese · Unit 1 ──────────────────────────────────────────────────────

  {
    id: "jp-u1-l1",
    unitId: "jp-unit-1",
    title: "Greetings & Introductions",
    description: "Say hello and thank you in Japanese.",
    order: 1,
    xpReward: 10,
    image: LESSON_IMAGES.greetings,
    goals: [
      { description: "Learn 5 essential Japanese greetings." },
      { description: "Understand bowing culture basics." },
    ],
    activities: [
      {
        id: "jp-u1-l1-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "こんにちは", translation: "Hello", pronunciation: "Konnichiwa" },
          { word: "おはようございます", translation: "Good morning", pronunciation: "Ohayou gozaimasu" },
          { word: "さようなら", translation: "Goodbye", pronunciation: "Sayounara" },
          { word: "ありがとう", translation: "Thank you", pronunciation: "Arigatou" },
          { word: "すみません", translation: "Excuse me / Sorry", pronunciation: "Sumimasen" },
        ],
      },
      {
        id: "jp-u1-l1-a2",
        type: "phrase",
        title: "Introduce Yourself",
        phrases: [
          {
            phrase: "はじめまして。",
            translation: "Nice to meet you.",
            pronunciation: "Hajimemashite",
            context: "Used when meeting someone for the first time.",
          },
          {
            phrase: "わたしは田中です。",
            translation: "I am Tanaka.",
            pronunciation: "Watashi wa Tanaka desu",
          },
        ],
      },
      {
        id: "jp-u1-l1-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'Thank you' in Japanese?",
        options: ["こんにちは", "さようなら", "ありがとう", "すみません"],
        answer: "ありがとう",
      },
    ],
    aiTeacherPrompt: {
      intro: "Konnichiwa — hello, and welcome to Japanese! This is such a beautiful language, and we'll go step by step. Our very first word is 'Konnichiwa', which means 'Hello' — say it with me: 'Kon-ni-chi-wa'. Can you try?",
      encouragement: "Yoku dekimashita — well done! You're off to a wonderful start — I'm so impressed!",
      lessonContext:
        "This lesson covers five Japanese greetings: こんにちは, おはようございます, さようなら, ありがとう, すみません. Teach only these words and the two introduction phrases listed. We use the polite form throughout. Do not introduce other Japanese topics or scripts.",
    },
  },

  {
    id: "jp-u1-l2",
    unitId: "jp-unit-1",
    title: "Daily Life",
    description: "Talk about your everyday routine in Japanese.",
    order: 2,
    xpReward: 15,
    image: LESSON_IMAGES.dailyLife,
    goals: [
      { description: "Learn 5 words for daily activities." },
      { description: "Describe your morning routine in Japanese." },
    ],
    activities: [
      {
        id: "jp-u1-l2-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "いえ", translation: "House / Home", pronunciation: "Ie" },
          { word: "しごと", translation: "Work", pronunciation: "Shigoto" },
          { word: "たべる", translation: "To eat", pronunciation: "Taberu" },
          { word: "ねる", translation: "To sleep", pronunciation: "Neru" },
          { word: "じかん", translation: "Time", pronunciation: "Jikan" },
        ],
      },
      {
        id: "jp-u1-l2-a2",
        type: "phrase",
        title: "Daily Routines",
        phrases: [
          {
            phrase: "なんじにおきますか？",
            translation: "What time do you wake up?",
            pronunciation: "Nanji ni okimasu ka?",
          },
          {
            phrase: "しちじにおきます。",
            translation: "I wake up at seven.",
            pronunciation: "Shichiji ni okimasu.",
          },
          {
            phrase: "でんしゃでかいしゃへいきます。",
            translation: "I go to work by train.",
            pronunciation: "Densha de kaisha e ikimasu.",
          },
        ],
      },
      {
        id: "jp-u1-l2-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'to eat' in Japanese?",
        options: ["ねる", "たべる", "しごと", "じかん"],
        answer: "たべる",
      },
    ],
    aiTeacherPrompt: {
      intro: "Konnichiwa — great to see you again! Today we're talking about daily life in Japanese. Let's start with 'ie' — written いえ — which means 'home' or 'house'. Say it: 'ee-eh'. Can you try?",
      encouragement: "Yoku dekimashita — well done! Great progress today — you're doing brilliantly!",
      lessonContext:
        "This lesson covers five Japanese daily-life words: いえ, しごと, たべる, ねる, じかん. Teach only these words and the three routine phrases listed. Introduce each word with translation and pronunciation. Do not introduce other topics or additional vocabulary.",
    },
  },

  {
    id: "jp-u1-l3",
    unitId: "jp-unit-1",
    title: "At the Café",
    description: "Order food and drinks at a Japanese café.",
    order: 3,
    xpReward: 15,
    image: LESSON_IMAGES.cafe,
    goals: [
      { description: "Learn vocabulary for café items in Japanese." },
      { description: "Order food and ask for the bill." },
    ],
    activities: [
      {
        id: "jp-u1-l3-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "コーヒー", translation: "Coffee", pronunciation: "Koohii" },
          { word: "みず", translation: "Water", pronunciation: "Mizu" },
          { word: "テーブル", translation: "Table", pronunciation: "Teeburu" },
          { word: "てんいん", translation: "Staff / Waiter", pronunciation: "Ten'in" },
          { word: "おかいけい", translation: "Bill / Check", pronunciation: "Okaikei" },
        ],
      },
      {
        id: "jp-u1-l3-a2",
        type: "phrase",
        title: "Ordering",
        phrases: [
          {
            phrase: "コーヒーをひとつください。",
            translation: "One coffee, please.",
            pronunciation: "Koohii o hitotsu kudasai.",
          },
          {
            phrase: "あいているせきはありますか？",
            translation: "Do you have any free seats?",
            pronunciation: "Aite iru seki wa arimasu ka?",
          },
          {
            phrase: "おかいけいをおねがいします。",
            translation: "The bill, please.",
            pronunciation: "Okaikei o onegaishimasu.",
          },
        ],
      },
      {
        id: "jp-u1-l3-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'water' in Japanese?",
        options: ["コーヒー", "テーブル", "みず", "おかいけい"],
        answer: "みず",
      },
    ],
    aiTeacherPrompt: {
      intro: "Irasshaimase — welcome to the café! Today we're ordering food and drinks in Japanese. First word: 'Koohii' — コーヒー — which means 'coffee'. Say it: 'Koh-hee'. Can you try?",
      encouragement: "Jouzu desu ne — you sound very natural! Seriously, that was great!",
      lessonContext:
        "This lesson covers five Japanese café words: コーヒー, みず, テーブル, てんいん, おかいけい. Teach only these words and the three ordering phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "jp-u1-l4",
    unitId: "jp-unit-1",
    title: "Travel & Directions",
    description: "Ask for and give directions in Japanese.",
    order: 4,
    xpReward: 20,
    image: LESSON_IMAGES.travel,
    goals: [
      { description: "Learn words for left, right, and straight ahead in Japanese." },
      { description: "Ask where a place is." },
    ],
    activities: [
      {
        id: "jp-u1-l4-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "ひだり", translation: "Left", pronunciation: "Hidari" },
          { word: "みぎ", translation: "Right", pronunciation: "Migi" },
          { word: "まっすぐ", translation: "Straight ahead", pronunciation: "Massugu" },
          { word: "みち", translation: "Road / Street", pronunciation: "Michi" },
          { word: "ちかく", translation: "Near / Close", pronunciation: "Chikaku" },
        ],
      },
      {
        id: "jp-u1-l4-a2",
        type: "phrase",
        title: "Asking Directions",
        phrases: [
          {
            phrase: "えきはどこですか？",
            translation: "Where is the station?",
            pronunciation: "Eki wa doko desu ka?",
          },
          {
            phrase: "みぎにまがってください。",
            translation: "Please turn right.",
            pronunciation: "Migi ni magatte kudasai.",
          },
          {
            phrase: "ここからちかいです。",
            translation: "It is close from here.",
            pronunciation: "Koko kara chikai desu.",
          },
        ],
      },
      {
        id: "jp-u1-l4-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'left' in Japanese?",
        options: ["みぎ", "まっすぐ", "ひだり", "みち"],
        answer: "ひだり",
      },
    ],
    aiTeacherPrompt: {
      intro: "Ikimashou — let's go! Today we're finding our way around a Japanese city. First word: 'hidari' — ひだり — which means 'left'. Say it: 'hee-dah-ree'. Give it a try!",
      encouragement: "Subarashii — wonderful! You'd navigate Tokyo with ease now — amazing work!",
      lessonContext:
        "This lesson covers five Japanese direction words: ひだり, みぎ, まっすぐ, みち, ちかく. Teach only these words and the three direction phrases listed. Introduce each word with translation and pronunciation. Do not introduce other topics.",
    },
  },

  {
    id: "jp-u1-l5",
    unitId: "jp-unit-1",
    title: "Shopping",
    description: "Buy things and ask about prices in Japanese.",
    order: 5,
    xpReward: 20,
    image: LESSON_IMAGES.shopping,
    goals: [
      { description: "Learn words for shopping and prices in Japanese." },
      { description: "Ask how much something costs." },
    ],
    activities: [
      {
        id: "jp-u1-l5-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "みせ", translation: "Shop / Store", pronunciation: "Mise" },
          { word: "ねだん", translation: "Price", pronunciation: "Nedan" },
          { word: "やすい", translation: "Cheap / Inexpensive", pronunciation: "Yasui" },
          { word: "たかい", translation: "Expensive", pronunciation: "Takai" },
          { word: "かう", translation: "To buy", pronunciation: "Kau" },
        ],
      },
      {
        id: "jp-u1-l5-a2",
        type: "phrase",
        title: "Shopping Phrases",
        phrases: [
          {
            phrase: "これはいくらですか？",
            translation: "How much is this?",
            pronunciation: "Kore wa ikura desu ka?",
          },
          {
            phrase: "もっとおおきいサイズはありますか？",
            translation: "Do you have a larger size?",
            pronunciation: "Motto ookii saizu wa arimasu ka?",
          },
          {
            phrase: "たかすぎます。",
            translation: "It is too expensive.",
            pronunciation: "Taka sugimasu.",
          },
        ],
      },
      {
        id: "jp-u1-l5-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'expensive' in Japanese?",
        options: ["やすい", "みせ", "かう", "たかい"],
        answer: "たかい",
      },
    ],
    aiTeacherPrompt: {
      intro: "Kaimono ni ikimashou — let's go shopping in Japanese! First word: 'mise' — みせ — which means 'shop' or 'store'. Say it: 'mee-seh'. Easy, right? Can you try?",
      encouragement: "Yokatta — wonderful! You're genuinely ready to shop in Japan — great job!",
      lessonContext:
        "This lesson covers five Japanese shopping words: みせ, ねだん, やすい, たかい, かう. Teach only these words and the three shopping phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },

  {
    id: "jp-u1-l6",
    unitId: "jp-unit-1",
    title: "Family & Friends",
    description: "Talk about your family in Japanese.",
    order: 6,
    xpReward: 20,
    image: LESSON_IMAGES.family,
    goals: [
      { description: "Learn words for family members in Japanese." },
      { description: "Describe your family in a simple sentence." },
    ],
    activities: [
      {
        id: "jp-u1-l6-a1",
        type: "vocabulary",
        title: "Key Words",
        vocabulary: [
          { word: "かぞく", translation: "Family", pronunciation: "Kazoku" },
          { word: "はは", translation: "Mother (own)", pronunciation: "Haha" },
          { word: "ちち", translation: "Father (own)", pronunciation: "Chichi" },
          { word: "あに", translation: "Older brother", pronunciation: "Ani" },
          { word: "ともだち", translation: "Friend", pronunciation: "Tomodachi" },
        ],
      },
      {
        id: "jp-u1-l6-a2",
        type: "phrase",
        title: "Talking About Family",
        phrases: [
          {
            phrase: "あには二人います。",
            translation: "I have two older brothers.",
            pronunciation: "Ani wa futari imasu.",
          },
          {
            phrase: "はははマリアといいます。",
            translation: "My mother's name is Maria.",
            pronunciation: "Haha wa Maria to iimasu.",
          },
          {
            phrase: "わたしたちはおおきいかぞくです。",
            translation: "We are a big family.",
            pronunciation: "Watashitachi wa ookii kazoku desu.",
          },
        ],
      },
      {
        id: "jp-u1-l6-a3",
        type: "quiz",
        title: "Quick Check",
        question: "How do you say 'friend' in Japanese?",
        options: ["かぞく", "ちち", "あに", "ともだち"],
        answer: "ともだち",
      },
    ],
    aiTeacherPrompt: {
      intro: "Kazoku no hanashi wo shimashou — let's talk about family! First word: 'kazoku' — かぞく — which means 'family'. Say it: 'kah-zo-ku'. Can you try?",
      encouragement: "Kanpeki — perfect! You can now talk about your family in Japanese — truly fantastic!",
      lessonContext:
        "This lesson covers five Japanese family words: かぞく, はは, ちち, あに, ともだち. Teach only these words and the three family phrases listed. Introduce each word with translation and pronunciation. Stay strictly within this lesson.",
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId).sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
