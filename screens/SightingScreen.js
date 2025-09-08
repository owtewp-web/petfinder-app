import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { ArrowLeft, MapPin, Camera, Plus } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SightingScreen = ({ 
  selectedPet, 
  onNavigateBack 
}) => {
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

  // Formatage des dates pour l'affichage
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
    // Logique pour récupérer la position GPS
    setLocation('Position actuelle détectée');
  };

  // Fonction pour appeler les urgences vétérinaires
  const handleEmergencyCall = () => {
    console.log('Appel des services vétérinaires d\'urgence');
    // Logique pour déclencher l'appel d'urgence
  };

  // Fonction pour appeler le propriétaire
  const handleCallOwner = () => {
    console.log(`Appel du propriétaire: ${selectedPet?.phone}`);
    // Logique pour appeler le propriétaire
  };

  // Fonction pour envoyer le signalement
  const handleSubmitSighting = () => {
    console.log('Envoi du signalement pour:', selectedPet?.name);
    console.log('Données:', {
      location,
      selectedDate,
      selectedTime,
      physicalState,
      behaviors,
      additionalDetails,
      contactName,
      contactPhone,
    });
    // Logique pour envoyer le signalement
    // Puis retourner à l'écran précédent
    onNavigateBack && onNavigateBack();
  };

  // Si aucun animal sélectionné, retour
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButtonIcon}>
            <ArrowLeft width={24} height={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Signaler une observation</Text>
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
              onPress={handleCallOwner}
            >
              <Text style={styles.emergencyButtonText}>📞 Appeler le propriétaire</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.emergencyVetButton}
              onPress={handleEmergencyCall}
            >
              <Text style={styles.emergencyButtonText}>🆘 Urgence vétérinaire</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section lieu d'observation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Lieu d'observation *</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Adresse précise</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: 15 Rue de la République, Lyon"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.inputHint}>
              Soyez le plus précis possible pour aider à le retrouver
            </Text>
          </View>

          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MapPin width={32} height={32} color="#6B7280" />
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Quand l'avez-vous vu ? *</Text>
          
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeInput}>
                <Text style={styles.inputLabel}>Date</Text>
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
                <Text style={styles.inputLabel}>Heure</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Photo de l'observation (optionnel)</Text>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera width={24} height={24} color="#9CA3AF" />
              <Text style={styles.photoButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton}>
              <Plus width={24} height={24} color="#9CA3AF" />
              <Text style={styles.photoButtonText}>Depuis la galerie</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.photoHint}>
            💡 Même floue, une photo peut aider ! Évitez le flash si l'animal semble craintif.
          </Text>
        </View>

        {/* Section état de l'animal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🐾 État et comportement de l'animal</Text>
          
          {/* État physique */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>État physique apparent</Text>
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
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Comportement observé</Text>
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
                  style={styles.checkboxOption}
                  onPress={() => handleBehaviorChange(behavior.key)}
                >
                  <View style={[
                    styles.checkbox,
                    behaviors[behavior.key] && styles.checkboxActive
                  ]}>
                    {behaviors[behavior.key] && (
                      <Text style={styles.checkboxCheck}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{behavior.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Description libre */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Détails supplémentaires</Text>
          <TextInput
            style={styles.textArea}
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
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>📞 Vos coordonnées (optionnel)</Text>
          <Text style={styles.contactSubtitle}>
            Le propriétaire pourra vous contacter pour plus d'informations
          </Text>
          <View style={styles.contactInputs}>
            <TextInput
              style={styles.textInput}
              placeholder="Votre nom (optionnel)"
              value={contactName}
              onChangeText={setContactName}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Votre téléphone (optionnel)"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitSighting}
          >
            <Text style={styles.submitButtonText}>📝 Envoyer le signalement</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>💬 Contacter le propriétaire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>📢 Partager sur les réseaux</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Conseils */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Conseils utiles</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Ne forcez pas l'approche si l'animal semble craintif</Text>
            <Text style={styles.tipItem}>• Notez les détails même s'ils semblent insignifiants</Text>
            <Text style={styles.tipItem}>• Surveillez la zone, l'animal pourrait revenir</Text>
            <Text style={styles.tipItem}>• Prévenez les commerces et voisins du quartier</Text>
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
    backgroundColor: '#FFFFFF',
  },

  // Container d'erreur
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

  backButton: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Header orange avec infos animal
  header: {
    backgroundColor: '#EA580C',
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

  backButtonIcon: {
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

  petRecap: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  petRecapEmoji: {
    fontSize: 32,
  },

  petRecapInfo: {
    flex: 1,
  },

  petRecapName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },

  petRecapDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Container de scroll
  scrollContainer: {
    flex: 1,
  },

  // Sections
  section: {
    padding: 16,
    gap: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  // Alerte d'urgence
  emergencyAlert: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    gap: 12,
  },

  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#991B1B',
  },

  emergencyText: {
    fontSize: 14,
    color: '#B91C1C',
    lineHeight: 20,
  },

  emergencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  callOwnerButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  emergencyVetButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Inputs
  inputGroup: {
    gap: 8,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    height: 48,
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    height: 96,
  },

  inputHint: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Carte
  mapContainer: {
    marginTop: 8,
  },

  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 160,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  mapPlaceholderTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  locationButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },

  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Date et heure
  dateTimeContainer: {
    gap: 12,
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },

  dateTimeInput: {
    flex: 1,
    gap: 8,
  },

  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },

  dateTimeButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  quickTimeSection: {
    gap: 8,
  },

  quickTimeLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  quickTimeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  quickTimeButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  quickTimeButtonText: {
    fontSize: 14,
    color: '#374151',
  },

  // Photos
  photoContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  photoButton: {
    flex: 1,
    aspectRatio: 16/9,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  photoButtonText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  photoHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },

  // Radio buttons
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  radioOption: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },

  radioOptionActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },

  radioOptionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },

  radioOptionTextActive: {
    color: '#2563EB',
  },

  // Checkboxes
  checkboxContainer: {
    gap: 8,
  },

  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },

  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  // Section contact
  contactSection: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    gap: 12,
  },

  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
  },

  contactSubtitle: {
    fontSize: 14,
    color: '#1D4ED8',
  },

  contactInputs: {
    gap: 12,
  },

  // Actions
  actionSection: {
    padding: 16,
    gap: 12,
  },

  submitButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  chatButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  shareButton: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Section conseils
  tipsSection: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },

  tipsList: {
    gap: 4,
  },

  tipItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },
});

export default SightingScreen;