import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, MessageCircle, Clock, Users } from 'lucide-react-native';

const MessagesScreen = ({ onNavigateBack, onNavigateToChat }) => {
  // Liste des annonces auxquelles l'utilisateur participe
  const [participatingAnnouncements] = useState([
    {
      id: 1,
      petName: "Milo",
      petType: "Chat",
      petImage: "🐱",
      owner: "Marie L.",
      location: "Lyon 3ème",
      lastMessage: {
        text: "Merci pour votre aide ! Un témoin l'a vu près du parc hier soir.",
        time: "Il y a 2h",
        sender: "owner",
        unread: true
      },
      participants: 12,
      status: "active", // active, found, cancelled
      joinedDate: "Il y a 3 jours"
    },
    {
      id: 2,
      petName: "Bella",
      petType: "Chien",
      petImage: "🐕",
      owner: "Jean-Pierre M.",
      location: "Villeurbanne",
      lastMessage: {
        text: "Vous: Je vais chercher près de la rivière cet après-midi",
        time: "Il y a 5h",
        sender: "user",
        unread: false
      },
      participants: 25,
      status: "active",
      joinedDate: "Il y a 1 semaine"
    },
    {
      id: 3,
      petName: "Rocky",
      petType: "Chat",
      petImage: "🐱",
      owner: "Sophie R.",
      location: "Lyon 6ème",
      lastMessage: {
        text: "BONNE NOUVELLE ! Rocky a été retrouvé ! Merci à tous ❤️",
        time: "Hier",
        sender: "owner",
        unread: false
      },
      participants: 18,
      status: "found",
      joinedDate: "Il y a 2 semaines"
    },
    {
      id: 4,
      petName: "Luna",
      petType: "Chat",
      petImage: "🐱",
      owner: "Thomas B.",
      location: "Lyon 2ème",
      lastMessage: {
        text: "Des nouvelles du quartier République ?",
        time: "Il y a 1 jour",
        sender: "owner",
        unread: false
      },
      participants: 8,
      status: "active",
      joinedDate: "Il y a 5 jours"
    }
  ]);

  // Fonction pour naviguer vers le chat d'une annonce
  const handleOpenChat = (announcement) => {
    console.log(`Ouverture du chat pour: ${announcement.petName}`);
    if (onNavigateToChat) {
      onNavigateToChat(announcement);
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'found':
        return '#059669';
      case 'cancelled':
        return '#DC2626';
      default:
        return '#3B82F6';
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status) => {
    switch (status) {
      case 'found':
        return '✅ Retrouvé';
      case 'cancelled':
        return '❌ Annulée';
      default:
        return '🔍 En cours';
    }
  };

  // Compter les messages non lus
  const unreadCount = participatingAnnouncements.filter(ann => ann.lastMessage.unread).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Messages</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{participatingAnnouncements.length}</Text>
          <Text style={styles.statsLabel}>Recherches actives</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{unreadCount}</Text>
          <Text style={styles.statsLabel}>Messages non lus</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumberGreen}>
            {participatingAnnouncements.filter(a => a.status === 'found').length}
          </Text>
          <Text style={styles.statsLabel}>Animaux retrouvés</Text>
        </View>
      </View>

      <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
        {/* En-tête de section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mes participations ({participatingAnnouncements.length})</Text>
          <Text style={styles.sectionSubtitle}>
            Annonces auxquelles vous participez
          </Text>
        </View>

        {/* Liste des conversations */}
        {participatingAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            style={[
              styles.conversationCard,
              announcement.lastMessage.unread && styles.conversationCardUnread
            ]}
            onPress={() => handleOpenChat(announcement)}
          >
            {/* Indicateur non lu */}
            {announcement.lastMessage.unread && (
              <View style={styles.unreadIndicator} />
            )}

            <View style={styles.conversationContent}>
              {/* Image et infos de l'animal */}
              <View style={styles.petInfoSection}>
                <Text style={styles.petImage}>{announcement.petImage}</Text>
                <View style={styles.petDetails}>
                  <View style={styles.petHeader}>
                    <Text style={styles.petName}>{announcement.petName}</Text>
                    <View 
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(announcement.status)}15` }
                      ]}
                    >
                      <Text 
                        style={[
                          styles.statusText,
                          { color: getStatusColor(announcement.status) }
                        ]}
                      >
                        {getStatusText(announcement.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.petMetadata}>
                    <Text style={styles.ownerName}>{announcement.owner}</Text>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.location}>{announcement.location}</Text>
                  </View>
                  
                  <View style={styles.participationInfo}>
                    <Users width={14} height={14} color="#6B7280" />
                    <Text style={styles.participationText}>
                      {announcement.participants} participants
                    </Text>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.joinedDate}>
                      Rejoint {announcement.joinedDate}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Dernier message */}
              <View style={styles.messagePreview}>
                <View style={styles.messageContent}>
                  <Text 
                    style={[
                      styles.messageText,
                      announcement.lastMessage.unread && styles.messageTextUnread
                    ]}
                    numberOfLines={2}
                  >
                    {announcement.lastMessage.text}
                  </Text>
                  
                  <View style={styles.messageMetadata}>
                    <Clock width={12} height={12} color="#9CA3AF" />
                    <Text style={styles.messageTime}>
                      {announcement.lastMessage.time}
                    </Text>
                  </View>
                </View>
                
                {/* Icône de message */}
                <View style={styles.messageIcon}>
                  <MessageCircle width={20} height={20} color="#6B7280" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Message d'information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Comment ça marche ?</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>
              • Les messages restent accessibles tant que l'annonce est active
            </Text>
            <Text style={styles.infoItem}>
              • Vous recevez les notifications des nouveaux messages
            </Text>
            <Text style={styles.infoItem}>
              • Partagez vos observations et coordonnez les recherches
            </Text>
            <Text style={styles.infoItem}>
              • Célébrez ensemble quand l'animal est retrouvé !
            </Text>
          </View>
        </View>

        {/* Espace en bas */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    zIndex: 10,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    padding: 4,
  },

  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  headerSpacer: {
    width: 32,
  },

  // Section statistiques
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  statsNumberGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },

  statsLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Liste des conversations
  conversationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Carte de conversation
  conversationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },

  conversationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    backgroundColor: '#FEFEFE',
  },

  unreadIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },

  conversationContent: {
    gap: 12,
  },

  // Section info animal
  petInfoSection: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  petImage: {
    fontSize: 40,
  },

  petDetails: {
    flex: 1,
    gap: 4,
  },

  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  petMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  ownerName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  separator: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  location: {
    fontSize: 14,
    color: '#6B7280',
  },

  participationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  participationText: {
    fontSize: 13,
    color: '#6B7280',
  },

  joinedDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  // Aperçu du message
  messagePreview: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  messageContent: {
    flex: 1,
    gap: 6,
  },

  messageText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  messageTextUnread: {
    color: '#374151',
    fontWeight: '500',
  },

  messageMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  messageIcon: {
    padding: 4,
  },

  // Section d'information
  infoSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginBottom: 12,
  },

  infoList: {
    gap: 6,
  },

  infoItem: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },
});

export default MessagesScreen;