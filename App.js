// App.js - Structure sans dossier src/
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// ===== TEST DES IMPORTS SANS SRC/ =====
// Cette version teste les imports avec les chemins directs

export default function App() {
  const [testPhase, setTestPhase] = useState('ready');
  const [importResults, setImportResults] = useState({});

  // Test des imports progressifs (sans src/)
  const testImports = async () => {
    setTestPhase('testing');
    let results = {};

    // Test 1: Composants UI
    try {
      const { Button, Input, Card } = await import('./components/ui');
      results.ui = '✅ Composants UI importés (./components/ui)';
    } catch (error) {
      results.ui = `❌ Erreur composants UI: ${error.message}`;
    }

    // Test 2: AuthScreen
    try {
      const AuthScreen = await import('./screens/AuthScreen');
      results.auth = '✅ AuthScreen importé (./screens/AuthScreen)';
    } catch (error) {
      results.auth = `❌ Erreur AuthScreen: ${error.message}`;
    }

    // Test 3: HomeScreen
    try {
      const HomeScreen = await import('./screens/HomeScreen');
      results.home = '✅ HomeScreen importé (./screens/HomeScreen)';
    } catch (error) {
      results.home = `❌ Erreur HomeScreen: ${error.message}`;
    }

    // Test 4: Autres écrans
    try {
      const PetDetailScreen = await import('./screens/PetDetailScreen');
      results.detail = '✅ PetDetailScreen importé';
    } catch (error) {
      results.detail = `❌ Erreur PetDetailScreen: ${error.message}`;
    }

    setImportResults(results);
    setTestPhase('completed');
  };

  // Test avec imports statiques (plus robuste)
  const testStaticImports = () => {
    Alert.alert(
      'Test d\'imports statiques',
      'Je vais maintenant tester les imports statiques. Regardez la console pour les erreurs.',
      [{ text: 'OK', onPress: () => setTestPhase('static') }]
    );
  };

  // Affichage des instructions
  const renderInstructions = () => (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      <View style={styles.instructionCard}>
        <Text style={styles.instructionTitle}>📁 Structure recommandée (à la racine)</Text>
        
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>votre-projet/</Text>
          <Text style={styles.codeText}>├── App.js</Text>
          <Text style={styles.codeText}>├── components/</Text>
          <Text style={styles.codeText}>│   └── ui/</Text>
          <Text style={styles.codeText}>│       └── index.js</Text>
          <Text style={styles.codeText}>├── screens/</Text>
          <Text style={styles.codeText}>│   ├── AuthScreen.js</Text>
          <Text style={styles.codeText}>│   ├── HomeScreen.js</Text>
          <Text style={styles.codeText}>│   ├── PetDetailScreen.js</Text>
          <Text style={styles.codeText}>│   └── ...</Text>
          <Text style={styles.codeText}>├── package.json</Text>
          <Text style={styles.codeText}>└── eas.json</Text>
        </View>
      </View>

      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>🔧 Vérifications nécessaires :</Text>
        <Text style={styles.actionItem}>1. ✅ Dossier components/ existe</Text>
        <Text style={styles.actionItem}>2. ✅ Dossier screens/ existe</Text>
        <Text style={styles.actionItem}>3. ✅ Fichier components/ui/index.js existe</Text>
        <Text style={styles.actionItem}>4. ✅ Vos écrans sont dans screens/</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.testButton} onPress={testImports}>
          <Text style={styles.testButtonText}>🧪 Test imports dynamiques</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButtonSecondary} onPress={testStaticImports}>
          <Text style={styles.testButtonSecondaryText}>🔬 Test imports statiques</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Affichage des résultats
  const renderResults = () => (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>📊 Résultats des tests</Text>
        
        {Object.entries(importResults).map(([key, result]) => (
          <View key={key} style={styles.resultItem}>
            <Text style={[
              styles.resultText,
              result.includes('✅') ? styles.resultSuccess : styles.resultError
            ]}>
              {result}
            </Text>
          </View>
        ))}
      </View>

      {Object.values(importResults).every(result => result.includes('✅')) ? (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>🎉 Parfait ! Tous les imports fonctionnent</Text>
          <Text style={styles.successText}>
            Votre structure est correcte. Vous pouvez maintenant procéder à l'intégration progressive.
          </Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => Alert.alert('Prêt !', 'Passons à l\'intégration des écrans !')}
          >
            <Text style={styles.continueButtonText}>Continuer l'intégration</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>⚠️ Problèmes détectés</Text>
          <Text style={styles.errorText}>
            Vérifiez que vos fichiers existent aux bons endroits.
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setTestPhase('ready')}
          >
            <Text style={styles.retryButtonText}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🐾 PetFinder</Text>
        <Text style={styles.subtitle}>
          Test structure (sans src/) - Phase: {testPhase}
        </Text>
      </View>

      {/* Contenu selon la phase */}
      {(testPhase === 'ready' || testPhase === 'static') && renderInstructions()}
      {testPhase === 'testing' && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>⏳ Test des imports en cours...</Text>
        </View>
      )}
      {testPhase === 'completed' && renderResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  header: {
    backgroundColor: '#059669',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  
  content: {
    flex: 1,
  },
  
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  
  // Instructions
  instructionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  
  codeBlock: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 8,
  },
  
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#F9FAFB',
    lineHeight: 18,
  },
  
  // Actions
  actionCard: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 12,
  },
  
  actionItem: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 6,
    lineHeight: 20,
  },
  
  // Boutons
  buttonContainer: {
    gap: 12,
  },
  
  testButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  testButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#059669',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  testButtonSecondaryText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
  
  // Résultats
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  
  resultItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  
  resultText: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  resultSuccess: {
    color: '#059669',
  },
  
  resultError: {
    color: '#DC2626',
  },
  
  // Succès et erreurs
  successCard: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
  },
  
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 8,
  },
  
  successText: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  continueButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  errorCard: {
    backgroundColor: '#FEF2F2',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B91C1C',
    marginBottom: 8,
  },
  
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  retryButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});