// src/data/mockUser.js
export const mockUser = {
  id: 1,
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie.dupont@email.com",
  phone: "06.12.34.56.78",
  city: "Lyon",
  avatar: "👩‍🦰",
  joinDate: "Mars 2024",
  location: "Lyon, France"
};

export const mockUserProfile = {
  name: "Marie Dupont",
  avatar: "👩‍🦰",
  level: "Héros des Animaux",
  levelNumber: 7,
  totalPoints: 2850,
  nextLevelPoints: 3000,
  joinDate: "Mars 2024",
  location: "Lyon, France",
  stats: {
    searchesParticipated: 23,
    animalsFound: 8,
    hoursVolunteered: 47,
    thanksReceived: 156,
    streakDays: 12,
    badgesEarned: 6
  }
};

export const mockBadges = [
  {
    id: 1,
    name: "Première Recherche",
    icon: "🔍",
    description: "Participer à sa première recherche",
    earned: true,
    earnedDate: "Mars 2024",
    points: 50
  },
  {
    id: 2,
    name: "Sauveur de Chat",
    icon: "🐱",
    description: "Aider à retrouver 3 chats",
    earned: true,
    earnedDate: "Avril 2024",
    points: 100
  },
  {
    id: 3,
    name: "Héros du Quartier",
    icon: "🏘️",
    description: "Être actif dans sa zone pendant 1 mois",
    earned: true,
    earnedDate: "Mai 2024",
    points: 150
  },
  {
    id: 4,
    name: "Ami des Chiens",
    icon: "🐕",
    description: "Aider à retrouver 3 chiens",
    earned: true,
    earnedDate: "Juin 2024",
    points: 100
  },
  {
    id: 5,
    name: "Photographe",
    icon: "📸",
    description: "Prendre 10 photos d'animaux perdus",
    earned: true,
    earnedDate: "Juillet 2024",
    points: 75
  },
  {
    id: 6,
    name: "Communicant",
    icon: "💬",
    description: "Envoyer 50 messages utiles",
    earned: true,
    earnedDate: "Août 2024",
    points: 80
  },
  {
    id: 7,
    name: "Marathonien",
    icon: "🏃",
    description: "Chercher pendant plus de 5h d'affilée",
    earned: false,
    points: 200
  },
  {
    id: 8,
    name: "Ange Gardien",
    icon: "👼",
    description: "Aider à retrouver 10 animaux",
    earned: false,
    points: 300
  },
  {
    id: 9,
    name: "Influenceur",
    icon: "📢",
    description: "Partager 20 annonces sur les réseaux",
    earned: false,
    points: 120
  }
];

export const mockRecentActivity = [
  {
    id: 1,
    action: "A participé à la recherche de",
    animal: "Bella",
    type: "🐕",
    points: "+50",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // Il y a 2h
  },
  {
    id: 2,
    action: "A signalé avoir vu",
    animal: "Rocky",
    type: "🐱",
    points: "+25",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // Hier
  },
  {
    id: 3,
    action: "A créé une annonce pour",
    animal: "Minou",
    type: "🐱",
    points: "+10",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // Il y a 3 jours
  },
  {
    id: 4,
    action: "Badge obtenu:",
    animal: "Ami des Chiens",
    type: "🏆",
    points: "+100",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Il y a 5 jours
  }
];