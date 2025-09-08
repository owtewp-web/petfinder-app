// App.js - Gestion de la navigation principale
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import SightingScreen from './screens/SightingScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateScreen from './screens/CreateScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import MyAnimalsScreen from './screens/MyAnimalsScreen';

export default function App() {
  // État pour gérer la navigation entre les écrans
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour gérer la connexion depuis AuthScreen
  const handleLogin = () => {
    console.log('Utilisateur connecté !');
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  // Fonction pour naviguer vers le profil
  const handleNavigateToProfile = () => {
    console.log('Navigation vers le profil');
    setCurrentScreen('profile');
  };

  // Fonction pour naviguer vers le détail d'un animal
  const handleNavigateToDetail = (pet) => {
    console.log('Navigation vers le détail de:', pet.name);
    setSelectedPet(pet);
    setCurrentScreen('detail');
  };

  // Fonction pour naviguer vers la création d'annonce
  const handleNavigateToCreate = () => {
    console.log('Navigation vers la création d\'annonce');
    setCurrentScreen('create');
  };

  // Fonction pour naviguer vers le signalement d'observation
  const handleNavigateToSighting = (pet) => {
    console.log('Navigation vers signalement pour:', pet.name);
    setSelectedPet(pet);
    setCurrentScreen('sighting');
  };

  // Fonction pour naviguer vers les messages
  const handleNavigateToMessages = () => {
    console.log('Navigation vers les messages');
    setCurrentScreen('messages');
  };

  // Fonction pour naviguer vers un chat spécifique
  const handleNavigateToChat = (announcement) => {
    console.log('Navigation vers chat pour:', announcement.petName);
    setSelectedAnnouncement(announcement);
    setCurrentScreen('chat');
  };

  // Fonction pour naviguer vers mes animaux
  const handleNavigateToMyAnimals = () => {
    console.log('Navigation vers mes animaux');
    setCurrentScreen('myanimals');
  };

  // Fonction pour revenir à l'accueil
  const handleNavigateToHome = () => {
    console.log('Retour à l\'accueil');
    setCurrentScreen('home');
    setSelectedPet(null);
    setSelectedAnnouncement(null);
  };

  // Gestion de l'affichage des écrans selon l'état
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      
      case 'home':
        return (
          <HomeScreen
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToDetail={handleNavigateToDetail}
            onNavigateToCreate={handleNavigateToCreate}
            onNavigateToMessages={handleNavigateToMessages}
            onNavigateToMyAnimals={handleNavigateToMyAnimals}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen
            onNavigateBack={handleNavigateToHome}
          />
        );
      
      case 'detail':
        return (
          <PetDetailScreen
            selectedPet={selectedPet}
            onNavigateBack={handleNavigateToHome}
            onNavigateToSighting={handleNavigateToSighting}
            onNavigateToChat={handleNavigateToChat}
          />
        );
      
      case 'create':
        return (
          <CreateScreen
            onNavigateBack={handleNavigateToHome}
            selectedPet={selectedPet}
            editMode={selectedPet ? true : false}
          />
        );
      
      case 'sighting':
        return (
          <SightingScreen
            selectedPet={selectedPet}
            onNavigateBack={() => setCurrentScreen('detail')}
          />
        );
      
      case 'messages':
        return (
          <MessagesScreen
            onNavigateBack={handleNavigateToHome}
            onNavigateToChat={handleNavigateToChat}
          />
        );
      
      case 'chat':
        return (
          <ChatScreen
            selectedAnnouncement={selectedAnnouncement}
            onNavigateBack={() => setCurrentScreen('messages')}
            onNavigateToSighting={(announcement) => {
              setSelectedPet(announcement);
              setCurrentScreen('sighting');
            }}
          />
        );
      
      case 'myanimals':
        return (
          <MyAnimalsScreen
            onNavigateBack={handleNavigateToHome}
            onNavigateToCreate={handleNavigateToCreate}
            onNavigateToEdit={(announcement, mode) => {
              setSelectedPet(announcement);
              setCurrentScreen('create'); // Réutilise l'écran de création mais en mode édition
            }}
            onNavigateToMessages={(announcement) => {
              setSelectedAnnouncement(announcement);
              setCurrentScreen('chat');
            }}
          />
        );
      
      default:
        return <AuthScreen onLogin={handleLogin} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  // Styles supprimés car ils ne sont plus utilisés
  // Chaque écran gère maintenant ses propres styles
});