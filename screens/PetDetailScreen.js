import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Users, MapPin, Send } from 'lucide-react-native';

const PetDetailScreen = ({ 
  selectedPet, 
  onNavigateBack, 
  onNavigateToSighting, 
  onNavigateToChat 
}) => {
  // État pour gérer la participation de l'utilisateur
  const [isParticipating, setIsParticipating] = useState(false);
  const [participationLoading, setParticipationLoading] = useState(false);
  const [showParticipationModal, setShowParticipationModal] = useState(false);
  
  // Fonction pour gérer la participation à la recherche
  const handleParticipate = () => {
    if (isParticipating) {
      // Si déjà participant, afficher les options
      setShowParticipationModal(true);
    } else {
      // Sinon, rejoindre la recherche
      joinSearch();
    }
  };

  // Fonction pour rejoindre la recherche
  const joinSearch = async () => {
    setParticipationLoading(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Participation confirmée à la recherche de ${selectedPet?.name}`);
      setIsParticipating(true);
      
      // Mettre à jour le nombre de participants (simulation)
      if (selectedPet) {
        selectedPet.participants += 1;
      }
      
    } catch (error) {
      console.error('Erreur lors de la participation:', error);
    } finally {
      setParticipationLoading(false);
    }
  };

  // Fonction pour quitter la recherche
  const leaveSearch = async () => {
    setParticipationLoading(true);
    setShowParticipationModal(false);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Participation annulée pour ${selectedPet?.name}`);
      setIsParticipating(false);
      
      // Mettre à jour le nombre de participants (simulation)
      if (selectedPet && selectedPet.participants > 0) {
        selectedPet.participants -= 1;
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
    } finally {
      setParticipationLoading(false);
    }
  };

  // Fonction pour appeler le propriétaire
  const handleCall = () => {
    console.log(`Appel au propriétaire de ${selectedPet?.name}: ${selectedPet?.phone}`);
    // Logique pour déclencher l'appel téléphonique
  };

  // Si aucun animal sélectionné, retour à l'accueil
  if (!selectedPet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucun animal sélectionné</Text>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedPet.name}</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image et informations principales de l'animal */}
        <View style={styles.petImageSection}>
          <Text style={styles.petImageLarge}>{selectedPet.image}</Text>
          <Text style={styles.petNameLarge}>{selectedPet.name}</Text>
          <Text style={styles.petTypeInfo}>
            {selectedPet.type} • {selectedPet.race}
          </Text>
        </View>

        {/* Boutons d'actions rapides */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[
              styles.participateButtonLarge,
              isParticipating && styles.participateButtonActive,
              participationLoading && styles.participateButtonLoading
            ]}
            onPress={handleParticipate}
            disabled={participationLoading}
          >
            <Users width={20} height={20} color="#FFFFFF" />
            <Text style={styles.participateButtonLargeText}>
              {participationLoading 
                ? "Chargement..." 
                : isParticipating 
                  ? "✓ Je participe déjà" 
                  : "Je participe à la recherche"
              }
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sightingButton}
            onPress={() => onNavigateToSighting && onNavigateToSighting(selectedPet)}
          >
            <MapPin width={20} height={20} color="#FFFFFF" />
            <Text style={styles.sightingButtonText}>
              J'ai vu cet animal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Grille de statistiques */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{selectedPet.participants}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          
          <View style={styles.statCardOrange}>
            <Text style={styles.statNumberOrange}>{selectedPet.sightings}</Text>
            <Text style={styles.statLabelOrange}>Signalements</Text>
          </View>
          
          <View style={styles.statCardGreen}>
            <Text style={styles.statNumberGreen}>Actif</Text>
            <Text style={styles.statLabelGreen}>Statut</Text>
          </View>
        </View>

        {/* Informations détaillées */}
        <View style={styles.detailsSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.infoList}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Couleur:</Text>
                <Text style={styles.infoValue}>{selectedPet.color}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Lieu de disparition:</Text>
                <Text style={styles.infoValue}>{selectedPet.location}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date de disparition:</Text>
                <Text style={styles.infoValue}>{selectedPet.lostDate}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Propriétaire:</Text>
                <Text style={styles.infoValue}>{selectedPet.owner}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {selectedPet.description}
              </Text>
            </View>
          </View>

          {/* Zone de recherche (placeholder carte) */}
          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>Zone de recherche</Text>
            <View style={styles.mapPlaceholder}>
              <MapPin width={32} height={32} color="#6B7280" />
              <Text style={styles.mapPlaceholderText}>Carte interactive</Text>
            </View>
          </View>
        </View>

        {/* Section contact propriétaire */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact propriétaire</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={handleCall}
            >
              <Text style={styles.callButtonText}>📞 Appeler</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => onNavigateToChat && onNavigateToChat(selectedPet)}
            >
              <Text style={styles.messageButtonText}>💬 Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Espace en bas pour éviter que le contenu soit caché */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal de gestion de participation */}
      {showParticipationModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Participation à la recherche</Text>
            <Text style={styles.modalSubtitle}>
              Vous participez actuellement à la recherche de {selectedPet?.name}
            </Text>
            
            <View style={styles.modalStats}>
              <Text style={styles.modalStatsText}>
                🔍 Vous êtes l'un des {selectedPet?.participants} participants
              </Text>
              <Text style={styles.modalStatsText}>
                📍 {selectedPet?.sightings} signalements reçus
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButtonSecondary}
                onPress={() => setShowParticipationModal(false)}
              >
                <Text style={styles.modalButtonSecondaryText}>Continuer à chercher</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={() => onNavigateToSighting && onNavigateToSighting(selectedPet)}
              >
                <Text style={styles.modalButtonPrimaryText}>📍 Signaler une observation</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonDanger}
                onPress={leaveSearch}
                disabled={participationLoading}
              >
                <Text style={styles.modalButtonDangerText}>
                  {participationLoading ? "Annulation..." : "❌ Quitter la recherche"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowParticipationModal(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Notification de participation */}
      {isParticipating && !showParticipationModal && (
        <View style={styles.participationNotification}>
          <Text style={styles.participationNotificationText}>
            ✓ Vous participez à cette recherche • Restez vigilant dans votre zone
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Container d'erreur
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
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
    paddingTop: 50, // Pour éviter la barre de statut
    zIndex: 10,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButtonIcon: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },

  headerSpacer: {
    width: 32, // Pour équilibrer le bouton de retour
  },

  // Container de scroll
  scrollContainer: {
    flex: 1,
  },

  // Section image de l'animal
  petImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#F9FAFB',
  },

  petImageLarge: {
    fontSize: 80,
    marginBottom: 16,
  },

  petNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },

  petTypeInfo: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Actions rapides
  quickActions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },

  participateButtonLarge: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  participateButtonLargeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  participateButtonActive: {
    backgroundColor: '#059669',
  },

  participateButtonLoading: {
    backgroundColor: '#9CA3AF',
  },

  sightingButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  sightingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Grille de statistiques
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  statCardOrange: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  statCardGreen: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },

  statNumberOrange: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 4,
  },

  statNumberGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#2563EB',
  },

  statLabelOrange: {
    fontSize: 12,
    color: '#EA580C',
  },

  statLabelGreen: {
    fontSize: 12,
    color: '#059669',
  },

  // Section des détails
  detailsSection: {
    padding: 16,
    gap: 24,
  },

  infoBlock: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  infoList: {
    gap: 8,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },

  // Description
  descriptionContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },

  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Placeholder pour la carte
  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  mapPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Section contact
  contactSection: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },

  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  callButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  messageButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  messageButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },

  // Modal de participation
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
    borderRadius: 12,
    padding: 24,
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

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },

  modalStats: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },

  modalStatsText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },

  modalActions: {
    gap: 12,
  },

  modalButtonPrimary: {
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  modalButtonSecondary: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  modalButtonDanger: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonDangerText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
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

  // Notification de participation
  participationNotification: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#059669',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  participationNotificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PetDetailScreen;