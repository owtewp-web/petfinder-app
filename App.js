// App.js - Avec écran d'accueil et navigation complète
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// Icônes en emoji pour simuler lucide-react-native
const SearchIcon = () => <Text style={{ fontSize: 20 }}>🔍</Text>;
const MapPinIcon = () => <Text style={{ fontSize: 16 }}>📍</Text>;
const HeartIcon = () => <Text style={{ fontSize: 24 }}>❤️</Text>;
const PlusIcon = () => <Text style={{ fontSize: 24 }}>➕</Text>;
const UserIcon = () => <Text style={{ fontSize: 24 }}>👤</Text>;
const BellIcon = () => <Text style={{ fontSize: 24 }}>🔔</Text>;
const FilterIcon = () => <Text style={{ fontSize: 20 }}>⚙️</Text>;
const ClockIcon = () => <Text style={{ fontSize: 16 }}>🕐</Text>;
const UsersIcon = () => <Text style={{ fontSize: 16 }}>👥</Text>;

// Composants UI réutilisables
const Button = ({ title, onPress, loading = false, style = {} }) => (
  <TouchableOpacity
    style={[buttonStyles.button, style]}
    onPress={onPress}
    disabled={loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" size="small" />
    ) : (
      <Text style={buttonStyles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  error, 
  style = {},
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences'
}) => (
  <View style={[inputStyles.container, style]}>
    {label && <Text style={inputStyles.label}>{label}</Text>}
    <TextInput
      style={[inputStyles.input, error && inputStyles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
    {error && <Text style={inputStyles.errorText}>{error}</Text>}
  </View>
);

const Card = ({ children, style = {} }) => (
  <View style={[cardStyles.card, style]}>
    {children}
  </View>
);

// Données simulées des animaux perdus
const petData = [
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
];

// Écran d'authentification (simplifié pour ce test)
const AuthScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Connexion réussie ! 🎉', 
        `Bienvenue ${email}`,
        [{ text: 'Continuer', onPress: onLogin }]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#7C3AED']}
        style={authStyles.gradient}
      >
        <View style={authStyles.header}>
          <Text style={authStyles.logo}>🐾</Text>
          <Text style={authStyles.title}>PetFinder</Text>
          <Text style={authStyles.subtitle}>Retrouvons ensemble nos compagnons perdus</Text>
        </View>

        <View style={authStyles.formContainer}>
          <Card style={authStyles.formCard}>
            <Text style={authStyles.formTitle}>Connexion</Text>
            
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={true}
            />

            <Button
              title={loading ? "Connexion..." : "Se connecter"}
              onPress={handleLogin}
              loading={loading}
              style={{ marginTop: 16 }}
            />

            <TouchableOpacity style={authStyles.quickLogin} onPress={onLogin}>
              <Text style={authStyles.quickLoginText}>⚡ Connexion rapide (pour test)</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// Écran d'accueil avec liste des animaux
const HomeScreen = ({ onNavigateToProfile, onNavigateToDetail, onLogout }) => {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Fonction pour gérer le clic sur une carte d'animal
  const handlePetCardPress = (pet) => {
    Alert.alert(
      `${pet.name} - ${pet.type}`,
      `${pet.description}\n\nLocalisation: ${pet.location}\nPropriétaire: ${pet.owner}`,
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Plus de détails', onPress: () => onNavigateToDetail(pet) }
      ]
    );
  };

  // Fonction pour gérer les fonctionnalités non implémentées
  const handleComingSoon = (feature) => {
    Alert.alert('Bientôt disponible', `La fonctionnalité "${feature}" sera ajoutée dans une prochaine version !`);
  };

  return (
    <View style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        <View style={homeStyles.headerTop}>
          <Text style={homeStyles.logo}>🐾 PetFinder</Text>
          <View style={homeStyles.headerIcons}>
            <TouchableOpacity onPress={() => handleComingSoon('Notifications')}>
              <BellIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavigateToProfile}>
              <UserIcon />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Barre de recherche */}
        <View style={homeStyles.searchContainer}>
          <View style={homeStyles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput 
            placeholder="Rechercher un animal (nom, race...)"
            style={homeStyles.searchInput}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={homeStyles.filterIcon} onPress={() => handleComingSoon('Filtres')}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={homeStyles.quickStats}>
        <Text style={homeStyles.quickStatsLeft}>📍 Lyon - 15 animaux recherchés</Text>
        <Text style={homeStyles.quickStatsRight}>✅ 8 retrouvés cette semaine</Text>
      </View>

      {/* Liste des animaux perdus */}
      <ScrollView style={homeStyles.petList} showsVerticalScrollIndicator={false}>
        {petData.map(pet => (
          <TouchableOpacity 
            key={pet.id} 
            style={homeStyles.petCard}
            onPress={() => handlePetCardPress(pet)}
          >
            <View style={homeStyles.petCardContent}>
              {/* Image de l'animal (emoji) */}
              <View style={homeStyles.petImageContainer}>
                <Text style={homeStyles.petImage}>{pet.image}</Text>
              </View>
              
              {/* Informations de l'animal */}
              <View style={homeStyles.petInfo}>
                <View style={homeStyles.petHeader}>
                  <View style={homeStyles.petTitleContainer}>
                    <Text style={homeStyles.petName}>{pet.name}</Text>
                    <Text style={homeStyles.petDetails}>
                      {pet.type} • {pet.race} • {pet.color}
                    </Text>
                  </View>
                </View>
                
                {/* Localisation et date */}
                <View style={homeStyles.locationInfo}>
                  <View style={homeStyles.locationItem}>
                    <MapPinIcon />
                    <Text style={homeStyles.locationText}>
                      {pet.location} • {pet.distance}
                    </Text>
                  </View>
                  <View style={homeStyles.locationItem}>
                    <ClockIcon />
                    <Text style={homeStyles.locationText}>{pet.lostDate}</Text>
                  </View>
                </View>

                {/* Statistiques de l'annonce */}
                <View style={homeStyles.petStats}>
                  <View style={homeStyles.statItem}>
                    <UsersIcon />
                    <Text style={homeStyles.statText}>
                      {pet.participants} participants
                    </Text>
                  </View>
                  <View style={homeStyles.statItem}>
                    <MapPinIcon />
                    <Text style={homeStyles.statTextOrange}>
                      {pet.sightings} signalements
                    </Text>
                  </View>
                </View>

                {/* Récompense */}
                {pet.reward && (
                  <View style={homeStyles.rewardContainer}>
                    <Text style={homeStyles.rewardText}>💰 Récompense: {pet.reward}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Espace pour la navigation en bas */}
        <View style={homeStyles.bottomSpacer} />
      </ScrollView>

      {/* Navigation en bas de l'écran */}
      <View style={homeStyles.bottomNavigation}>
        <View style={homeStyles.navContainer}>
          {/* Bouton Rechercher (actif) */}
          <View style={homeStyles.navItem}>
            <SearchIcon />
            <Text style={homeStyles.navTextActive}>Rechercher</Text>
          </View>
          
          {/* Bouton Carte */}
          <TouchableOpacity 
            style={homeStyles.navItem}
            onPress={() => handleComingSoon('Carte')}
          >
            <MapPinIcon />
            <Text style={homeStyles.navTextInactive}>Carte</Text>
          </TouchableOpacity>
          
          {/* Bouton central Ajouter */}
          <TouchableOpacity 
            style={homeStyles.addButton}
            onPress={() => handleComingSoon('Créer annonce')}
          >
            <PlusIcon />
          </TouchableOpacity>
          
          {/* Bouton Messages */}
          <TouchableOpacity 
            style={homeStyles.navItem}
            onPress={() => handleComingSoon('Messages')}
          >
            <Text style={homeStyles.messageIcon}>💬</Text>
            <Text style={homeStyles.navTextInactive}>Messages</Text>
          </TouchableOpacity>
          
          {/* Bouton Mes animaux */}
          <TouchableOpacity 
            style={homeStyles.navItem}
            onPress={() => handleComingSoon('Mes animaux')}
          >
            <HeartIcon />
            <Text style={homeStyles.navTextInactive}>Mes animaux</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Écran de détail d'un animal (simple)
const PetDetailScreen = ({ selectedPet, onNavigateBack }) => {
  if (!selectedPet) {
    return (
      <View style={detailStyles.errorContainer}>
        <Text style={detailStyles.errorText}>Aucun animal sélectionné</Text>
        <Button title="Retour à l'accueil" onPress={onNavigateBack} />
      </View>
    );
  }

  return (
    <ScrollView style={detailStyles.container}>
      {/* Header */}
      <View style={detailStyles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={detailStyles.backButton}>
          <Text style={detailStyles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={detailStyles.headerTitle}>{selectedPet.name}</Text>
      </View>

      {/* Image et informations principales */}
      <View style={detailStyles.petImageSection}>
        <Text style={detailStyles.petImageLarge}>{selectedPet.image}</Text>
        <Text style={detailStyles.petNameLarge}>{selectedPet.name}</Text>
        <Text style={detailStyles.petTypeInfo}>
          {selectedPet.type} • {selectedPet.race}
        </Text>
      </View>

      {/* Informations détaillées */}
      <View style={detailStyles.detailsSection}>
        <Card style={detailStyles.infoCard}>
          <Text style={detailStyles.sectionTitle}>Informations</Text>
          <View style={detailStyles.infoList}>
            <View style={detailStyles.infoRow}>
              <Text style={detailStyles.infoLabel}>Couleur:</Text>
              <Text style={detailStyles.infoValue}>{selectedPet.color}</Text>
            </View>
            <View style={detailStyles.infoRow}>
              <Text style={detailStyles.infoLabel}>Lieu de disparition:</Text>
              <Text style={detailStyles.infoValue}>{selectedPet.location}</Text>
            </View>
            <View style={detailStyles.infoRow}>
              <Text style={detailStyles.infoLabel}>Date de disparition:</Text>
              <Text style={detailStyles.infoValue}>{selectedPet.lostDate}</Text>
            </View>
            <View style={detailStyles.infoRow}>
              <Text style={detailStyles.infoLabel}>Propriétaire:</Text>
              <Text style={detailStyles.infoValue}>{selectedPet.owner}</Text>
            </View>
            {selectedPet.reward && (
              <View style={detailStyles.infoRow}>
                <Text style={detailStyles.infoLabel}>Récompense:</Text>
                <Text style={detailStyles.infoValueReward}>{selectedPet.reward}</Text>
              </View>
            )}
          </View>
        </Card>

        <Card style={detailStyles.infoCard}>
          <Text style={detailStyles.sectionTitle}>Description</Text>
          <Text style={detailStyles.descriptionText}>{selectedPet.description}</Text>
        </Card>

        {/* Statistiques */}
        <View style={detailStyles.statsGrid}>
          <Card style={detailStyles.statCard}>
            <Text style={detailStyles.statNumber}>{selectedPet.participants}</Text>
            <Text style={detailStyles.statLabel}>Participants</Text>
          </Card>
          <Card style={detailStyles.statCardOrange}>
            <Text style={detailStyles.statNumberOrange}>{selectedPet.sightings}</Text>
            <Text style={detailStyles.statLabelOrange}>Signalements</Text>
          </Card>
        </View>

        {/* Boutons d'action */}
        <View style={detailStyles.actionButtons}>
          <Button
            title="📞 Appeler le propriétaire"
            onPress={() => Alert.alert('Appel', `Appel de ${selectedPet.owner} au ${selectedPet.phone}`)}
            style={detailStyles.callButton}
          />
          <Button
            title="🔍 J'ai vu cet animal"
            onPress={() => Alert.alert('Signalement', 'Fonctionnalité de signalement bientôt disponible')}
            style={detailStyles.sightingButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// Écran de profil (simple)
const ProfileScreen = ({ onNavigateBack, onLogout }) => (
  <View style={profileStyles.container}>
    <View style={profileStyles.header}>
      <TouchableOpacity onPress={onNavigateBack} style={profileStyles.backButton}>
        <Text style={profileStyles.backText}>← Retour</Text>
      </TouchableOpacity>
      <Text style={profileStyles.headerTitle}>Mon Profil</Text>
    </View>
    
    <View style={profileStyles.content}>
      <View style={profileStyles.profileInfo}>
        <Text style={profileStyles.avatar}>👤</Text>
        <Text style={profileStyles.userName}>Utilisateur Test</Text>
        <Text style={profileStyles.userEmail}>test@petfinder.com</Text>
      </View>
      
      <Card style={profileStyles.statsCard}>
        <Text style={profileStyles.statsTitle}>Mes statistiques</Text>
        <View style={profileStyles.statsList}>
          <Text style={profileStyles.statsItem}>🏆 5 animaux aidés à retrouver</Text>
          <Text style={profileStyles.statsItem}>🔍 12 recherches participées</Text>
          <Text style={profileStyles.statsItem}>⭐ Membre depuis mars 2024</Text>
        </View>
      </Card>
      
      <Button
        title="Se déconnecter"
        onPress={onLogout}
        style={profileStyles.logoutButton}
      />
    </View>
  </View>
);

// App principal avec navigation complète
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedPet, setSelectedPet] = useState(null);

  const handleLogin = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('auth');
    setSelectedPet(null);
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleNavigateToDetail = (pet) => {
    setSelectedPet(pet);
    setCurrentScreen('detail');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
    setSelectedPet(null);
  };

  // Rendu de l'écran courant
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      
      case 'home':
        return (
          <HomeScreen
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToDetail={handleNavigateToDetail}
            onLogout={handleLogout}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen
            onNavigateBack={handleNavigateToHome}
            onLogout={handleLogout}
          />
        );
      
      case 'detail':
        return (
          <PetDetailScreen
            selectedPet={selectedPet}
            onNavigateBack={handleNavigateToHome}
          />
        );
      
      default:
        return <AuthScreen onLogin={handleLogin} />;
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      {renderCurrentScreen()}
    </>
  );
}

// Styles pour les composants réutilisables
const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

// Styles pour l'authentification
const authStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  quickLogin: {
    marginTop: 16,
    alignItems: 'center',
  },
  quickLoginText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
});

// Styles pour l'écran d'accueil
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
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
    paddingLeft: 45,
    paddingRight: 45,
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
  petList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  petStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 8,
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
  rewardContainer: {
    marginTop: 8,
  },
  rewardText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 80,
  },
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
});

// Styles pour l'écran de détail
const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
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
  detailsSection: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
  infoValueReward: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    flex: 1,
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    padding: 16,
  },
  statCardOrange: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    padding: 16,
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
  statLabel: {
    fontSize: 12,
    color: '#2563EB',
    textAlign: 'center',
  },
  statLabelOrange: {
    fontSize: 12,
    color: '#EA580C',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 12,
  },
  callButton: {
    backgroundColor: '#059669',
  },
  sightingButton: {
    backgroundColor: '#EA580C',
  },
});

// Styles pour l'écran de profil
const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  profileInfo: {
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    fontSize: 64,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsCard: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsList: {
    gap: 12,
  },
  statsItem: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
  },
});