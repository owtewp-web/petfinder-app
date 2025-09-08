// src/data/mockPets.js
export const mockPets = [
  {
    id: 1,
    name: "Milo",
    type: "Chat",
    race: "Européen",
    color: "Roux et blanc",
    location: "Lyon 3ème",
    distance: "0.5 km",
    lostDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
    reward: 50,
    image: "🐱",
    description: "Chat très affectueux, répond à son nom. Porte un collier rouge avec une médaille en forme d'os.",
    participants: 12,
    sightings: 3,
    owner: {
      id: 1,
      name: "Marie L.",
      phone: "06.12.34.56.78",
      avatar: "👩‍🦰"
    },
    coordinates: {
      lat: 45.7640,
      lng: 4.8357
    },
    status: 'lost',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    name: "Bella",
    type: "Chien",
    race: "Golden Retriever",
    color: "Doré",
    location: "Villeurbanne",
    distance: "1.2 km",
    lostDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Il y a 3 jours
    reward: 100,
    image: "🐕",
    description: "Chienne très gentille, un peu craintive avec les inconnus. Puce électronique, tatouage dans l'oreille droite.",
    participants: 25,
    sightings: 7,
    owner: {
      id: 2,
      name: "Jean-Pierre M.",
      phone: "06.98.76.54.32",
      avatar: "👨‍🦳"
    },
    coordinates: {
      lat: 45.7797,
      lng: 4.8656
    },
    status: 'lost',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    name: "Rocky",
    type: "Chat",
    race: "Maine Coon",
    color: "Noir et blanc",
    location: "Lyon 6ème",
    distance: "2.1 km",
    lostDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 1 semaine
    reward: 75,
    image: "🐱",
    description: "Grand chat au poil long, très reconnaissable. Tatouage dans l'oreille gauche. Très sociable.",
    participants: 18,
    sightings: 5,
    owner: {
      id: 3,
      name: "Sophie R.",
      phone: "07.11.22.33.44",
      avatar: "👩‍🦱"
    },
    coordinates: {
      lat: 45.7578,
      lng: 4.8320
    },
    status: 'lost',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 4,
    name: "Luna",
    type: "Chien",
    race: "Berger Australien",
    color: "Bleu merle",
    location: "Lyon 7ème",
    distance: "3.5 km",
    lostDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
    reward: 150,
    image: "🐕",
    description: "Chienne très énergique, yeux vairons (un bleu, un marron). Très obéissante, répond aux ordres de base.",
    participants: 8,
    sightings: 2,
    owner: {
      id: 4,
      name: "Thomas B.",
      phone: "06.55.44.33.22",
      avatar: "👨‍🦱"
    },
    coordinates: {
      lat: 45.7500,
      lng: 4.8400
    },
    status: 'lost',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 5,
    name: "Simba",
    type: "Chat",
    race: "Persan",
    color: "Orange",
    location: "Lyon 2ème",
    distance: "1.8 km",
    lostDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Il y a 5 jours
    reward: 80,
    image: "🐱",
    description: "Chat persan au poil long orange. Très calme et casanier. Porte un collier bleu avec grelot.",
    participants: 15,
    sightings: 4,
    owner: {
      id: 5,
      name: "Emma R.",
      phone: "07.88.99.00.11",
      avatar: "👩"
    },
    coordinates: {
      lat: 45.7489,
      lng: 4.8270
    },
    status: 'lost',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

// Données mockées pour les signalements
export const mockSightings = [
  {
    id: 1,
    petId: 1,
    reportedBy: "Thomas B.",
    location: "Parc de la Tête d'Or",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
    description: "Vu près du lac, semblait en bonne santé",
    status: "verified"
  },
  {
    id: 2,
    petId: 2,
    reportedBy: "Sophie M.",
    location: "Rue de la République",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // Il y a 45min
    description: "Aperçu traversant la rue, a couru vers le parc",
    status: "pending"
  }
];