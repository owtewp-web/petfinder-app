// App.js - Avec composants UI réintégrés
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Composants UI intégrés directement dans App.js
import {
  View as RNView,
  Text as RNText,
  TextInput,
  TouchableOpacity,
  ActivityIndicator 
} from 'react-native';

// Composant Button simple
const Button = ({ title, onPress, loading = false, style = {} }) => (
  <TouchableOpacity
    style={[buttonStyles.button, style]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" size="small" />
    ) : (
      <Text style={buttonStyles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

// Composant Input simple
const Input = ({ label, value, onChangeText, placeholder, style = {} }) => (
  <View style={[inputStyles.container, style]}>
    {label && <Text style={inputStyles.label}>{label}</Text>}
    <TextInput
      style={inputStyles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

// Écran de test avec vos composants
const TestScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Button pressed!', inputValue);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 PetFinder</Text>
        <Text style={styles.subtitle}>Test des composants UI</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Build réussi !</Text>
          <Text style={styles.cardText}>• APK généré avec succès</Text>
          <Text style={styles.cardText}>• GitHub synchronisé</Text>
          <Text style={styles.cardText}>• Composants UI fonctionnels</Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>Test des composants :</Text>
          
          <Input
            label="Test Input"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Tapez quelque chose..."
          />
          
          <Button
            title={loading ? "Chargement..." : "Test Button"}
            onPress={handleButtonPress}
            loading={loading}
            style={{ marginTop: 16 }}
          />
        </View>

        <View style={styles.nextSteps}>
          <Text style={styles.sectionTitle}>Prochaines étapes :</Text>
          <Text style={styles.stepText}>1. Tester cet APK</Text>
          <Text style={styles.stepText}>2. Ajouter l'écran d'authentification</Text>
          <Text style={styles.stepText}>3. Ajouter l'écran d'accueil</Text>
          <Text style={styles.stepText}>4. Intégrer tous les écrans</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default function App() {
  return (
    <>
      <TestScreen />
      <StatusBar style="auto" />
    </>
  );
}

// Styles pour les composants Button et Input
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
});

// Styles principaux
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#3B82F6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: 20,
  },
  card: {
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
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  testSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  nextSteps: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
});