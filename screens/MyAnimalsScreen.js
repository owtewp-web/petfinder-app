import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Plus, Users, MessageCircle, Edit, Eye, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react-native';

const MyAnimalsScreen = ({ onNavigateBack, onNavigateToCreate, onNavigateToEdit, onNavigateToMessages }) => {
  const [activeTab, setActiveTab] = useState('active'); // active, found, archived
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Mes annonces créées
  const [myAnnouncements] = useState([
    {
      id: 1,
      petName: "Félix",
      petType: "Chat",
      petImage: "🐱",
      race: "Persan",
      color: "Blanc et gris",
      location: "Lyon 7ème",
      lostDate: "Il y a 5 jours",
      createdDate: "Il y a 5 jours",
      status: "active",
      participants: 15,
      sightings: 4,
      messages: 23,
      reward: "75€",
      views: 247,
      lastActivity: "Il y a 2h",
      priority: "normal", // normal, urgent, promoted
    },
    {
      id: 2,
      petName: "Max",
      petType: "Chien",
      petImage: "🐕",
      race: "Labrador",
      color: "Doré",
      location: "Villeurbanne",
      lostDate: "Il y a 2 semaines",
      createdDate: "Il y a 2 semaines",
      status: "active",
      participants: 28,
      sightings: 12,
      messages: 45,
      reward: "150€",
      views: 532,
      lastActivity: "Il y a 30 min",
      priority: "urgent",
    },
    {
      id: 3,
      petName: "Luna",
      petType: "Chat",
      petImage: "🐱",
      race: "Maine Coon",
      color: "Noir et blanc",
      location: "Lyon 3ème",
      lostDate: "Il y a 1 mois",
      createdDate: "Il y a 1 mois",
      status: "found",
      participants: 22,
      sightings: 8,
      messages: 67,
      reward: "100€",
      views: 398,
      lastActivity: "Retrouvée",
      foundDate: "Il y a 3 jours",
    },
    {
      id: 4,
      petName: "Mia",
      petType: "Chat",
      petImage: "🐱",
      race: "Européen",
      color: "Roux",
      location: "Lyon 2ème",
      lostDate: "Il y a 3 mois",
      createdDate: "Il y a 3 mois",
      status: "archived",
      participants: 8,
      sightings: 2,
      messages: 15,
      reward: "50€",
      views: 156,
      lastActivity: "Archivée",
    },
  ]);

  // Filtrer les annonces selon l'onglet actif
  const getFilteredAnnouncements = () => {
    return myAnnouncements.filter(announcement => announcement.status === activeTab);
  };

  // Compter par statut
  const getCountByStatus = (status) => {
    return myAnnouncements.filter(a => a.status === status).length;
  };

  // Fonctions d'actions
  const handleEditAnnouncement = (announcement) => {
    console.log('Modifier annonce:', announcement.petName);
    if (onNavigateToEdit) {
      // Passer les données de l'annonce pour pré-remplir le formulaire
      onNavigateToEdit(announcement, 'edit');
    }
  };

  const handleViewMessages = (announcement) => {
    console.log('Voir messages pour:', announcement.petName);
    if (onNavigateToMessages) {
      onNavigateToMessages(announcement);
    }
  };

  const handleCloseAnnouncement = (announcement) => {
    console.log('Clôturer annonce:', announcement.petName);
    setSelectedAnnouncement(announcement);
    setShowCloseModal(true);
  };

  const handleFoundAnimal = () => {
    console.log('Animal retrouvé:', selectedAnnouncement.petName);
    // Logique pour marquer l'animal comme retrouvé
    setShowCloseModal(false);
    setSelectedAnnouncement(null);
  };

  const handleAbandonSearch = () => {
    console.log('Recherche abandonnée:', selectedAnnouncement.petName);
    // Logique pour marquer la recherche comme abandonnée
    setShowCloseModal(false);
    setSelectedAnnouncement(null);
  };

  const handlePromoteAnnouncement = (announcement) => {
    console.log('Promouvoir annonce:', announcement.petName);
    // Logique pour promouvoir l'annonce (payant)
  };

  const handleArchiveAnnouncement = (announcement) => {
    console.log('Archiver annonce:', announcement.petName);
    // Logique pour archiver l'annonce
  };

  const handleDeleteAnnouncement = (announcement) => {
    console.log('Supprimer annonce:', announcement.petName);
    // Logique pour supprimer l'annonce (avec confirmation)
  };

  // Obtenir la couleur du statut de priorité
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return '#EF4444';
      case 'promoted':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes animaux</Text>
          <TouchableOpacity onPress={onNavigateToCreate} style={styles.addButton}>
            <Plus width={24} height={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{myAnnouncements.length}</Text>
          <Text style={styles.statsLabel}>Total annonces</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumberBlue}>{getCountByStatus('active')}</Text>
          <Text style={styles.statsLabel}>En recherche</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumberGreen}>{getCountByStatus('found')}</Text>
          <Text style={styles.statsLabel}>Retrouvés</Text>
        </View>
      </View>

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Actives ({getCountByStatus('active')})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'found' && styles.tabActive]}
          onPress={() => setActiveTab('found')}
        >
          <Text style={[styles.tabText, activeTab === 'found' && styles.tabTextActive]}>
            Retrouvées ({getCountByStatus('found')})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'archived' && styles.tabActive]}
          onPress={() => setActiveTab('archived')}
        >
          <Text style={[styles.tabText, activeTab === 'archived' && styles.tabTextActive]}>
            Archivées ({getCountByStatus('archived')})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.announcementsList} showsVerticalScrollIndicator={false}>
        {getFilteredAnnouncements().map((announcement) => (
          <View key={announcement.id} style={styles.announcementCard}>
            {/* Indicateur de priorité */}
            {announcement.priority === 'urgent' && (
              <View style={styles.urgentBadge}>
                <AlertTriangle width={12} height={12} color="#FFFFFF" />
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}

            <View style={styles.announcementContent}>
              {/* En-tête avec animal */}
              <View style={styles.announcementHeader}>
                <View style={styles.petInfo}>
                  <Text style={styles.petEmoji}>{announcement.petImage}</Text>
                  <View style={styles.petDetails}>
                    <Text style={styles.petName}>{announcement.petName}</Text>
                    <Text style={styles.petMetadata}>
                      {announcement.petType} • {announcement.race} • {announcement.color}
                    </Text>
                    <Text style={styles.locationInfo}>
                      {announcement.location} • {announcement.lostDate}
                    </Text>
                  </View>
                </View>
                
                {/* Statut */}
                <View style={[
                  styles.statusBadge,
                  announcement.status === 'active' && styles.statusActive,
                  announcement.status === 'found' && styles.statusFound,
                  announcement.status === 'archived' && styles.statusArchived,
                ]}>
                  <Text style={[
                    styles.statusText,
                    announcement.status === 'active' && styles.statusTextActive,
                    announcement.status === 'found' && styles.statusTextFound,
                    announcement.status === 'archived' && styles.statusTextArchived,
                  ]}>
                    {announcement.status === 'active' && '🔍 Active'}
                    {announcement.status === 'found' && '✅ Retrouvé'}
                    {announcement.status === 'archived' && '📁 Archivée'}
                  </Text>
                </View>
              </View>

              {/* Statistiques de l'annonce */}
              <View style={styles.announcementStats}>
                <View style={styles.statItem}>
                  <Users width={14} height={14} color="#3B82F6" />
                  <Text style={styles.statText}>{announcement.participants} participants</Text>
                </View>
                
                <View style={styles.statItem}>
                  <MessageCircle width={14} height={14} color="#059669" />
                  <Text style={styles.statText}>{announcement.messages} messages</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Eye width={14} height={14} color="#6B7280" />
                  <Text style={styles.statText}>{announcement.views} vues</Text>
                </View>
              </View>

              {/* Informations supplémentaires */}
              <View style={styles.additionalInfo}>
                <Text style={styles.rewardInfo}>Récompense: {announcement.reward}</Text>
                <Text style={styles.lastActivity}>
                  Dernière activité: {announcement.lastActivity}
                </Text>
                {announcement.status === 'found' && (
                  <Text style={styles.foundInfo}>
                    Retrouvé {announcement.foundDate} 🎉
                  </Text>
                )}
              </View>

              {/* Actions */}
              <View style={styles.actionsContainer}>
                {announcement.status === 'active' && (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButtonPrimary}
                      onPress={() => handleViewMessages(announcement)}
                    >
                      <MessageCircle width={16} height={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonTextPrimary}>Messages</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButtonSecondary}
                      onPress={() => handleEditAnnouncement(announcement)}
                    >
                      <Edit width={16} height={16} color="#3B82F6" />
                      <Text style={styles.actionButtonTextSecondary}>Modifier</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButtonSuccess}
                      onPress={() => handleCloseAnnouncement(announcement)}
                    >
                      <CheckCircle width={16} height={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonTextSuccess}>Clôturer</Text>
                    </TouchableOpacity>
                  </>
                )}

                {announcement.status === 'found' && (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButtonSecondary}
                      onPress={() => handleViewMessages(announcement)}
                    >
                      <MessageCircle width={16} height={16} color="#059669" />
                      <Text style={styles.actionButtonTextSecondary}>Voir messages</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButtonGray}
                      onPress={() => handleArchiveAnnouncement(announcement)}
                    >
                      <Text style={styles.actionButtonTextGray}>Archiver</Text>
                    </TouchableOpacity>
                  </>
                )}

                {announcement.status === 'archived' && (
                  <TouchableOpacity 
                    style={styles.actionButtonDanger}
                    onPress={() => handleDeleteAnnouncement(announcement)}
                  >
                    <Trash2 width={16} height={16} color="#DC2626" />
                    <Text style={styles.actionButtonTextDanger}>Supprimer</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Actions premium */}
              {announcement.status === 'active' && announcement.priority !== 'urgent' && (
                <TouchableOpacity 
                  style={styles.promoteButton}
                  onPress={() => handlePromoteAnnouncement(announcement)}
                >
                  <Text style={styles.promoteButtonText}>
                    🔥 Promouvoir cette annonce (5€) - Plus de visibilité
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Message si aucune annonce */}
        {getFilteredAnnouncements().length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>
              {activeTab === 'active' && '🔍'}
              {activeTab === 'found' && '🎉'}
              {activeTab === 'archived' && '📁'}
            </Text>
            <Text style={styles.emptyStateTitle}>
              {activeTab === 'active' && 'Aucune recherche active'}
              {activeTab === 'found' && 'Aucun animal retrouvé'}
              {activeTab === 'archived' && 'Aucune annonce archivée'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {activeTab === 'active' && 'Créez votre première annonce si votre animal est perdu'}
              {activeTab === 'found' && 'Les animaux que vous retrouverez apparaîtront ici'}
              {activeTab === 'archived' && 'Les annonces archivées s\'afficheront ici'}
            </Text>
            {activeTab === 'active' && (
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={onNavigateToCreate}
              >
                <Plus width={20} height={20} color="#FFFFFF" />
                <Text style={styles.emptyStateButtonText}>Créer une annonce</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Conseils */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Conseils pour vos annonces</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Répondez rapidement aux messages des bénévoles</Text>
            <Text style={styles.tipItem}>• Mettez à jour l'annonce si vous avez des nouvelles informations</Text>
            <Text style={styles.tipItem}>• Remerciez les participants, même si l'animal n'est pas encore retrouvé</Text>
            <Text style={styles.tipItem}>• Marquez comme "Retrouvé" dès que possible pour informer la communauté</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal de clôture d'annonce */}
      {showCloseModal && selectedAnnouncement && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => {
                setShowCloseModal(false);
                setSelectedAnnouncement(null);
              }}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalIcon}>🐾</Text>
            <Text style={styles.modalTitle}>Clôturer la recherche</Text>
            <Text style={styles.modalSubtitle}>
              Recherche de {selectedAnnouncement.petName}
            </Text>
            
            <Text style={styles.modalDescription}>
              Souhaitez-vous clôturer cette recherche ? Choisissez la raison de la clôture :
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButtonFound}
                onPress={handleFoundAnimal}
              >
                <Text style={styles.modalButtonFoundText}>
                  🎉 Animal retrouvé !
                </Text>
                <Text style={styles.modalButtonSubtext}>
                  Marquer comme retrouvé avec succès
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonAbandon}
                onPress={handleAbandonSearch}
              >
                <Text style={styles.modalButtonAbandonText}>
                  😔 Arrêter les recherches
                </Text>
                <Text style={styles.modalButtonSubtext}>
                  Suspendre la recherche sans succès
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButtonCancel}
              onPress={() => {
                setShowCloseModal(false);
                setSelectedAnnouncement(null);
              }}
            >
              <Text style={styles.modalButtonCancelText}>Annuler</Text>
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

  // Header
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
    paddingTop: 50,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },

  addButton: {
    padding: 4,
  },

  // Statistiques
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },

  statsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 4,
  },

  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
  },

  statsNumberBlue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  statsNumberGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },

  statsLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Onglets
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  tabActive: {
    backgroundColor: '#3B82F6',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },

  tabTextActive: {
    color: '#FFFFFF',
  },

  // Liste des annonces
  announcementsList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },

  urgentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },

  urgentText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  announcementContent: {
    padding: 16,
    gap: 12,
  },

  // En-tête de l'annonce
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  petInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  petEmoji: {
    fontSize: 48,
  },

  petDetails: {
    flex: 1,
    gap: 4,
  },

  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  petMetadata: {
    fontSize: 14,
    color: '#6B7280',
  },

  locationInfo: {
    fontSize: 14,
    color: '#6B7280',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  statusActive: {
    backgroundColor: '#EFF6FF',
  },

  statusFound: {
    backgroundColor: '#F0FDF4',
  },

  statusArchived: {
    backgroundColor: '#F3F4F6',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  statusTextActive: {
    color: '#2563EB',
  },

  statusTextFound: {
    color: '#059669',
  },

  statusTextArchived: {
    color: '#6B7280',
  },

  // Statistiques de l'annonce
  announcementStats: {
    flexDirection: 'row',
    gap: 16,
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  statText: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Informations supplémentaires
  additionalInfo: {
    gap: 4,
  },

  rewardInfo: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },

  lastActivity: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  foundInfo: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  actionButtonPrimary: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  actionButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  actionButtonSecondary: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  actionButtonTextSecondary: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },

  actionButtonSuccess: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  actionButtonTextSuccess: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  actionButtonGray: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  actionButtonTextGray: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },

  actionButtonDanger: {
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  actionButtonTextDanger: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
  },

  // Bouton de promotion
  promoteButton: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },

  promoteButtonText: {
    color: '#92400E',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

  // État vide
  emptyState: {
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },

  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },

  emptyStateSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  emptyStateButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },

  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Section conseils
  tipsSection: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginBottom: 12,
  },

  tipsList: {
    gap: 6,
  },

  tipItem: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },

  // Modal de clôture
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
    maxWidth: 400,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },

  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  modalActions: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },

  modalButtonFound: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },

  modalButtonFoundText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalButtonAbandon: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },

  modalButtonAbandonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },

  modalButtonCancel: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },

  modalButtonCancelText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MyAnimalsScreen;