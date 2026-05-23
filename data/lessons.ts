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
      intro: "¡Hola! I'm your Spanish teacher. Today we'll learn how to greet people in Spanish. Ready?",
      encouragement: "Great job! You're already sounding like a native speaker.",
      lessonContext:
        "This lesson covers everyday Spanish greetings. Focus on pronunciation and the informal/formal distinction.",
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
      intro: "¡Hola de nuevo! Today we talk about your daily life. Let's practice!",
      encouragement: "¡Muy bien! You're building a solid foundation.",
      lessonContext: "Everyday routine vocabulary and simple sentences about daily activities.",
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
      intro: "¡Bienvenido al café! Today we learn how to order in a Spanish café.",
      encouragement: "¡Excelente! You'd fit right in at a café in Madrid.",
      lessonContext: "Café vocabulary and ordering phrases for beginners.",
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
      intro: "¡Vámonos! Today we learn how to get around in a Spanish-speaking city.",
      encouragement: "¡Perfecto! You'll never get lost again.",
      lessonContext: "Directional vocabulary and phrases for navigating a city.",
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
      intro: "¡Vamos de compras! Today we learn how to shop in Spanish.",
      encouragement: "¡Bien hecho! You're ready to bargain at the market.",
      lessonContext: "Shopping vocabulary and phrases for buying items and asking prices.",
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
      intro: "¡Hola, familia! Today we talk about family and relationships in Spanish.",
      encouragement: "¡Fantástico! You can now talk about your loved ones in Spanish.",
      lessonContext: "Family vocabulary and simple sentences describing relationships.",
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
      intro: "Bonjour! I'm your French teacher. Let's start with greetings — the first step to any conversation.",
      encouragement: "Très bien! You're speaking French already.",
      lessonContext: "Introductory French greetings and self-introduction phrases.",
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
      intro: "Bonjour encore! Today we talk about daily life in French.",
      encouragement: "Très bien! Your French is coming along nicely.",
      lessonContext: "Everyday routine vocabulary for French learners.",
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
      intro: "Bienvenue au café! Today we practice ordering in French.",
      encouragement: "Excellent! You could order at a Parisian café right now.",
      lessonContext: "Café ordering vocabulary and phrases for French beginners.",
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
      intro: "Allons-y! Today we navigate through a French city.",
      encouragement: "Parfait! You can now find your way in Paris.",
      lessonContext: "Directional vocabulary for navigating French cities.",
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
      intro: "Faisons du shopping! Today we go shopping in French.",
      encouragement: "Bravo! You're ready to shop on the Champs-Élysées.",
      lessonContext: "Shopping vocabulary and price-asking phrases in French.",
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
      intro: "Parlons de la famille! Today we talk about family in French.",
      encouragement: "Magnifique! You can now talk about your family in French.",
      lessonContext: "Family vocabulary and descriptive sentences in French.",
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
      intro: "Hallo! Welcome to your first German lesson. Let's learn how to greet people.",
      encouragement: "Sehr gut! You're getting the hang of it.",
      lessonContext: "Introductory German greetings. Note that German has formal (Sie) and informal (du) forms.",
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
      intro: "Guten Tag! Today we talk about daily life in German.",
      encouragement: "Sehr gut! You're building a great vocabulary.",
      lessonContext: "Everyday routine vocabulary for German learners.",
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
      intro: "Willkommen im Café! Today we learn how to order in German.",
      encouragement: "Wunderbar! You can now order at a German café.",
      lessonContext: "Café vocabulary and ordering phrases for German beginners.",
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
      intro: "Los geht's! Today we navigate through a German city.",
      encouragement: "Prima! You can now find your way in Berlin.",
      lessonContext: "Directional vocabulary for navigating German cities.",
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
      intro: "Auf zum Einkaufen! Today we go shopping in German.",
      encouragement: "Ausgezeichnet! You're ready to shop in Germany.",
      lessonContext: "Shopping vocabulary and price-asking phrases in German.",
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
      intro: "Sprechen wir über die Familie! Today we talk about family in German.",
      encouragement: "Toll gemacht! You can now talk about your family in German.",
      lessonContext: "Family vocabulary and descriptive sentences in German.",
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
      intro: "Konnichiwa! Welcome to Japanese. This is a beautiful language — let's start with greetings.",
      encouragement: "Yoku dekimashita! (Well done!) You're off to a great start.",
      lessonContext:
        "Basic Japanese greetings. Japanese uses different levels of politeness — we start with the polite form.",
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
      intro: "Konnichiwa! Today we talk about daily life in Japanese.",
      encouragement: "Yoku dekimashita! Great progress!",
      lessonContext: "Everyday routine vocabulary for Japanese learners.",
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
      intro: "Irasshaimase! Welcome to the café. Today we order in Japanese.",
      encouragement: "Jouzu desu ne! You sound very natural.",
      lessonContext: "Café vocabulary and ordering phrases for Japanese learners.",
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
      intro: "Ikimashou! Today we navigate through a Japanese city.",
      encouragement: "Subarashii! You can now find your way in Tokyo.",
      lessonContext: "Directional vocabulary for navigating Japanese cities.",
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
      intro: "Kaimono ni ikimashou! Today we go shopping in Japanese.",
      encouragement: "Yokatta! You're ready to shop in Japan.",
      lessonContext: "Shopping vocabulary and price-asking phrases in Japanese.",
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
      intro: "Kazoku no hanashi wo shimashou! Today we talk about family in Japanese.",
      encouragement: "Kanpeki! You can now talk about your family in Japanese.",
      lessonContext: "Family vocabulary and descriptive sentences in Japanese.",
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId).sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
