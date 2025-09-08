import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const ProfileScreen = ({ onNavigateBack }) => {
  
  // Données du profil utilisateur
  const userProfile = {
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
      badgesEarned: 12,
      thanksReceived: 156,
      streakDays: 12
    },
    badges: [
      { id: 1, name: "Première Recherche", icon: "🔍", description: "Participer à sa première recherche", earned: true, date: "Mars 2024" },
      { id: 2, name: "Sauveur de Chat", icon: "🐱", description: "Aider à retrouver 3 chats", earned: true, date: "Avril 2024" },
      { id: 3, name: "Héros du Quartier", icon: "🏙️", description: "Être actif dans sa zone pendant 1 mois", earned: true, date: "Mai 2024" },
      { id: 4, name: "Ami des Chiens", icon: "🐕", description: "Aider à retrouver 3 chiens", earned: true, date: "Juin 2024" },
      { id: 5, name: "Photographe", icon: "📸", description: "Prendre 10 photos d'animaux perdus", earned: true, date: "Juillet 2024" },
      { id: 6, name: "Communicant", icon: "💬", description: "Envoyer 50 messages utiles", earned: true, date: "Août 2024" },
      { id: 7, name: "Marathonien", icon: "🏃", description: "Chercher pendant plus de 5h d'affilée", earned: false },
      { id: 8, name: "Ange Gardien", icon: "👼", description: "Aider à retrouver 10 animaux", earned: false },
      { id: 9, name: "Influenceur", icon: "📢", description: "Partager 20 annonces sur les réseaux", earned: false },
    ],
    recentActivity: [
      { action: "A participé à la recherche de", animal: "Bella", type: "🐕", points: "+50", time: "Il y a 2h" },
      { action: "A signalé avoir vu", animal: "Rocky", type: "🐱", points: "+25", time: "Hier" },
      { action: "A créé une annonce pour", animal: "Minou", type: "🐱", points: "+10", time: "Il y a 3 jours" },
      { action: "Badge obtenu:", animal: "Ami des Chiens", type: "🏆", points: "+100", time: "Il y a 5 jours" },
    ],
    searchHistory: [
      {
        id: 1,
        petName: "Rocky",
        petImage: "🐱",
        ownerName: "Sophie R.",
        location: "Lyon 6ème",
        participatedDate: "Il y a 2 semaines",
        status: "found",
        foundDate: "Il y a 3 jours",
        myContribution: "Signalement décisif",
        pointsEarned: 100,
        thanksFromOwner: "Merci Marie ! Grâce à votre signalement près du pont Wilson, j'ai pu retrouver Rocky ! ❤️"
      },
      {
        id: 2,
        petName: "Milo",
        petImage: "🐱",
        ownerName: "Marie L.",
        location: "Lyon 3ème",
        participatedDate: "Il y a 3 jours",
        status: "found",
        foundDate: "Hier",
        myContribution: "Recherche active",
        pointsEarned: 75,
        thanksFromOwner: "Un grand merci à tous les bénévoles, Milo est rentré à la maison !"
      },
      {
        id: 3,
        petName: "Luna",
        petImage: "🐱",
        ownerName: "Carla M.",
        location: "Lyon 2ème",
        participatedDate: "Il y a 1 mois",
        status: "found",
        foundDate: "Il y a 3 semaines",
        myContribution: "Partage réseaux sociaux",
        pointsEarned: 50,
        thanksFromOwner: "Le partage sur Facebook a permis qu'une voisine la reconnaisse. Merci !"
      },
      {
        id: 4,
        petName: "Bella",
        petImage: "🐕",
        ownerName: "Jean-Pierre M.",
        location: "Villeurbanne",
        participatedDate: "Il y a 1 semaine",
        status: "active",
        myContribution: "Recherche en cours",
        pointsEarned: 25,
      },
      {
        id: 5,
        petName: "Oscar",
        petImage: "🐕",
        ownerName: "Thomas B.",
        location: "Lyon 5ème",
        participatedDate: "Il y a 2 mois",
        status: "found",
        foundDate: "Il y a 1 mois",
        myContribution: "Distribution d'affiches",
        pointsEarned: 60,
        thanksFromOwner: "Les affiches dans le quartier ont été essentielles. Oscar est revenu !"
      }
    ]
  };

  // Fonction pour gérer les actions de paramètres
  const handleSettingPress = (setting) => {
    console.log(`Paramètre sélectionné: ${setting}`);
    // Logique pour navigation vers les paramètres spécifiques
  };

  // Fonction pour voir le classement complet
  const handleViewLeaderboard = () => {
    console.log('Navigation vers le classement complet');
    // Logique pour afficher le classement
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    console.log('Déconnexion demandée');
    // Logique pour déconnecter l'utilisateur
  };

  return (
    <View style={styles.container}>
      {/* Header avec dégradé */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mon Profil</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Profil utilisateur */}
        <View style={styles.profileHeader}>
          <Text style={styles.avatar}>{userProfile.avatar}</Text>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userLocation}>{userProfile.location}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>
              {userProfile.level} • Niveau {userProfile.levelNumber}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Barre de progression de niveau */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>
                Progression vers le niveau {userProfile.levelNumber + 1}
              </Text>
              <Text style={styles.progressPoints}>
                {userProfile.totalPoints}/{userProfile.nextLevelPoints} pts
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { width: `${(userProfile.totalPoints / userProfile.nextLevelPoints) * 100}%` }
                ]}
              />
            </View>
            
            <Text style={styles.progressHint}>
              Plus que {userProfile.nextLevelPoints - userProfile.totalPoints} points pour devenir "Légende des Animaux" !
            </Text>
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.quickStatsSection}>
          <View style={styles.quickStatsGrid}>
            <View style={styles.quickStatCard}>
              <Text style={styles.quickStatNumber}>{userProfile.stats.animalsFound}</Text>
              <Text style={styles.quickStatLabel}>Animaux retrouvés</Text>
              <Text style={styles.quickStatBadge}>🏆 Top 5% des utilisateurs</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <Text style={styles.quickStatNumberPurple}>{userProfile.stats.searchesParticipated}</Text>
              <Text style={styles.quickStatLabel}>Recherches aidées</Text>
              <Text style={styles.quickStatBadgeBlue}>🔥 {userProfile.stats.streakDays} jours d'activité</Text>
            </View>
          </View>
        </View>

        {/* Statistiques détaillées */}
        <View style={styles.detailedStatsSection}>
          <Text style={styles.sectionTitle}>📊 Mes statistiques</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⏰</Text>
              </View>
              <Text style={styles.statLabel}>Heures bénévoles</Text>
              <Text style={styles.statValue}>{userProfile.stats.hoursVolunteered}h</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>❤️</Text>
              </View>
              <Text style={styles.statLabel}>Remerciements reçus</Text>
              <Text style={styles.statValue}>{userProfile.stats.thanksReceived}</Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🏅</Text>
              </View>
              <Text style={styles.statLabel}>Badges obtenus</Text>
              <Text style={styles.statValue}>
                {userProfile.badges.filter(b => b.earned).length}/{userProfile.badges.length}
              </Text>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>📅</Text>
              </View>
              <Text style={styles.statLabel}>Membre depuis</Text>
              <Text style={styles.statValue}>{userProfile.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Section badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>
            🏆 Mes badges ({userProfile.badges.filter(b => b.earned).length}/{userProfile.badges.length})
          </Text>
          
          <View style={styles.badgesGrid}>
            {userProfile.badges.map(badge => (
              <View 
                key={badge.id} 
                style={[
                  styles.badgeCard,
                  badge.earned ? styles.badgeCardEarned : styles.badgeCardLocked
                ]}
              >
                <Text style={[
                  styles.badgeIcon,
                  !badge.earned && styles.badgeIconGray
                ]}>
                  {badge.icon}
                </Text>
                <Text style={[
                  styles.badgeName,
                  badge.earned ? styles.badgeNameEarned : styles.badgeNameLocked
                ]}>
                  {badge.name}
                </Text>
                {badge.earned && (
                  <Text style={styles.badgeDate}>{badge.date}</Text>
                )}
              </View>
            ))}
          </View>
          
          {/* Prochain badge */}
          <View style={styles.nextBadgeHint}>
            <Text style={styles.nextBadgeText}>
              <Text style={styles.nextBadgeLabel}>Prochain badge:</Text> "Marathonien" 🏃
            </Text>
            <Text style={styles.nextBadgeDescription}>
              Participez à une recherche de plus de 5h pour le débloquer!
            </Text>
          </View>
        </View>

        {/* Galerie de réussites */}
        <View style={styles.successGallerySection}>
          <Text style={styles.sectionTitle}>🎉 Mes réussites</Text>
          <Text style={styles.successSubtitle}>
            {userProfile.searchHistory.filter(s => s.status === 'found').length} animaux aidés à retrouver
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.successGallery}>
            {userProfile.searchHistory.filter(s => s.status === 'found').map((success) => (
              <View key={success.id} style={styles.successCard}>
                <Text style={styles.successPetImage}>{success.petImage}</Text>
                <Text style={styles.successPetName}>{success.petName}</Text>
                <Text style={styles.successDate}>Retrouvé {success.foundDate}</Text>
                <View style={styles.successPoints}>
                  <Text style={styles.successPointsText}>+{success.pointsEarned} pts</Text>
                </View>
              </View>
            ))}
            
            {/* Carte motivation */}
            <View style={styles.motivationCard}>
              <Text style={styles.motivationEmoji}>⭐</Text>
              <Text style={styles.motivationText}>Continuez à aider !</Text>
              <Text style={styles.motivationSubtext}>Chaque recherche compte</Text>
            </View>
          </ScrollView>
        </View>

        {/* Historique complet des recherches */}
        <View style={styles.searchHistorySection}>
          <Text style={styles.sectionTitle}>📋 Historique de mes recherches</Text>
          <Text style={styles.historySubtitle}>
            {userProfile.searchHistory.length} recherches • {userProfile.searchHistory.filter(s => s.status === 'found').length} succès
          </Text>
          
          <View style={styles.historyList}>
            {userProfile.searchHistory.map((search) => (
              <View key={search.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyPetInfo}>
                    <Text style={styles.historyPetImage}>{search.petImage}</Text>
                    <View style={styles.historyPetDetails}>
                      <Text style={styles.historyPetName}>{search.petName}</Text>
                      <Text style={styles.historyOwner}>de {search.ownerName} • {search.location}</Text>
                      <Text style={styles.historyDates}>
                        Participé {search.participatedDate}
                        {search.status === 'found' && ` • Retrouvé ${search.foundDate}`}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.historyStatus}>
                    {search.status === 'found' ? (
                      <View style={styles.historyStatusFound}>
                        <Text style={styles.historyStatusTextFound}>✅ Retrouvé</Text>
                      </View>
                    ) : (
                      <View style={styles.historyStatusActive}>
                        <Text style={styles.historyStatusTextActive}>🔍 En cours</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.historyContribution}>
                  <View style={styles.contributionInfo}>
                    <Text style={styles.contributionLabel}>Ma contribution:</Text>
                    <Text style={styles.contributionValue}>{search.myContribution}</Text>
                  </View>
                  <View style={styles.contributionPoints}>
                    <Text style={styles.contributionPointsText}>+{search.pointsEarned} pts</Text>
                  </View>
                </View>
                
                {search.thanksFromOwner && (
                  <View style={styles.thanksSection}>
                    <Text style={styles.thanksLabel}>💌 Message du propriétaire:</Text>
                    <Text style={styles.thanksMessage}>"{search.thanksFromOwner}"</Text>
                  </View>
                )}
                
                {search.status === 'found' && (
                  <View style={styles.successBadge}>
                    <Text style={styles.successBadgeText}>🎉 Mission accomplie !</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Activité récente */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>📋 Activité récente</Text>
          
          <View style={styles.activityList}>
            {userProfile.recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityLeft}>
                  <Text style={styles.activityEmoji}>{activity.type}</Text>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityDescription}>
                      {activity.action} <Text style={styles.activityAnimal}>{activity.animal}</Text>
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
                <View style={[
                  styles.activityPoints,
                  activity.points.includes('+') && styles.activityPointsPositive
                ]}>
                  <Text style={[
                    styles.activityPointsText,
                    activity.points.includes('+') && styles.activityPointsTextPositive
                  ]}>
                    {activity.points}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Classement mensuel */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.leaderboardTitle}>👑 Classement mensuel</Text>
          
          <View style={styles.leaderboardContent}>
            <View style={styles.leaderboardLeft}>
              <Text style={styles.leaderboardSubtitle}>Votre position ce mois-ci</Text>
              <Text style={styles.leaderboardPosition}>#12 sur 1,247</Text>
              <Text style={styles.leaderboardTrend}>↗ +3 places cette semaine</Text>
            </View>
            <TouchableOpacity 
              style={styles.leaderboardButton}
              onPress={handleViewLeaderboard}
            >
              <Text style={styles.leaderboardButtonText}>Voir le classement</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Paramètres */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>⚙️ Paramètres</Text>
          
          <View style={styles.settingsList}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('notifications')}
            >
              <Text style={styles.settingText}>📱 Notifications et alertes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('zone')}
            >
              <Text style={styles.settingText}>🌍 Zone de recherche préférée</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('privacy')}
            >
              <Text style={styles.settingText}>🔒 Confidentialité</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('help')}
            >
              <Text style={styles.settingText}>❓ Aide et support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItemDanger}
              onPress={handleLogout}
            >
              <Text style={styles.settingTextDanger}>🚪 Déconnexion</Text>
            </TouchableOpacity>
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

  // Header avec dégradé
  header: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 50,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },

  headerSpacer: {
    width: 32,
  },

  // Profil utilisateur
  profileHeader: {
    alignItems: 'center',
    gap: 8,
  },

  avatar: {
    fontSize: 48,
    marginBottom: 8,
  },

  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  userLocation: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },

  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Container de scroll
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -24, // Pour chevaucher le header
  },

  // Progression de niveau
  progressSection: {
    marginBottom: 24,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    gap: 12,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },

  progressPoints: {
    fontSize: 14,
    color: '#6B7280',
  },

  progressBarContainer: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
  },

  progressHint: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Statistiques rapides
  quickStatsSection: {
    marginBottom: 24,
  },

  quickStatsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  quickStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    gap: 4,
  },

  quickStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  quickStatNumberPurple: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },

  quickStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  quickStatBadge: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
  },

  quickStatBadgeBlue: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 4,
  },

  // Statistiques détaillées
  detailedStatsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },

  statsGrid: {
    gap: 12,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  statIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statEmoji: {
    fontSize: 20,
  },

  statLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  // Section badges
  badgesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },

  badgeCard: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },

  badgeCardEarned: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },

  badgeCardLocked: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },

  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  badgeIconGray: {
    opacity: 0.4,
  },

  badgeName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  badgeNameEarned: {
    color: '#92400E',
  },

  badgeNameLocked: {
    color: '#6B7280',
  },

  badgeDate: {
    fontSize: 10,
    color: '#D97706',
    marginTop: 2,
  },

  nextBadgeHint: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },

  nextBadgeText: {
    fontSize: 14,
    color: '#1E40AF',
  },

  nextBadgeLabel: {
    fontWeight: 'bold',
  },

  nextBadgeDescription: {
    fontSize: 12,
    color: '#2563EB',
  },

  // Galerie de réussites
  successGallerySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  successSubtitle: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 16,
    fontWeight: '500',
  },

  successGallery: {
    flexDirection: 'row',
  },

  successCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
    width: 100,
    gap: 6,
  },

  successPetImage: {
    fontSize: 32,
  },

  successPetName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },

  successDate: {
    fontSize: 10,
    color: '#065F46',
  },

  successPoints: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },

  successPointsText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  motivationCard: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 100,
    gap: 4,
  },

  motivationEmoji: {
    fontSize: 24,
  },

  motivationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
    textAlign: 'center',
  },

  motivationSubtext: {
    fontSize: 10,
    color: '#B45309',
    textAlign: 'center',
  },

  // Historique des recherches
  searchHistorySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  historySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  historyList: {
    gap: 16,
  },

  historyCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  historyPetInfo: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },

  historyPetImage: {
    fontSize: 24,
  },

  historyPetDetails: {
    flex: 1,
    gap: 2,
  },

  historyPetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },

  historyOwner: {
    fontSize: 13,
    color: '#6B7280',
  },

  historyDates: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  historyStatus: {
    alignItems: 'flex-end',
  },

  historyStatusFound: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  historyStatusTextFound: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
  },

  historyStatusActive: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  historyStatusTextActive: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '600',
  },

  historyContribution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
  },

  contributionInfo: {
    flex: 1,
  },

  contributionLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  contributionValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  contributionPoints: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  contributionPointsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  thanksSection: {
    backgroundColor: '#FDF2F8',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FBCFE8',
    gap: 6,
  },

  thanksLabel: {
    fontSize: 12,
    color: '#BE185D',
    fontWeight: '600',
  },

  thanksMessage: {
    fontSize: 13,
    color: '#9D174D',
    lineHeight: 18,
    fontStyle: 'italic',
  },

  successBadge: {
    backgroundColor: '#059669',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  successBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Activité récente
  activitySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  activityList: {
    gap: 12,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  activityEmoji: {
    fontSize: 20,
  },

  activityContent: {
    flex: 1,
    gap: 2,
  },

  activityDescription: {
    fontSize: 14,
    color: '#374151',
  },

  activityAnimal: {
    fontWeight: 'bold',
  },

  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  activityPoints: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  activityPointsPositive: {
    backgroundColor: '#D1FAE5',
  },

  activityPointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  activityPointsTextPositive: {
    color: '#059669',
  },

  // Classement mensuel
  leaderboardSection: {
    backgroundColor: '#FCD34D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },

  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leaderboardLeft: {
    flex: 1,
  },

  leaderboardSubtitle: {
    fontSize: 14,
    color: '#92400E',
    opacity: 0.8,
  },

  leaderboardPosition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    marginVertical: 4,
  },

  leaderboardTrend: {
    fontSize: 12,
    color: '#059669',
  },

  leaderboardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  leaderboardButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400E',
  },

  // Paramètres
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  settingsList: {
    gap: 4,
  },

  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  settingItemDanger: {
    paddingVertical: 12,
  },

  settingText: {
    fontSize: 14,
    color: '#374151',
  },

  settingTextDanger: {
    fontSize: 14,
    color: '#DC2626',
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },
});

export default ProfileScreen;