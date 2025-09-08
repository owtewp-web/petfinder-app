// App.js - Test avec composants UI
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import des composants UI
import { Button, Input, Card } from './src/components/ui';

export default function App() {
  // États pour tester les composants
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState('');

  // Fonction pour tester les composants
  const handleTestComponents = () => {
    setLoading(true);
    setTestResult('Test en cours...');
    
    setTimeout(() => {
      setLoading(false);
      setTestResult('✅ Tous les composants UI fonctionnent !');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🐾 PetFinder</Text>
        <Text style={styles.subtitle}>Test des composants UI</Text>
      </View>

      {/* Contenu avec ScrollView */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* Statut */}
        <Card style={styles.statusCard}>
          <Text style={styles.statusTitle}>🧪 Test des composants UI</Text>
          <Text style={styles.statusDescription}>
            Cette étape teste que nos composants Button, Input et Card fonctionnent correctement.
          </Text>
        </Card>

        {/* Test Input */}
        <Card>
          <Text style={styles.sectionTitle}>Test du composant Input</Text>
          <Input
            label="Tapez quelque chose :"
            placeholder="Testez l'input ici..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          {inputValue ? (
            <Text style={styles.inputFeedback}>✅ Vous avez tapé : "{inputValue}"</Text>
          ) : (
            <Text style={styles.inputHint}>Tapez du texte pour tester l'Input</Text>
          )}
        </Card>

        {/* Test Buttons */}
        <Card>
          <Text style={styles.sectionTitle}>Test des boutons</Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Bouton Principal"
              onPress={handleTestComponents}
              loading={loading}
            />
            
            <Button
              title="Bouton Secondaire"
              variant="secondary"
              onPress={() => setTestResult('Bouton secondaire cliqué !')}
            />
            
            <Button
              title="Bouton Danger"
              variant="danger"
              onPress={() => setTestResult('⚠️ Bouton danger cliqué !')}
            />
          </View>
        </Card>

        {/* Résultat des tests */}
        {testResult ? (
          <Card style={styles.resultCard}>
            <Text style={styles.resultTitle}>Résultat du test :</Text>
            <Text style={styles.resultText}>{testResult}</Text>
          </Card>
        ) : null}

        {/* Prochaines étapes */}
        <Card style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>📋 Progression</Text>
          <View style={styles.stepsList}>
            <Text style={styles.stepCompleted}>1. ✅ App.js minimal</Text>
            <Text style={styles.stepCompleted}>2. ✅ Composants UI</Text>
            <Text style={styles.stepPending}>3. ⏳ AuthScreen</Text>
            <Text style={styles.stepPending}>4. ⏳ HomeScreen</Text>
            <Text style={styles.stepPending}>5. ⏳ Tous les écrans</Text>
          </View>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  header: {
    backgroundColor: '#3B82F6',
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
    fontSize: 16,
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
  
  // Cards
  statusCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  
  statusDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  
  // Sections
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  
  // Input feedback
  inputFeedback: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  
  inputHint: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  
  // Buttons
  buttonContainer: {
    gap: 12,
  },
  
  // Résultats
  resultCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 8,
  },
  
  resultText: {
    fontSize: 16,
    color: '#166534',
    fontWeight: '500',
  },
  
  // Prochaines étapes
  nextStepsCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  
  stepsList: {
    gap: 8,
  },
  
  stepCompleted: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  
  stepPending: {
    fontSize: 14,
    color: '#6B7280',
  },
});