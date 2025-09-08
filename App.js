// App.js - Avec écran d'authentification complet
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

// Composants UI intégrés
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

// Écran d'authentification
const AuthScreen = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' ou 'register'
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
  
  // États des checkboxes
  const [preferences, setPreferences] = useState({
    newAds: true,
    sightings: true,
    newsletter: false
  });
  
  const [agreements, setAgreements] = useState({
    terms: false,
    partners: false
  });

  // Mise à jour des champs
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Toggle des préférences
  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle des accords
  const toggleAgreement = (key) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Validation basique
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }

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

  // Simulation de connexion/inscription
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simuler un délai réseau
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

  // Connexion sociale simulée
  const handleSocialLogin = (provider) => {
    Alert.alert(
      `Connexion ${provider}`, 
      'Fonctionnalité en développement',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Simuler connexion', onPress: onLogin }
      ]
    );
  };

  // Composant Checkbox personnalisé
  const CheckboxItem = ({ checked, onToggle, children, style = {} }) => (
    <TouchableOpacity 
      style={[checkboxStyles.item, style]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[checkboxStyles.checkbox, checked && checkboxStyles.checkboxChecked]}>
        {checked && <Text style={checkboxStyles.checkmark}>✓</Text>}
      </View>
      <Text style={checkboxStyles.text}>{children}</Text>
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
        <View style={styles.header}>
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
                style={[
                  styles.tab,
                  authMode === 'login' && styles.activeTab
                ]}
                onPress={() => setAuthMode('login')}
              >
                <Text style={[
                  styles.tabText,
                  authMode === 'login' && styles.activeTabText
                ]}>
                  Connexion
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.tab,
                  authMode === 'register' && styles.activeTab
                ]}
                onPress={() => setAuthMode('register')}
              >
                <Text style={[
                  styles.tabText,
                  authMode === 'register' && styles.activeTabText
                ]}>
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

                <View style={styles.options}>
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
                    <Text style={styles.errorText}>{errors.terms}</Text>
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

            {/* Séparateur */}
            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>Ou continuer avec</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Boutons réseaux sociaux */}
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Text style={styles.socialIcon}>🔵</Text>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
              >
                <Text style={styles.socialIcon}>🔧</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                En continuant, vous aidez à créer une communauté solidaire pour nos animaux 🐾
              </Text>
            </View>
          </Card>

          {/* Statistiques en bas */}
          <View style={styles.stats}>
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

// Écran simple après connexion
const HomeTestScreen = ({ onLogout }) => (
  <View style={styles.homeContainer}>
    <Text style={styles.homeTitle}>🎉 Connexion réussie !</Text>
    <Text style={styles.homeSubtitle}>Bienvenue dans PetFinder</Text>
    
    <View style={styles.homeCard}>
      <Text style={styles.homeCardText}>✅ Écran d'authentification fonctionnel</Text>
      <Text style={styles.homeCardText}>✅ Navigation entre écrans</Text>
      <Text style={styles.homeCardText}>✅ Gestion d'état avancée</Text>
      <Text style={styles.homeCardText}>✅ Validation de formulaires</Text>
    </View>
    
    <Button
      title="Se déconnecter"
      onPress={onLogout}
      style={{ marginTop: 20 }}
    />
  </View>
);

// App principal avec navigation
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <HomeTestScreen onLogout={handleLogout} />
      ) : (
        <AuthScreen onLogin={handleLogin} />
      )}
    </>
  );
}

// Styles pour les composants
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

const checkboxStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
});

// Styles principaux
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
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
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formCard: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#2563eb',
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  options: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },
  forgotPassword: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  preferencesCard: {
    backgroundColor: '#dbeafe',
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 16,
  },
  preferencesList: {
    gap: 0,
  },
  agreementsSection: {
    marginTop: 16,
  },
  agreementItem: {
    marginBottom: 8,
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginBottom: 8,
    marginLeft: 32,
  },
  mainButton: {
    marginBottom: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  separatorText: {
    paddingHorizontal: 16,
    color: '#6b7280',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  socialIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  // Styles pour l'écran d'accueil après connexion
  homeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  homeSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
  },
  homeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  homeCardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
});