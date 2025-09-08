import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Search, MapPin, Heart, Plus, User, Bell, Filter, Clock, Users } from 'lucide-react-native';

const HomeScreen = ({ navigation, onNavigateToProfile, onNavigateToDetail, onNavigateToCreate, onNavigateToMessages, onNavigateToMyAnimals }) => {
  // État pour gérer les données des animaux perdus
  const [petData] = useState([
    {
      id: 1,
      name: "Milo",
      type: "Chat",
      race: "Européen",
      color: "Roux et blanc",
      location: "Lyon 3ème",
      distance: "0.5 km",
      lostDate: "Hier",
      reward: "50€",
      image: "🐱",
      description: "Chat très affectueux, répond à son nom. Porte un collier rouge.",
      participants: 12,
      sightings: 3,
      owner: "Marie L.",
      phone: "06.12.34.56.78"
    },
    {
      id: 2,
      name: "Bella",
      type: "Chien",
      race: "Golden Retriever",
      color: "Doré",
      location: "Villeurbanne",
      distance: "1.2 km",
      lostDate: "Il y a 3 jours",
      reward: "100€",
      image: "🐕",
      description: "Chienne très gentille, un peu craintive. Puce électronique.",
      participants: 25,
      sightings: 7,
      owner: "Jean-Pierre M.",
      phone: "06.98.76.54.32"
    },
    {
      id: 3,
      name: "Rocky",
      type: "Chat",
      race: "Maine Coon",
      color: "Noir et blanc",
      location: "Lyon 6ème",
      distance: "2.1 km",
      lostDate: "Il y a 1 semaine",
      reward: "75€",
      image: "🐱",
      description: "Grand chat au poil long, très reconnaissable. Tatouage dans l'oreille.",
      participants: 18,
      sightings: 5,
      owner: "Sophie R.",
      phone: "07.11.22.33.44"
    }
  ]);

  // État pour gérer le modal "Bientôt disponible"
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Fonction pour gérer le clic sur une carte d'animal
  const handlePetCardPress = (pet) => {
    if (onNavigateToDetail) {
      onNavigateToDetail(pet);
    }
  };

  // Fonction pour gérer le clic sur le bouton Carte
  const handleMapPress = () => {
    setShowComingSoonModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>🐾 PetFinder</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Bell width={24} height={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavigateToProfile}>
              <User width={24} height={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Search style={styles.searchIcon} width={20} height={20} color="#9CA3AF" />
          <TextInput 
            placeholder="Rechercher un animal (nom, race...)"
            style={styles.searchInput}
            placeholderTextColor="#9CA3AF"
          />
          <Filter style={styles.filterIcon} width={20} height={20} color="#9CA3AF" />
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.quickStats}>
        <Text style={styles.quickStatsLeft}>📍 Lyon - 15 animaux recherchés</Text>
        <Text style={styles.quickStatsRight}>✅ 8 retrouvés cette semaine</Text>
      </View>

      {/* Liste des animaux perdus */}
      <ScrollView style={styles.petList} showsVerticalScrollIndicator={false}>
        {petData.map(pet => (
          <TouchableOpacity 
            key={pet.id} 
            style={styles.petCard}
            onPress={() => handlePetCardPress(pet)}
          >
            <View style={styles.petCardContent}>
              {/* Image de l'animal (emoji) */}
              <View style={styles.petImageContainer}>
                <Text style={styles.petImage}>{pet.image}</Text>
              </View>
              
              {/* Informations de l'animal */}
              <View style={styles.petInfo}>
                <View style={styles.petHeader}>
                  <View style={styles.petTitleContainer}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petDetails}>
                      {pet.type} • {pet.race} • {pet.color}
                    </Text>
                  </View>
                </View>
                
                {/* Localisation et date */}
                <View style={styles.locationInfo}>
                  <View style={styles.locationItem}>
                    <MapPin width={16} height={16} color="#6B7280" />
                    <Text style={styles.locationText}>
                      {pet.location} • {pet.distance}
                    </Text>
                  </View>
                  <View style={styles.locationItem}>
                    <Clock width={16} height={16} color="#6B7280" />
                    <Text style={styles.locationText}>{pet.lostDate}</Text>
                  </View>
                </View>

                {/* Statistiques de l'annonce */}
                <View style={styles.petStats}>
                  <View style={styles.statItem}>
                    <Users width={16} height={16} color="#2563EB" />
                    <Text style={styles.statText}>
                      {pet.participants} participants
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <MapPin width={16} height={16} color="#EA580C" />
                    <Text style={styles.statTextOrange}>
                      {pet.sightings} signalements
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Espace pour la navigation en bas */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation en bas de l'écran */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          {/* Bouton Rechercher (actif) */}
          <View style={styles.navItem}>
            <Search width={24} height={24} color="#3B82F6" />
            <Text style={styles.navTextActive}>Rechercher</Text>
          </View>
          
          {/* Bouton Carte */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleMapPress}
          >
            <MapPin width={24} height={24} color="#9CA3AF" />
            <Text style={styles.navTextInactive}>Carte</Text>
          </TouchableOpacity>
          
          {/* Bouton central Ajouter */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={onNavigateToCreate}
          >
            <Plus width={24} height={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Bouton Messages */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={onNavigateToMessages}
          >
            <Text style={styles.messageIcon}>💬</Text>
            <Text style={styles.navTextInactive}>Messages</Text>
          </TouchableOpacity>
          
          {/* Bouton Mes animaux */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={onNavigateToMyAnimals}
          >
            <Heart width={24} height={24} color="#9CA3AF" />
            <Text style={styles.navTextInactive}>Mes animaux</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal "Bientôt disponible" */}
      {showComingSoonModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowComingSoonModal(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalIcon}>🗺️</Text>
            <Text style={styles.modalTitle}>Carte interactive</Text>
            <Text style={styles.modalSubtitle}>Bientôt disponible</Text>
            
            <Text style={styles.modalDescription}>
              La fonctionnalité carte arrivera dans une prochaine mise à jour. 
              Elle vous permettra de visualiser les animaux perdus directement sur une carte interactive.
            </Text>
            
            <View style={styles.modalFeaturesList}>
              <Text style={styles.modalFeatureItem}>📍 Localisation des animaux perdus</Text>
              <Text style={styles.modalFeatureItem}>🔍 Recherche par zone géographique</Text>
              <Text style={styles.modalFeatureItem}>📱 Géolocalisation en temps réel</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowComingSoonModal(false)}
            >
              <Text style={styles.modalButtonText}>J'ai hâte !</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // Styles pour l'en-tête
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40, // Pour éviter la barre de statut
    zIndex: 10,
  },
  
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  
  // Styles pour la barre de recherche
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  
  searchInput: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    fontSize: 14,
  },
  
  filterIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  
  // Styles pour les statistiques rapides
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  
  quickStatsLeft: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '500',
  },
  
  quickStatsRight: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  
  // Styles pour la liste des animaux
  petList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
  },
  
  petCardContent: {
    flexDirection: 'row',
    gap: 16,
  },
  
  petImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  petImage: {
    fontSize: 48,
  },
  
  petInfo: {
    flex: 1,
  },
  
  petHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  petTitleContainer: {
    flex: 1,
  },
  
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  
  petDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // Styles pour les informations de localisation
  locationInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // Styles pour les statistiques
  petStats: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },
  
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  statText: {
    fontSize: 14,
    color: '#2563EB',
  },
  
  statTextOrange: {
    fontSize: 14,
    color: '#EA580C',
  },
  
  // Espace en bas pour la navigation
  bottomSpacer: {
    height: 80,
  },
  
  // Styles pour la navigation en bas
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  navTextActive: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginTop: 2,
  },
  
  navTextInactive: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 50,
  },
  
  messageIcon: {
    fontSize: 20,
  },

  // Modal "Bientôt disponible"
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },

  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseText: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },

  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  modalSubtitle: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 16,
  },

  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },

  modalFeaturesList: {
    alignSelf: 'stretch',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },

  modalFeatureItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },

  modalButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;