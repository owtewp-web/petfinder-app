// App.js - Application PetFinder complète
// Toute la logique et les composants dans un seul fichier

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import des styles depuis le fichier séparé
import { styles } from './styles';

// ========================================================================================
// COMPOSANTS UTILITAIRES
// ========================================================================================

// Composant Button réutilisable
const Button = ({ title, onPress, loading = false, style = {} }) => (
  <TouchableOpacity
    style={[styles.button, loading && styles.buttonLoading, style]}
    onPress={onPress}
    disabled={loading}
  >
    <Text style={styles.buttonText}>
      {loading ? 'Chargement...' : title}
    </Text>
  </TouchableOpacity>
);

// Composant Input réutilisable
const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  style = {}
}) => (
  <View style={[styles.inputContainer, style]}>
    {label && <Text style={styles.inputLabel}>{label}</Text>}
    <TextInput
      style={[styles.input, error && styles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      placeholderTextColor="#9CA3AF"
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Composant Card réutilisable
const Card = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

// ========================================================================================
// ÉCRAN D'AUTHENTIFICATION
// ========================================================================================

const AuthScreen = ({ onLogin }) => {
  // États pour gérer le mode (connexion/inscription)
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // États des préférences et accords
  const [preferences, setPreferences] = useState({
    newAds: true,
    sightings: true,
    newsletter: false
  });
  
  const [agreements, setAgreements] = useState({
    terms: false,
    partners: false
  });

  // Fonction pour mettre à jour les champs du formulaire
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Fonction pour toggle les préférences
  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Fonction pour toggle les accords
  const toggleAgreement = (key) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation email
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }

    // Validations spécifiques à l'inscription
    if (authMode === 'register') {
      if (!formData.firstName) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName) newErrors.lastName = 'Nom requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
      if (!formData.city) newErrors.city = 'Ville requise';
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }

      if (!agreements.terms) {
        newErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulation d'un délai réseau
    setTimeout(() => {
      setLoading(false);
      
      if (authMode === 'login') {
        Alert.alert(
          'Connexion réussie ! 🎉', 
          `Bienvenue ${formData.email}`,
          [{ text: 'Continuer', onPress: onLogin }]
        );
      } else {
        Alert.alert(
          'Inscription réussie ! 🎉', 
          `Compte créé pour ${formData.firstName} ${formData.lastName}`,
          [{ text: 'Continuer', onPress: onLogin }]
        );
      }
    }, 1500);
  };

  // Composant Checkbox personnalisé
  const CheckboxItem = ({ checked, onToggle, children, style = {} }) => (
    <TouchableOpacity 
      style={[styles.checkboxItem, style]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxText}>{children}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#7C3AED']}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.authHeader}>
          <Text style={styles.logo}>🐾</Text>
          <Text style={styles.title}>PetFinder</Text>
          <Text style={styles.subtitle}>
            Retrouvons ensemble nos compagnons perdus
          </Text>
        </View>

        {/* Formulaire */}
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Card style={styles.formCard}>
            {/* Onglets de navigation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, authMode === 'login' && styles.activeTab]}
                onPress={() => setAuthMode('login')}
              >
                <Text style={[styles.tabText, authMode === 'login' && styles.activeTabText]}>
                  Connexion
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, authMode === 'register' && styles.activeTab]}
                onPress={() => setAuthMode('register')}
              >
                <Text style={[styles.tabText, authMode === 'register' && styles.activeTabText]}>
                  Inscription
                </Text>
              </TouchableOpacity>
            </View>

            {/* Formulaire de connexion */}
            {authMode === 'login' ? (
              <View style={styles.form}>
                <Input
                  label="Email"
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />
                
                <Input
                  label="Mot de passe"
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  placeholder="••••••••"
                  secureTextEntry={true}
                  error={errors.password}
                />

                <View style={styles.loginOptions}>
                  <CheckboxItem
                    checked={preferences.remember || false}
                    onToggle={() => togglePreference('remember')}
                  >
                    Se souvenir de moi
                  </CheckboxItem>
                  
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                      Mot de passe oublié ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* Formulaire d'inscription */
              <View style={styles.form}>
                <View style={styles.row}>
                  <Input
                    label="Prénom *"
                    value={formData.firstName}
                    onChangeText={(value) => updateField('firstName', value)}
                    placeholder="Marie"
                    style={styles.halfInput}
                    error={errors.firstName}
                  />
                  <Input
                    label="Nom *"
                    value={formData.lastName}
                    onChangeText={(value) => updateField('lastName', value)}
                    placeholder="Dupont"
                    style={styles.halfInput}
                    error={errors.lastName}
                  />
                </View>

                <Input
                  label="Email *"
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  placeholder="marie.dupont@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />

                <Input
                  label="Téléphone *"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  placeholder="06 12 34 56 78"
                  keyboardType="phone-pad"
                  error={errors.phone}
                />

                <Input
                  label="Ville *"
                  value={formData.city}
                  onChangeText={(value) => updateField('city', value)}
                  placeholder="Lyon"
                  error={errors.city}
                />

                <Input
                  label="Mot de passe *"
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  placeholder="Minimum 8 caractères"
                  secureTextEntry={true}
                  error={errors.password}
                />

                <Input
                  label="Confirmer le mot de passe *"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  placeholder="Répétez votre mot de passe"
                  secureTextEntry={true}
                  error={errors.confirmPassword}
                />

                {/* Section préférences */}
                <Card style={styles.preferencesCard}>
                  <Text style={styles.preferencesTitle}>
                    Préférences de notifications
                  </Text>
                  <View style={styles.preferencesList}>
                    <CheckboxItem
                      checked={preferences.newAds}
                      onToggle={() => togglePreference('newAds')}
                    >
                      Nouvelles annonces dans ma ville
                    </CheckboxItem>
                    
                    <CheckboxItem
                      checked={preferences.sightings}
                      onToggle={() => togglePreference('sightings')}
                    >
                      Signalements d'animaux que je recherche
                    </CheckboxItem>
                    
                    <CheckboxItem
                      checked={preferences.newsletter}
                      onToggle={() => togglePreference('newsletter')}
                    >
                      Newsletter hebdomadaire
                    </CheckboxItem>
                  </View>
                </Card>

                {/* Accords légaux */}
                <View style={styles.agreementsSection}>
                  <CheckboxItem
                    checked={agreements.terms}
                    onToggle={() => toggleAgreement('terms')}
                    style={styles.agreementItem}
                  >
                    J'accepte les <Text style={styles.link}>conditions d'utilisation</Text> et la <Text style={styles.link}>politique de confidentialité</Text>
                  </CheckboxItem>
                  
                  {errors.terms && (
                    <Text style={styles.errorTextAgreement}>{errors.terms}</Text>
                  )}
                  
                  <CheckboxItem
                    checked={agreements.partners}
                    onToggle={() => toggleAgreement('partners')}
                    style={styles.agreementItem}
                  >
                    Je souhaite recevoir des offres partenaires (vétérinaires, assurances...)
                  </CheckboxItem>
                </View>
              </View>
            )}

            {/* Bouton principal */}
            <Button
              title={loading 
                ? (authMode === 'login' ? 'Connexion...' : 'Inscription...')
                : (authMode === 'login' ? 'Se connecter' : 'Créer mon compte')
              }
              onPress={handleSubmit}
              loading={loading}
              style={styles.mainButton}
            />

            {/* Footer */}
            <View style={styles.authFooter}>
              <Text style={styles.footerText}>
                En continuant, vous aidez à créer une communauté solidaire pour nos animaux 🐾
              </Text>
            </View>
          </Card>

          {/* Statistiques en bas */}
          <View style={styles.authStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2,847</Text>
              <Text style={styles.statLabel}>Animaux retrouvés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15,293</Text>
              <Text style={styles.statLabel}>Membres actifs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Taux de réussite</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// ========================================================================================
// ÉCRAN D'ACCUEIL
// ========================================================================================

const HomeScreen = ({ 
  onNavigateToProfile, 
  onNavigateToDetail, 
  onNavigateToCreate, 
  onNavigateToMessages, 
  onNavigateToMyAnimals 
}) => {
  // Données des animaux perdus (simulation)
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

  // Gestion du clic sur une carte d'animal
  const handlePetCardPress = (pet) => {
    if (onNavigateToDetail) {
      onNavigateToDetail(pet);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.homeHeader}>
        <View style={styles.headerTop}>
          <Text style={styles.homeLogo}>🐾 PetFinder</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Text style={styles.headerIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavigateToProfile}>
              <Text style={styles.headerIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            placeholder="Rechercher un animal (nom, race...)"
            style={styles.searchInput}
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.filterIcon}>⚙️</Text>
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
              {/* Image de l'animal */}
              <View style={styles.petImageContainer}>
                <Text style={styles.petImageHome}>{pet.image}</Text>
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
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.locationText}>
                      {pet.location} • {pet.distance}
                    </Text>
                  </View>
                  <View style={styles.locationItem}>
                    <Text style={styles.locationIcon}>🕐</Text>
                    <Text style={styles.locationText}>{pet.lostDate}</Text>
                  </View>
                </View>

                {/* Statistiques de l'annonce */}
                <View style={styles.petStats}>
                  <View style={styles.petStatItem}>
                    <Text style={styles.statIcon}>👥</Text>
                    <Text style={styles.statText}>
                      {pet.participants} participants
                    </Text>
                  </View>
                  <View style={styles.petStatItem}>
                    <Text style={styles.statIconOrange}>📍</Text>
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
            <Text style={styles.navIcon}>🔍</Text>
            <Text style={styles.navTextActive}>Rechercher</Text>
          </View>
          
          {/* Bouton Carte */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setShowComingSoonModal(true)}
          >
            <Text style={styles.navIcon}>🗺️</Text>
            <Text style={styles.navTextInactive}>Carte</Text>
          </TouchableOpacity>
          
          {/* Bouton central Ajouter */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={onNavigateToCreate}
          >
            <Text style={styles.addButtonText}>➕</Text>
          </TouchableOpacity>
          
          {/* Bouton Messages */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={onNavigateToMessages}
          >
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navTextInactive}>Messages</Text>
          </TouchableOpacity>
          
          {/* Bouton Mes animaux */}
          <TouchableOpacity 
            style={styles.navItem}
            onPress={onNavigateToMyAnimals}
          >
            <Text style={styles.navIcon}>❤️</Text>
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

// ========================================================================================
// ÉCRAN DE DÉTAIL D'UN ANIMAL
// ========================================================================================

const PetDetailScreen = ({ 
  selectedPet, 
  onNavigateBack, 
  onNavigateToSighting, 
  onNavigateToChat 
}) => {
  // États pour gérer la participation de l'utilisateur
  const [isParticipating, setIsParticipating] = useState(false);
  const [participationLoading, setParticipationLoading] = useState(false);
  const [showParticipationModal, setShowParticipationModal] = useState(false);
  
  // Fonction pour gérer la participation
  const handleParticipate = () => {
    if (isParticipating) {
      setShowParticipationModal(true);
    } else {
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
      
      // Mettre à jour le nombre de participants
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Participation annulée pour ${selectedPet?.name}`);
      setIsParticipating(false);
      
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
    Alert.alert('Appel', `Appel vers ${selectedPet?.phone}`);
  };

  // Si aucun animal sélectionné
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
      <View style={styles.detailHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedPet.name}</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image et informations principales */}
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

          {/* Zone de recherche */}
          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>Zone de recherche</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapIcon}>📍</Text>
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

// ========================================================================================
// ÉCRAN DE SIGNALEMENT D'OBSERVATION
// ========================================================================================

const SightingScreen = ({ selectedPet, onNavigateBack }) => {
  // États pour gérer les données du formulaire
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [physicalState, setPhysicalState] = useState('');
  const [behaviors, setBehaviors] = useState({
    approachable: false,
    fearful: false,
    seekingFood: false,
    respondsToName: false,
    hasCollar: false,
  });
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Fonctions pour gérer les sélecteurs de date et heure
  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  // Formatage des dates
  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Fonction pour gérer la sélection rapide de l'heure
  const handleQuickTimeSelection = (timeText) => {
    const now = new Date();
    let newDate = new Date();
    
    switch(timeText) {
      case 'À l\'instant':
        setSelectedDate(now);
        setSelectedTime(now);
        break;
      case 'Il y a 30 min':
        newDate.setMinutes(now.getMinutes() - 30);
        setSelectedDate(newDate);
        setSelectedTime(newDate);
        break;
      case 'Il y a 1h':
        newDate.setHours(now.getHours() - 1);
        setSelectedDate(newDate);
        setSelectedTime(newDate);
        break;
      case 'Ce matin':
        newDate.setHours(8, 0, 0, 0);
        setSelectedDate(newDate);
        setSelectedTime(newDate);
        break;
    }
  };

  // Fonction pour gérer les changements de comportement
  const handleBehaviorChange = (behavior) => {
    setBehaviors(prev => ({
      ...prev,
      [behavior]: !prev[behavior]
    }));
  };

  // Fonction pour utiliser la position actuelle
  const handleUseCurrentLocation = () => {
    console.log('Utilisation de la position GPS actuelle');
    setLocation('Position actuelle détectée');
  };

  // Fonction pour envoyer le signalement
  const handleSubmitSighting = () => {
    console.log('Envoi du signalement pour:', selectedPet?.name);
    Alert.alert(
      'Signalement envoyé !',
      'Merci pour votre aide. Le propriétaire sera notifié.',
      [{ text: 'OK', onPress: onNavigateBack }]
    );
  };

  // Si aucun animal sélectionné
  if (!selectedPet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucun animal sélectionné</Text>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header avec informations de l'animal */}
      <View style={styles.sightingHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrowWhite}>←</Text>
          </TouchableOpacity>
          <Text style={styles.sightingHeaderTitle}>Signaler une observation</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Récapitulatif de l'animal */}
        <View style={styles.petRecap}>
          <Text style={styles.petRecapEmoji}>{selectedPet.image}</Text>
          <View style={styles.petRecapInfo}>
            <Text style={styles.petRecapName}>{selectedPet.name}</Text>
            <Text style={styles.petRecapDetails}>
              {selectedPet.type} • {selectedPet.race} • {selectedPet.color}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Alerte d'urgence */}
        <View style={styles.emergencyAlert}>
          <Text style={styles.emergencyTitle}>🚨 Situation d'urgence ?</Text>
          <Text style={styles.emergencyText}>
            Si l'animal semble blessé ou en danger immédiat, contactez d'abord le propriétaire puis les services vétérinaires d'urgence.
          </Text>
          <View style={styles.emergencyButtons}>
            <TouchableOpacity 
              style={styles.callOwnerButton}
              onPress={() => Alert.alert('Appel', `Appel vers ${selectedPet.phone}`)}
            >
              <Text style={styles.emergencyButtonText}>📞 Appeler le propriétaire</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.emergencyVetButton}
              onPress={() => Alert.alert('Urgence', 'Contacter les services vétérinaires')}
            >
              <Text style={styles.emergencyButtonText}>🆘 Urgence vétérinaire</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section lieu d'observation */}
        <View style={styles.sightingSection}>
          <Text style={styles.sightingSectionTitle}>📍 Lieu d'observation *</Text>
          
          <View style={styles.sightingInputGroup}>
            <Text style={styles.sightingInputLabel}>Adresse précise</Text>
            <TextInput
              style={styles.sightingTextInput}
              placeholder="Ex: 15 Rue de la République, Lyon"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.inputHint}>
              Soyez le plus précis possible pour aider à le retrouver
            </Text>
          </View>

          <View style={styles.sightingMapContainer}>
            <View style={styles.sightingMapPlaceholder}>
              <Text style={styles.mapIcon}>📍</Text>
              <Text style={styles.mapPlaceholderTitle}>Localisation GPS automatique</Text>
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={handleUseCurrentLocation}
              >
                <Text style={styles.locationButtonText}>📍 Utiliser ma position</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section date et heure */}
        <View style={styles.sightingSection}>
          <Text style={styles.sightingSectionTitle}>🕐 Quand l'avez-vous vu ? *</Text>
          
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeInput}>
                <Text style={styles.sightingInputLabel}>Date</Text>
                <TouchableOpacity 
                  style={styles.dateTimeButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateTimeButtonText}>
                    {formatDate(selectedDate)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dateTimeInput}>
                <Text style={styles.sightingInputLabel}>Heure</Text>
                <TouchableOpacity 
                  style={styles.dateTimeButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.dateTimeButtonText}>
                    {formatTime(selectedTime)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Sélecteurs natifs */}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}
            
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onTimeChange}
                is24Hour={true}
              />
            )}
            
            {/* Boutons de sélection rapide */}
            <View style={styles.quickTimeSection}>
              <Text style={styles.quickTimeLabel}>Ou choisissez rapidement :</Text>
              <View style={styles.quickTimeButtons}>
                {['À l\'instant', 'Il y a 30 min', 'Il y a 1h', 'Ce matin'].map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickTimeButton}
                    onPress={() => handleQuickTimeSelection(time)}
                  >
                    <Text style={styles.quickTimeButtonText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Section photo */}
        <View style={styles.sightingSection}>
          <Text style={styles.sightingSectionTitle}>📸 Photo de l'observation (optionnel)</Text>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoButton}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton}>
              <Text style={styles.photoIcon}>➕</Text>
              <Text style={styles.photoButtonText}>Depuis la galerie</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.photoHint}>
            💡 Même floue, une photo peut aider ! Évitez le flash si l'animal semble craintif.
          </Text>
        </View>

        {/* Section état de l'animal */}
        <View style={styles.sightingSection}>
          <Text style={styles.sightingSectionTitle}>🐾 État et comportement de l'animal</Text>
          
          {/* État physique */}
          <View style={styles.sightingInputGroup}>
            <Text style={styles.sightingInputLabel}>État physique apparent</Text>
            <View style={styles.radioContainer}>
              {[
                { value: 'healthy', label: '😊 En bonne santé' },
                { value: 'tired', label: '😔 Fatigué/faible' },
                { value: 'injured', label: '🤕 Blessé' },
                { value: 'uncertain', label: '❓ Incertain' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.radioOption,
                    physicalState === option.value && styles.radioOptionActive
                  ]}
                  onPress={() => setPhysicalState(option.value)}
                >
                  <Text style={[
                    styles.radioOptionText,
                    physicalState === option.value && styles.radioOptionTextActive
                  ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comportement observé */}
          <View style={styles.sightingInputGroup}>
            <Text style={styles.sightingInputLabel}>Comportement observé</Text>
            <View style={styles.checkboxContainer}>
              {[
                { key: 'approachable', label: 'Approchable et calme' },
                { key: 'fearful', label: 'Craintif, fuit à l\'approche' },
                { key: 'seekingFood', label: 'Semble chercher de la nourriture' },
                { key: 'respondsToName', label: 'Réagit à son nom' },
                { key: 'hasCollar', label: 'Porte un collier/harnais' }
              ].map((behavior) => (
                <TouchableOpacity
                  key={behavior.key}
                  style={styles.checkboxOptionSighting}
                  onPress={() => handleBehaviorChange(behavior.key)}
                >
                  <View style={[
                    styles.checkboxSighting,
                    behaviors[behavior.key] && styles.checkboxActiveSighting
                  ]}>
                    {behaviors[behavior.key] && (
                      <Text style={styles.checkboxCheck}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabelSighting}>{behavior.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Description libre */}
        <View style={styles.sightingSection}>
          <Text style={styles.sightingInputLabel}>Détails supplémentaires</Text>
          <TextInput
            style={styles.sightingTextArea}
            placeholder="Décrivez la situation : direction prise, avec qui était l'animal, autres détails importants..."
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Contact */}
        <View style={styles.sightingContactSection}>
          <Text style={styles.sightingContactTitle}>📞 Vos coordonnées (optionnel)</Text>
          <Text style={styles.sightingContactSubtitle}>
            Le propriétaire pourra vous contacter pour plus d'informations
          </Text>
          <View style={styles.contactInputs}>
            <TextInput
              style={styles.sightingTextInput}
              placeholder="Votre nom (optionnel)"
              value={contactName}
              onChangeText={setContactName}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.sightingTextInput}
              placeholder="Votre téléphone (optionnel)"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.sightingActionSection}>
          <TouchableOpacity 
            style={styles.sightingSubmitButton}
            onPress={handleSubmitSighting}
          >
            <Text style={styles.sightingSubmitButtonText}>📍 Envoyer le signalement</Text>
          </TouchableOpacity>
        </View>

        {/* Conseils */}
        <View style={styles.sightingTipsSection}>
          <Text style={styles.sightingTipsTitle}>💡 Conseils utiles</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Ne forcez pas l'approche si l'animal semble craintif</Text>
            <Text style={styles.tipItem}>• Notez les détails même s'ils semblent insignifiants</Text>
            <Text style={styles.tipItem}>• Surveillez la zone, l'animal pourrait revenir</Text>
            <Text style={styles.tipItem}>• Prévenez les commerces et voisins du quartier</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

// ========================================================================================
// ÉCRAN DE CRÉATION D'ANNONCE
// ========================================================================================

const CreateScreen = ({ onNavigateBack, selectedPet, editMode }) => {
  // États pour gérer les données du formulaire
  const [petName, setPetName] = useState(selectedPet?.petName || selectedPet?.name || '');
  const [petType, setPetType] = useState(selectedPet?.petType || selectedPet?.type || '');
  const [petBreed, setPetBreed] = useState(selectedPet?.race || '');
  const [petColors, setPetColors] = useState(selectedPet?.color || '');
  const [description, setDescription] = useState(selectedPet?.description || '');
  const [lossAddress, setLossAddress] = useState(selectedPet?.location || '');
  const [ownerPhone, setOwnerPhone] = useState(selectedPet?.phone || '');
  const [reward, setReward] = useState(selectedPet?.reward || '');

  // Gestion de la liste déroulante pour le type d'animal
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const petTypes = ['Chat', 'Chien', 'Mammifères', 'Oiseaux', 'Reptiles', 'Autres'];

  // Fonction pour soumettre l'annonce
  const handleSubmitAnnouncement = () => {
    console.log('Création d\'annonce:', {
      petName, petType, petBreed, petColors, description, 
      lossAddress, ownerPhone, reward
    });
    
    // Validation basique
    if (!petName || !petType || !petColors || !lossAddress || !ownerPhone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    Alert.alert(
      'Annonce créée !',
      `L'annonce pour ${petName} a été publiée avec succès.`,
      [{ text: 'OK', onPress: onNavigateBack }]
    );
  };

  // Fonction pour sélectionner un type d'animal
  const selectPetType = (type) => {
    setPetType(type);
    setShowTypeDropdown(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.createHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editMode ? 'Modifier l\'annonce' : 'Signaler une perte'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Section photos de l'animal */}
        <View style={styles.createSection}>
          <Text style={styles.createSectionTitle}>Photos de l'animal *</Text>
          <View style={styles.createPhotoGrid}>
            <TouchableOpacity style={styles.createMainPhotoButton}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.createPhotoButtonText}>Photo principale</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.createAdditionalPhotoButton}>
              <Text style={styles.photoIcon}>➕</Text>
              <Text style={styles.createPhotoButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations de base */}
        <View style={styles.createSection}>
          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Nom de l'animal *</Text>
            <TextInput
              style={styles.createTextInput}
              placeholder="Ex: Milo"
              value={petName}
              onChangeText={setPetName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.createInputRow}>
            <View style={styles.createInputHalf}>
              <Text style={styles.createInputLabel}>Type *</Text>
              <TouchableOpacity
                style={styles.createDropdownButton}
                onPress={() => setShowTypeDropdown(true)}
              >
                <Text style={[styles.createDropdownText, !petType && styles.createPlaceholderText]}>
                  {petType || 'Sélectionner un type'}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.createInputHalf}>
              <Text style={styles.createInputLabel}>Race</Text>
              <TextInput
                style={styles.createTextInput}
                placeholder="Ex: Européen"
                value={petBreed}
                onChangeText={setPetBreed}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Couleur(s) *</Text>
            <TextInput
              style={styles.createTextInput}
              placeholder="Ex: Roux et blanc"
              value={petColors}
              onChangeText={setPetColors}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Description et signes distinctifs</Text>
            <TextInput
              style={styles.createTextArea}
              placeholder="Décrivez votre animal : taille, comportement, collier, cicatrices..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Lieu de disparition */}
        <View style={styles.createSection}>
          <Text style={styles.createSectionTitle}>Lieu de disparition</Text>
          
          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Adresse *</Text>
            <TextInput
              style={styles.createTextInput}
              placeholder="Ex: Place Bellecour, Lyon"
              value={lossAddress}
              onChangeText={setLossAddress}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.createMapContainer}>
            <View style={styles.createMapPlaceholder}>
              <Text style={styles.mapIcon}>📍</Text>
              <Text style={styles.createMapPlaceholderText}>Localiser sur la carte</Text>
            </View>
            <TouchableOpacity style={styles.createMapButton}>
              <Text style={styles.createMapButtonText}>📍 Utiliser ma position</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations de contact */}
        <View style={styles.createSection}>
          <Text style={styles.createSectionTitle}>Vos informations de contact</Text>
          
          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Téléphone *</Text>
            <TextInput
              style={styles.createTextInput}
              placeholder="06 12 34 56 78"
              value={ownerPhone}
              onChangeText={setOwnerPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.createInputGroup}>
            <Text style={styles.createInputLabel}>Récompense (optionnel)</Text>
            <TextInput
              style={styles.createTextInput}
              placeholder="Ex: 50€"
              value={reward}
              onChangeText={setReward}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Conseils et informations */}
        <View style={styles.createTipsSection}>
          <Text style={styles.createTipsTitle}>💡 Conseils pour une annonce efficace</Text>
          <View style={styles.createTipsList}>
            <Text style={styles.createTipItem}>• Ajoutez plusieurs photos sous différents angles</Text>
            <Text style={styles.createTipItem}>• Décrivez tous les signes distinctifs (cicatrices, collier...)</Text>
            <Text style={styles.createTipItem}>• Indiquez le comportement habituel de votre animal</Text>
            <Text style={styles.createTipItem}>• Soyez précis sur le lieu et l'heure de disparition</Text>
            <Text style={styles.createTipItem}>• Vérifiez que votre numéro est correct</Text>
          </View>
        </View>

        {/* Bouton de soumission */}
        <View style={styles.createSubmitSection}>
          <TouchableOpacity 
            style={styles.createSubmitButton}
            onPress={handleSubmitAnnouncement}
          >
            <Text style={styles.createSubmitButtonText}>
              {editMode ? 'Enregistrer les modifications' : 'Publier l\'annonce'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal pour la liste déroulante */}
      <Modal
        visible={showTypeDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTypeDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.createModalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeDropdown(false)}
        >
          <View style={styles.createDropdownModal}>
            <Text style={styles.createDropdownTitle}>Sélectionner le type d'animal</Text>
            {petTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.createDropdownItem}
                onPress={() => selectPetType(type)}
              >
                <Text style={[
                  styles.createDropdownItemText,
                  petType === type && styles.createSelectedItemText
                ]}>
                  {type}
                </Text>
                {petType === type && (
                  <Text style={styles.createCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ========================================================================================
// ÉCRAN DES MESSAGES
// ========================================================================================

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
      status: "active",
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
    }
  ]);

  // Fonction pour naviguer vers le chat
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
      <View style={styles.messagesHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.messagesHeaderTitleContainer}>
            <Text style={styles.headerTitle}>Messages</Text>
            {unreadCount > 0 && (
              <View style={styles.messagesUnreadBadge}>
                <Text style={styles.messagesUnreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.messagesStatsSection}>
        <View style={styles.messagesStatsCard}>
          <Text style={styles.messagesStatsNumber}>{participatingAnnouncements.length}</Text>
          <Text style={styles.messagesStatsLabel}>Recherches actives</Text>
        </View>
        <View style={styles.messagesStatsCard}>
          <Text style={styles.messagesStatsNumber}>{unreadCount}</Text>
          <Text style={styles.messagesStatsLabel}>Messages non lus</Text>
        </View>
        <View style={styles.messagesStatsCard}>
          <Text style={styles.messagesStatsNumberGreen}>
            {participatingAnnouncements.filter(a => a.status === 'found').length}
          </Text>
          <Text style={styles.messagesStatsLabel}>Animaux retrouvés</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesConversationsList} showsVerticalScrollIndicator={false}>
        {/* En-tête de section */}
        <View style={styles.messagesSectionHeader}>
          <Text style={styles.messagesSectionTitle}>Mes participations ({participatingAnnouncements.length})</Text>
          <Text style={styles.messagesSectionSubtitle}>
            Annonces auxquelles vous participez
          </Text>
        </View>

        {/* Liste des conversations */}
        {participatingAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            style={[
              styles.messagesConversationCard,
              announcement.lastMessage.unread && styles.messagesConversationCardUnread
            ]}
            onPress={() => handleOpenChat(announcement)}
          >
            {/* Indicateur non lu */}
            {announcement.lastMessage.unread && (
              <View style={styles.messagesUnreadIndicator} />
            )}

            <View style={styles.messagesConversationContent}>
              {/* Image et infos de l'animal */}
              <View style={styles.messagesPetInfoSection}>
                <Text style={styles.messagesPetImage}>{announcement.petImage}</Text>
                <View style={styles.messagesPetDetails}>
                  <View style={styles.messagesPetHeader}>
                    <Text style={styles.messagesPetName}>{announcement.petName}</Text>
                    <View style={[
                      styles.messagesStatusBadge,
                      { backgroundColor: `${getStatusColor(announcement.status)}15` }
                    ]}>
                      <Text style={[
                        styles.messagesStatusText,
                        { color: getStatusColor(announcement.status) }
                      ]}>
                        {getStatusText(announcement.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.messagesPetMetadata}>
                    <Text style={styles.messagesOwnerName}>{announcement.owner}</Text>
                    <Text style={styles.messagesSeparator}>•</Text>
                    <Text style={styles.messagesLocation}>{announcement.location}</Text>
                  </View>
                  
                  <View style={styles.messagesParticipationInfo}>
                    <Text style={styles.participationIcon}>👥</Text>
                    <Text style={styles.messagesParticipationText}>
                      {announcement.participants} participants
                    </Text>
                    <Text style={styles.messagesSeparator}>•</Text>
                    <Text style={styles.messagesJoinedDate}>
                      Rejoint {announcement.joinedDate}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Dernier message */}
              <View style={styles.messagesMessagePreview}>
                <View style={styles.messagesMessageContent}>
                  <Text 
                    style={[
                      styles.messagesMessageText,
                      announcement.lastMessage.unread && styles.messagesMessageTextUnread
                    ]}
                    numberOfLines={2}
                  >
                    {announcement.lastMessage.text}
                  </Text>
                  
                  <View style={styles.messagesMessageMetadata}>
                    <Text style={styles.timeIcon}>🕐</Text>
                    <Text style={styles.messagesMessageTime}>
                      {announcement.lastMessage.time}
                    </Text>
                  </View>
                </View>
                
                {/* Icône de message */}
                <View style={styles.messagesMessageIcon}>
                  <Text style={styles.messageIconEmoji}>💬</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Message d'information */}
        <View style={styles.messagesInfoSection}>
          <Text style={styles.messagesInfoTitle}>💡 Comment ça marche ?</Text>
          <View style={styles.messagesInfoList}>
            <Text style={styles.messagesInfoItem}>
              • Les messages restent accessibles tant que l'annonce est active
            </Text>
            <Text style={styles.messagesInfoItem}>
              • Vous recevez les notifications des nouveaux messages
            </Text>
            <Text style={styles.messagesInfoItem}>
              • Partagez vos observations et coordonnez les recherches
            </Text>
            <Text style={styles.messagesInfoItem}>
              • Célébrez ensemble quand l'animal est retrouvé !
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

// ========================================================================================
// ÉCRAN DE CHAT
// ========================================================================================

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
      text: "SIGNALEMENT : Je pense avoir vu un chat qui correspond à la description près du pont Wilson ce matin vers 8h !",
      sender: 'participant',
      senderName: 'Lucas P.',
      time: 'Il y a 1 jour',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isSignaling: true,
    },
    {
      id: 6,
      text: "Merci Lucas ! Je vais aller voir là-bas. Quelqu'un peut m'accompagner ?",
      sender: 'owner',
      senderName: 'Marie L.',
      time: 'Il y a 1 jour',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
    }
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
    Alert.alert('Appel', `Appel vers le propriétaire`);
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
      <View style={styles.chatHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.chatAnnouncementInfo}>
            <Text style={styles.chatPetEmoji}>{selectedAnnouncement.petImage}</Text>
            <View style={styles.chatAnnouncementDetails}>
              <Text style={styles.chatAnnouncementTitle}>
                Recherche de {selectedAnnouncement.petName}
              </Text>
              <Text style={styles.chatAnnouncementSubtitle}>
                {selectedAnnouncement.participants} participants • {selectedAnnouncement.owner}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleCallOwner} style={styles.chatPhoneButton}>
            <Text style={styles.phoneIcon}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* Boutons d'actions rapides */}
        <View style={styles.chatQuickActionsHeader}>
          <TouchableOpacity 
            style={styles.chatQuickActionButton}
            onPress={handleReportSighting}
          >
            <Text style={styles.signalIcon}>📍</Text>
            <Text style={styles.chatQuickActionText}>Signaler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatQuickActionButton}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.chatQuickActionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatQuickActionButton}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.chatQuickActionText}>Détails</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatMessagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatMessagesContent}
      >
        {messages.map((message, index) => {
          const isUser = message.sender === 'user';
          const isOwner = message.sender === 'owner';
          const showSenderName = index === 0 || messages[index - 1].sender !== message.sender;

          return (
            <View key={message.id} style={styles.chatMessageGroup}>
              {showSenderName && !isUser && (
                <View style={styles.chatSenderInfo}>
                  <View 
                    style={[
                      styles.chatSenderDot,
                      { backgroundColor: getSenderColor(message.sender) }
                    ]} 
                  />
                  <Text 
                    style={[
                      styles.chatSenderName,
                      isOwner && styles.chatSenderNameOwner
                    ]}
                  >
                    {message.senderName}
                    {isOwner && ' (Propriétaire)'}
                  </Text>
                </View>
              )}
              
              <View 
                style={[
                  styles.chatMessageContainer,
                  isUser ? styles.chatUserMessage : styles.chatOtherMessage,
                  message.isSignaling && styles.chatSignalingMessage
                ]}
              >
                {message.isSignaling && (
                  <View style={styles.chatSignalingHeader}>
                    <Text style={styles.signalIcon}>📍</Text>
                    <Text style={styles.chatSignalingLabel}>SIGNALEMENT</Text>
                  </View>
                )}
                
                <Text 
                  style={[
                    styles.chatMessageText,
                    isUser ? styles.chatUserMessageText : styles.chatOtherMessageText,
                    message.isSignaling && styles.chatSignalingMessageText
                  ]}
                >
                  {message.text}
                </Text>
                
                <Text 
                  style={[
                    styles.chatMessageTime,
                    isUser ? styles.chatUserMessageTime : styles.chatOtherMessageTime
                  ]}
                >
                  {message.time}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Indicateur de frappe */}
        <View style={styles.chatTypingIndicator}>
          <Text style={styles.chatTypingText}>Marie L. est en train d'écrire...</Text>
        </View>
      </ScrollView>

      {/* Zone de saisie */}
      <View style={styles.chatInputContainer}>
        <View style={styles.chatInputWrapper}>
          <TextInput
            style={styles.chatMessageInput}
            placeholder="Tapez votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            placeholderTextColor="#9CA3AF"
          />
          
          <TouchableOpacity 
            style={[
              styles.chatSendButton,
              newMessage.trim() ? styles.chatSendButtonActive : styles.chatSendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
        
        {/* Compteur de caractères */}
        <Text style={styles.chatCharacterCount}>
          {newMessage.length}/500
        </Text>
      </View>
    </View>
  );
};

// ========================================================================================
// ÉCRAN DE PROFIL
// ========================================================================================

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
    }
  };

  // Fonction pour gérer les actions de paramètres
  const handleSettingPress = (setting) => {
    console.log(`Paramètre sélectionné: ${setting}`);
    Alert.alert('Paramètres', `Configuration: ${setting}`);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    console.log('Déconnexion demandée');
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header avec dégradé */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        style={styles.profileHeader}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.profileBackButton}>
            <Text style={styles.backArrowWhite}>←</Text>
          </TouchableOpacity>
          <Text style={styles.profileHeaderTitle}>Mon Profil</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Profil utilisateur */}
        <View style={styles.profileHeaderInfo}>
          <Text style={styles.profileAvatar}>{userProfile.avatar}</Text>
          <Text style={styles.profileUserName}>{userProfile.name}</Text>
          <Text style={styles.profileUserLocation}>{userProfile.location}</Text>
          <View style={styles.profileLevelBadge}>
            <Text style={styles.profileLevelText}>
              {userProfile.level} • Niveau {userProfile.levelNumber}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.profileScrollContainer} showsVerticalScrollIndicator={false}>
        {/* Barre de progression de niveau */}
        <View style={styles.profileProgressSection}>
          <View style={styles.profileProgressCard}>
            <View style={styles.profileProgressHeader}>
              <Text style={styles.profileProgressTitle}>
                Progression vers le niveau {userProfile.levelNumber + 1}
              </Text>
              <Text style={styles.profileProgressPoints}>
                {userProfile.totalPoints}/{userProfile.nextLevelPoints} pts
              </Text>
            </View>
            
            <View style={styles.profileProgressBarContainer}>
              <View 
                style={[
                  styles.profileProgressBar,
                  { width: `${(userProfile.totalPoints / userProfile.nextLevelPoints) * 100}%` }
                ]}
              />
            </View>
            
            <Text style={styles.profileProgressHint}>
              Plus que {userProfile.nextLevelPoints - userProfile.totalPoints} points pour devenir "Légende des Animaux" !
            </Text>
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.profileQuickStatsSection}>
          <View style={styles.profileQuickStatsGrid}>
            <View style={styles.profileQuickStatCard}>
              <Text style={styles.profileQuickStatNumber}>{userProfile.stats.animalsFound}</Text>
              <Text style={styles.profileQuickStatLabel}>Animaux retrouvés</Text>
              <Text style={styles.profileQuickStatBadge}>🏆 Top 5% des utilisateurs</Text>
            </View>
            
            <View style={styles.profileQuickStatCard}>
              <Text style={styles.profileQuickStatNumberPurple}>{userProfile.stats.searchesParticipated}</Text>
              <Text style={styles.profileQuickStatLabel}>Recherches aidées</Text>
              <Text style={styles.profileQuickStatBadgeBlue}>🔥 {userProfile.stats.streakDays} jours d'activité</Text>
            </View>
          </View>
        </View>

        {/* Statistiques détaillées */}
        <View style={styles.profileDetailedStatsSection}>
          <Text style={styles.profileSectionTitle}>📊 Mes statistiques</Text>
          
          <View style={styles.profileStatsGrid}>
            <View style={styles.profileStatRow}>
              <View style={styles.profileStatIcon}>
                <Text style={styles.profileStatEmoji}>⏰</Text>
              </View>
              <Text style={styles.profileStatLabel}>Heures bénévoles</Text>
              <Text style={styles.profileStatValue}>{userProfile.stats.hoursVolunteered}h</Text>
            </View>
            
            <View style={styles.profileStatRow}>
              <View style={styles.profileStatIcon}>
                <Text style={styles.profileStatEmoji}>❤️</Text>
              </View>
              <Text style={styles.profileStatLabel}>Remerciements reçus</Text>
              <Text style={styles.profileStatValue}>{userProfile.stats.thanksReceived}</Text>
            </View>
            
            <View style={styles.profileStatRow}>
              <View style={styles.profileStatIcon}>
                <Text style={styles.profileStatEmoji}>🏅</Text>
              </View>
              <Text style={styles.profileStatLabel}>Badges obtenus</Text>
              <Text style={styles.profileStatValue}>{userProfile.stats.badgesEarned}</Text>
            </View>
            
            <View style={styles.profileStatRow}>
              <View style={styles.profileStatIcon}>
                <Text style={styles.profileStatEmoji}>📅</Text>
              </View>
              <Text style={styles.profileStatLabel}>Membre depuis</Text>
              <Text style={styles.profileStatValue}>{userProfile.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Section badges */}
        <View style={styles.profileBadgesSection}>
          <Text style={styles.profileSectionTitle}>🏆 Mes badges (6/9)</Text>
          
          <View style={styles.profileBadgesGrid}>
            {[
              { name: "Première Recherche", icon: "🔍", earned: true },
              { name: "Sauveur de Chat", icon: "🐱", earned: true },
              { name: "Héros du Quartier", icon: "🏙️", earned: true },
              { name: "Ami des Chiens", icon: "🐕", earned: true },
              { name: "Photographe", icon: "📸", earned: true },
              { name: "Communicant", icon: "💬", earned: true },
              { name: "Marathonien", icon: "🏃", earned: false },
              { name: "Ange Gardien", icon: "👼", earned: false },
              { name: "Influenceur", icon: "📢", earned: false }
            ].map((badge, index) => (
              <View 
                key={index} 
                style={[
                  styles.profileBadgeCard,
                  badge.earned ? styles.profileBadgeCardEarned : styles.profileBadgeCardLocked
                ]}
              >
                <Text style={[
                  styles.profileBadgeIcon,
                  !badge.earned && styles.profileBadgeIconGray
                ]}>
                  {badge.icon}
                </Text>
                <Text style={[
                  styles.profileBadgeName,
                  badge.earned ? styles.profileBadgeNameEarned : styles.profileBadgeNameLocked
                ]}>
                  {badge.name}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Prochain badge */}
          <View style={styles.profileNextBadgeHint}>
            <Text style={styles.profileNextBadgeText}>
              <Text style={styles.profileNextBadgeLabel}>Prochain badge:</Text> "Marathonien" 🏃
            </Text>
            <Text style={styles.profileNextBadgeDescription}>
              Participez à une recherche de plus de 5h pour le débloquer!
            </Text>
          </View>
        </View>

        {/* Activité récente */}
        <View style={styles.profileActivitySection}>
          <Text style={styles.profileSectionTitle}>📋 Activité récente</Text>
          
          <View style={styles.profileActivityList}>
            {[
              { action: "A participé à la recherche de", animal: "Bella", type: "🐕", points: "+50", time: "Il y a 2h" },
              { action: "A signalé avoir vu", animal: "Rocky", type: "🐱", points: "+25", time: "Hier" },
              { action: "A créé une annonce pour", animal: "Minou", type: "🐱", points: "+10", time: "Il y a 3 jours" },
              { action: "Badge obtenu:", animal: "Ami des Chiens", type: "🏆", points: "+100", time: "Il y a 5 jours" }
            ].map((activity, index) => (
              <View key={index} style={styles.profileActivityItem}>
                <View style={styles.profileActivityLeft}>
                  <Text style={styles.profileActivityEmoji}>{activity.type}</Text>
                  <View style={styles.profileActivityContent}>
                    <Text style={styles.profileActivityDescription}>
                      {activity.action} <Text style={styles.profileActivityAnimal}>{activity.animal}</Text>
                    </Text>
                    <Text style={styles.profileActivityTime}>{activity.time}</Text>
                  </View>
                </View>
                <View style={styles.profileActivityPoints}>
                  <Text style={styles.profileActivityPointsText}>
                    {activity.points}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Classement mensuel */}
        <View style={styles.profileLeaderboardSection}>
          <Text style={styles.profileLeaderboardTitle}>👑 Classement mensuel</Text>
          
          <View style={styles.profileLeaderboardContent}>
            <View style={styles.profileLeaderboardLeft}>
              <Text style={styles.profileLeaderboardSubtitle}>Votre position ce mois-ci</Text>
              <Text style={styles.profileLeaderboardPosition}>#12 sur 1,247</Text>
              <Text style={styles.profileLeaderboardTrend}>↗ +3 places cette semaine</Text>
            </View>
            <TouchableOpacity style={styles.profileLeaderboardButton}>
              <Text style={styles.profileLeaderboardButtonText}>Voir le classement</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Paramètres */}
        <View style={styles.profileSettingsSection}>
          <Text style={styles.profileSectionTitle}>⚙️ Paramètres</Text>
          
          <View style={styles.profileSettingsList}>
            <TouchableOpacity 
              style={styles.profileSettingItem}
              onPress={() => handleSettingPress('notifications')}
            >
              <Text style={styles.profileSettingText}>📱 Notifications et alertes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileSettingItem}
              onPress={() => handleSettingPress('zone')}
            >
              <Text style={styles.profileSettingText}>🌍 Zone de recherche préférée</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileSettingItem}
              onPress={() => handleSettingPress('privacy')}
            >
              <Text style={styles.profileSettingText}>🔒 Confidentialité</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileSettingItem}
              onPress={() => handleSettingPress('help')}
            >
              <Text style={styles.profileSettingText}>❓ Aide et support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileSettingItemDanger}
              onPress={handleLogout}
            >
              <Text style={styles.profileSettingTextDanger}>🚪 Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

// ========================================================================================
// ÉCRAN MES ANIMAUX
// ========================================================================================

const MyAnimalsScreen = ({ 
  onNavigateBack, 
  onNavigateToCreate, 
  onNavigateToEdit, 
  onNavigateToMessages 
}) => {
  const [activeTab, setActiveTab] = useState('active');
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
      status: "active",
      participants: 15,
      sightings: 4,
      messages: 23,
      reward: "75€",
      views: 247,
      lastActivity: "Il y a 2h"
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
      status: "active",
      participants: 28,
      sightings: 12,
      messages: 45,
      reward: "150€",
      views: 532,
      lastActivity: "Il y a 30 min"
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
      status: "found",
      participants: 22,
      sightings: 8,
      messages: 67,
      reward: "100€",
      views: 398,
      foundDate: "Il y a 3 jours"
    }
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
    setShowCloseModal(false);
    setSelectedAnnouncement(null);
    Alert.alert('Félicitations !', 'Animal marqué comme retrouvé !');
  };

  const handleAbandonSearch = () => {
    console.log('Recherche abandonnée:', selectedAnnouncement.petName);
    setShowCloseModal(false);
    setSelectedAnnouncement(null);
    Alert.alert('Recherche arrêtée', 'La recherche a été suspendue.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.myAnimalsHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes animaux</Text>
          <TouchableOpacity onPress={onNavigateToCreate} style={styles.myAnimalsAddButton}>
            <Text style={styles.addIcon}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.myAnimalsStatsSection}>
        <View style={styles.myAnimalsStatsCard}>
          <Text style={styles.myAnimalsStatsNumber}>{myAnnouncements.length}</Text>
          <Text style={styles.myAnimalsStatsLabel}>Total annonces</Text>
        </View>
        <View style={styles.myAnimalsStatsCard}>
          <Text style={styles.myAnimalsStatsNumberBlue}>{getCountByStatus('active')}</Text>
          <Text style={styles.myAnimalsStatsLabel}>En recherche</Text>
        </View>
        <View style={styles.myAnimalsStatsCard}>
          <Text style={styles.myAnimalsStatsNumberGreen}>{getCountByStatus('found')}</Text>
          <Text style={styles.myAnimalsStatsLabel}>Retrouvés</Text>
        </View>
      </View>

      {/* Onglets */}
      <View style={styles.myAnimalsTabsContainer}>
        <TouchableOpacity 
          style={[styles.myAnimalsTab, activeTab === 'active' && styles.myAnimalsTabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.myAnimalsTabText, activeTab === 'active' && styles.myAnimalsTabTextActive]}>
            Actives ({getCountByStatus('active')})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.myAnimalsTab, activeTab === 'found' && styles.myAnimalsTabActive]}
          onPress={() => setActiveTab('found')}
        >
          <Text style={[styles.myAnimalsTabText, activeTab === 'found' && styles.myAnimalsTabTextActive]}>
            Retrouvées ({getCountByStatus('found')})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.myAnimalsAnnouncementsList} showsVerticalScrollIndicator={false}>
        {getFilteredAnnouncements().map((announcement) => (
          <View key={announcement.id} style={styles.myAnimalsAnnouncementCard}>
            <View style={styles.myAnimalsAnnouncementContent}>
              {/* En-tête avec animal */}
              <View style={styles.myAnimalsAnnouncementHeader}>
                <View style={styles.myAnimalsPetInfo}>
                  <Text style={styles.myAnimalsPetEmoji}>{announcement.petImage}</Text>
                  <View style={styles.myAnimalsPetDetails}>
                    <Text style={styles.myAnimalsPetName}>{announcement.petName}</Text>
                    <Text style={styles.myAnimalsPetMetadata}>
                      {announcement.petType} • {announcement.race} • {announcement.color}
                    </Text>
                    <Text style={styles.myAnimalsLocationInfo}>
                      {announcement.location} • {announcement.lostDate}
                    </Text>
                  </View>
                </View>
                
                {/* Statut */}
                <View style={[
                  styles.myAnimalsStatusBadge,
                  announcement.status === 'active' && styles.myAnimalsStatusActive,
                  announcement.status === 'found' && styles.myAnimalsStatusFound
                ]}>
                  <Text style={[
                    styles.myAnimalsStatusText,
                    announcement.status === 'active' && styles.myAnimalsStatusTextActive,
                    announcement.status === 'found' && styles.myAnimalsStatusTextFound
                  ]}>
                    {announcement.status === 'active' && '🔍 Active'}
                    {announcement.status === 'found' && '✅ Retrouvé'}
                  </Text>
                </View>
              </View>

              {/* Statistiques de l'annonce */}
              <View style={styles.myAnimalsAnnouncementStats}>
                <View style={styles.myAnimalsStatItem}>
                  <Text style={styles.statIcon}>👥</Text>
                  <Text style={styles.myAnimalsStatText}>{announcement.participants} participants</Text>
                </View>
                
                <View style={styles.myAnimalsStatItem}>
                  <Text style={styles.messageIconEmoji}>💬</Text>
                  <Text style={styles.myAnimalsStatText}>{announcement.messages} messages</Text>
                </View>
                
                <View style={styles.myAnimalsStatItem}>
                  <Text style={styles.eyeIcon}>👁</Text>
                  <Text style={styles.myAnimalsStatText}>{announcement.views} vues</Text>
                </View>
              </View>

              {/* Informations supplémentaires */}
              <View style={styles.myAnimalsAdditionalInfo}>
                <Text style={styles.myAnimalsRewardInfo}>Récompense: {announcement.reward}</Text>
                <Text style={styles.myAnimalsLastActivity}>
                  Dernière activité: {announcement.lastActivity}
                </Text>
                {announcement.status === 'found' && (
                  <Text style={styles.myAnimalsFoundInfo}>
                    Retrouvé {announcement.foundDate} 🎉
                  </Text>
                )}
              </View>

              {/* Actions */}
              <View style={styles.myAnimalsActionsContainer}>
                {announcement.status === 'active' && (
                  <>
                    <TouchableOpacity 
                      style={styles.myAnimalsActionButtonPrimary}
                      onPress={() => handleViewMessages(announcement)}
                    >
                      <Text style={styles.myAnimalsActionButtonTextPrimary}>💬 Messages</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.myAnimalsActionButtonSecondary}
                      onPress={() => handleEditAnnouncement(announcement)}
                    >
                      <Text style={styles.myAnimalsActionButtonTextSecondary}>✏️ Modifier</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.myAnimalsActionButtonSuccess}
                      onPress={() => handleCloseAnnouncement(announcement)}
                    >
                      <Text style={styles.myAnimalsActionButtonTextSuccess}>✅ Clôturer</Text>
                    </TouchableOpacity>
                  </>
                )}

                {announcement.status === 'found' && (
                  <TouchableOpacity 
                    style={styles.myAnimalsActionButtonSecondary}
                    onPress={() => handleViewMessages(announcement)}
                  >
                    <Text style={styles.myAnimalsActionButtonTextSecondary}>💬 Voir messages</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}

        {/* Message si aucune annonce */}
        {getFilteredAnnouncements().length === 0 && (
          <View style={styles.myAnimalsEmptyState}>
            <Text style={styles.myAnimalsEmptyStateEmoji}>
              {activeTab === 'active' && '🔍'}
              {activeTab === 'found' && '🎉'}
            </Text>
            <Text style={styles.myAnimalsEmptyStateTitle}>
              {activeTab === 'active' && 'Aucune recherche active'}
              {activeTab === 'found' && 'Aucun animal retrouvé'}
            </Text>
            <Text style={styles.myAnimalsEmptyStateSubtitle}>
              {activeTab === 'active' && 'Créez votre première annonce si votre animal est perdu'}
              {activeTab === 'found' && 'Les animaux que vous retrouverez apparaîtront ici'}
            </Text>
            {activeTab === 'active' && (
              <TouchableOpacity 
                style={styles.myAnimalsEmptyStateButton}
                onPress={onNavigateToCreate}
              >
                <Text style={styles.myAnimalsEmptyStateButtonText}>➕ Créer une annonce</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
            
            <View style={styles.myAnimalsModalActions}>
              <TouchableOpacity 
                style={styles.myAnimalsModalButtonFound}
                onPress={handleFoundAnimal}
              >
                <Text style={styles.myAnimalsModalButtonFoundText}>
                  🎉 Animal retrouvé !
                </Text>
                <Text style={styles.myAnimalsModalButtonSubtext}>
                  Marquer comme retrouvé avec succès
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.myAnimalsModalButtonAbandon}
                onPress={handleAbandonSearch}
              >
                <Text style={styles.myAnimalsModalButtonAbandonText}>
                  😔 Arrêter les recherches
                </Text>
                <Text style={styles.myAnimalsModalButtonSubtext}>
                  Suspendre la recherche sans succès
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.myAnimalsModalButtonCancel}
              onPress={() => {
                setShowCloseModal(false);
                setSelectedAnnouncement(null);
              }}
            >
              <Text style={styles.myAnimalsModalButtonCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// ========================================================================================
// COMPOSANT PRINCIPAL DE L'APPLICATION
// ========================================================================================

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

  // Fonctions de navigation
  const handleNavigateToProfile = () => {
    console.log('Navigation vers le profil');
    setCurrentScreen('profile');
  };

  const handleNavigateToDetail = (pet) => {
    console.log('Navigation vers le détail de:', pet.name);
    setSelectedPet(pet);
    setCurrentScreen('detail');
  };

  const handleNavigateToCreate = () => {
    console.log('Navigation vers la création d\'annonce');
    setCurrentScreen('create');
  };

  const handleNavigateToSighting = (pet) => {
    console.log('Navigation vers signalement pour:', pet.name);
    setSelectedPet(pet);
    setCurrentScreen('sighting');
  };

  const handleNavigateToMessages = () => {
    console.log('Navigation vers les messages');
    setCurrentScreen('messages');
  };

  const handleNavigateToChat = (announcement) => {
    console.log('Navigation vers chat pour:', announcement.petName);
    setSelectedAnnouncement(announcement);
    setCurrentScreen('chat');
  };

  const handleNavigateToMyAnimals = () => {
    console.log('Navigation vers mes animaux');
    setCurrentScreen('myanimals');
  };

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
              setCurrentScreen('create');
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