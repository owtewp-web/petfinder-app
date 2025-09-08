import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { ArrowLeft, Send, MapPin, Camera, Phone, Info } from 'lucide-react-native';

const ChatScreen = ({ selectedAnnouncement, onNavigateBack, onNavigateToSighting }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour tout le monde ! Merci de m'aider à retrouver Milo. Il a disparu hier soir près du parc de la Tête d'Or.",
      sender: 'owner',
      senderName: 'Marie L.',
      time: 'Il y a 3 jours',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      text: "Je me joins à la recherche ! Je connais bien le quartier, je vais faire le tour des rues adjacentes.",
      sender: 'participant',
      senderName: 'Thomas B.',
      time: 'Il y a 3 jours',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
    },
    {
      id: 3,
      text: "Moi aussi je participe ! J'habite dans le coin. À quelle heure a-t-il disparu exactement ?",
      sender: 'participant',
      senderName: 'Sophie R.',
      time: 'Il y a 3 jours',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
    },
    {
      id: 4,
      text: "Vers 20h hier soir. Il portait son collier rouge avec une clochette. Il est très sociable d'habitude.",
      sender: 'owner',
      senderName: 'Marie L.',
      time: 'Il y a 3 jours',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
    },
    {
      id: 5,
      text: "J'ai posé des affiches rue de la République et avenue Foch. Je continue les recherches demain matin.",
      sender: 'participant',
      senderName: 'Jean M.',
      time: 'Il y a 2 jours',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      text: "Excellente idée pour les affiches ! J'ai partagé l'annonce sur les réseaux sociaux du quartier.",
      sender: 'user',
      senderName: 'Vous',
      time: 'Il y a 2 jours',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
    },
    {
      id: 7,
      text: "SIGNALEMENT : Je pense avoir vu un chat qui correspond à la description près du pont Wilson ce matin vers 8h !",
      sender: 'participant',
      senderName: 'Lucas P.',
      time: 'Il y a 1 jour',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isSignaling: true,
    },
    {
      id: 8,
      text: "Merci Lucas ! Je vais aller voir là-bas. Quelqu'un peut m'accompagner ?",
      sender: 'owner',
      senderName: 'Marie L.',
      time: 'Il y a 1 jour',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
    },
    {
      id: 9,
      text: "Merci à tous pour votre aide ! Un témoin l'a vu près du parc hier soir. On se rapproche !",
      sender: 'owner',
      senderName: 'Marie L.',
      time: 'Il y a 2h',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]);

  const scrollViewRef = useRef(null);

  // Faire défiler vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });

  }, [messages]);

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      senderName: 'Vous',
      time: 'À l\'instant',
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    console.log('Message envoyé:', newMessage);
  };

  // Fonction pour appeler le propriétaire
  const handleCallOwner = () => {
    console.log(`Appel du propriétaire: ${selectedAnnouncement?.owner}`);
  };

  // Fonction pour signaler une observation
  const handleReportSighting = () => {
    if (onNavigateToSighting) {
      onNavigateToSighting(selectedAnnouncement);
    }
  };

  // Fonction pour obtenir la couleur selon le type d'expéditeur
  const getSenderColor = (sender) => {
    switch (sender) {
      case 'owner':
        return '#3B82F6';
      case 'user':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  if (!selectedAnnouncement) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucune conversation sélectionnée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header avec infos de l'annonce */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          
          <View style={styles.announcementInfo}>
            <Text style={styles.petEmoji}>{selectedAnnouncement.petImage}</Text>
            <View style={styles.announcementDetails}>
              <Text style={styles.announcementTitle}>
                Recherche de {selectedAnnouncement.petName}
              </Text>
              <Text style={styles.announcementSubtitle}>
                {selectedAnnouncement.participants} participants • {selectedAnnouncement.owner}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleCallOwner} style={styles.phoneButton}>
            <Phone width={20} height={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Boutons d'actions rapides */}
        <View style={styles.quickActionsHeader}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={handleReportSighting}
          >
            <MapPin width={16} height={16} color="#EA580C" />
            <Text style={styles.quickActionText}>Signaler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Camera width={16} height={16} color="#7C3AED" />
            <Text style={styles.quickActionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Info width={16} height={16} color="#6B7280" />
            <Text style={styles.quickActionText}>Détails</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message, index) => {
          const isUser = message.sender === 'user';
          const isOwner = message.sender === 'owner';
          const showSenderName = index === 0 || messages[index - 1].sender !== message.sender;

          return (
            <View key={message.id} style={styles.messageGroup}>
              {showSenderName && !isUser && (
                <View style={styles.senderInfo}>
                  <View 
                    style={[
                      styles.senderDot,
                      { backgroundColor: getSenderColor(message.sender) }
                    ]} 
                  />
                  <Text 
                    style={[
                      styles.senderName,
                      isOwner && styles.senderNameOwner
                    ]}
                  >
                    {message.senderName}
                    {isOwner && ' (Propriétaire)'}
                  </Text>
                </View>
              )}
              
              <View 
                style={[
                  styles.messageContainer,
                  isUser ? styles.userMessage : styles.otherMessage,
                  message.isSignaling && styles.signalingMessage
                ]}
              >
                {message.isSignaling && (
                  <View style={styles.signalingHeader}>
                    <MapPin width={14} height={14} color="#EA580C" />
                    <Text style={styles.signalingLabel}>SIGNALEMENT</Text>
                  </View>
                )}
                
                <Text 
                  style={[
                    styles.messageText,
                    isUser ? styles.userMessageText : styles.otherMessageText,
                    message.isSignaling && styles.signalingMessageText
                  ]}
                >
                  {message.text}
                </Text>
                
                <Text 
                  style={[
                    styles.messageTime,
                    isUser ? styles.userMessageTime : styles.otherMessageTime
                  ]}
                >
                  {message.time}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Indicateur de frappe (simulation) */}
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>Marie L. est en train d'écrire...</Text>
        </View>
      </ScrollView>

      {/* Zone de saisie */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.messageInput}
            placeholder="Tapez votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            placeholderTextColor="#9CA3AF"
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send 
              width={20} 
              height={20} 
              color={newMessage.trim() ? '#FFFFFF' : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Compteur de caractères */}
        <Text style={styles.characterCount}>
          {newMessage.length}/500
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },

  errorText: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingTop: 50,
    paddingBottom: 12,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },

  backButton: {
    padding: 4,
  },

  announcementInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  petEmoji: {
    fontSize: 32,
  },

  announcementDetails: {
    flex: 1,
  },

  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  announcementSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  phoneButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },

  quickActionsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },

  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },

  quickActionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },

  // Messages
  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    padding: 16,
    gap: 8,
  },

  messageGroup: {
    marginBottom: 8,
  },

  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    marginLeft: 4,
  },

  senderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  senderName: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },

  senderNameOwner: {
    color: '#3B82F6',
  },

  // Containers de messages
  messageContainer: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },

  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#059669',
    borderBottomRightRadius: 4,
  },

  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  signalingMessage: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FDBA74',
  },

  signalingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },

  signalingLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#EA580C',
  },

  // Texte des messages
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  userMessageText: {
    color: '#FFFFFF',
  },

  otherMessageText: {
    color: '#374151',
  },

  signalingMessageText: {
    color: '#9A3412',
  },

  messageTime: {
    fontSize: 10,
    marginTop: 2,
  },

  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },

  otherMessageTime: {
    color: '#9CA3AF',
  },

  // Indicateur de frappe
  typingIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },

  typingText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  // Zone de saisie
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },

  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
    backgroundColor: '#F9FAFB',
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonActive: {
    backgroundColor: '#059669',
  },

  sendButtonInactive: {
    backgroundColor: '#F3F4F6',
  },

  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
});

export default ChatScreen;