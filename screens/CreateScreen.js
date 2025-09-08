import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Platform, Modal } from 'react-native';
import { ArrowLeft, Camera, Plus, MapPin, ChevronDown } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateScreen = ({ onNavigateBack, selectedPet, editMode }) => {
  // États pour gérer les données du formulaire
  // Si en mode édition, pré-remplir avec les données de selectedPet
  const [petName, setPetName] = useState(selectedPet?.petName || selectedPet?.name || '');
  const [petType, setPetType] = useState(selectedPet?.petType || selectedPet?.type || '');
  const [petBreed, setPetBreed] = useState(selectedPet?.race || '');
  const [petColors, setPetColors] = useState(selectedPet?.color || '');
  const [description, setDescription] = useState(selectedPet?.description || '');
  const [lossAddress, setLossAddress] = useState(selectedPet?.location || '');
  const [ownerPhone, setOwnerPhone] = useState(selectedPet?.phone || '');
  const [reward, setReward] = useState(selectedPet?.reward || '');

  // Gestion de la date et heure
  const [lossDate, setLossDate] = useState(new Date());
  const [lossTime, setLossTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Gestion de la liste déroulante
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const petTypes = ['Chat', 'Chien', 'Mammifères', 'Oiseaux', 'Reptiles', 'Autres'];

  // Fonction pour gérer la soumission du formulaire
  const handleSubmitAnnouncement = () => {
    console.log('Création d\'annonce:', {
      petName,
      petType,
      petBreed,
      petColors,
      description,
      lossAddress,
      lossDate,
      lossTime,
      ownerPhone,
      reward,
    });
    
    // Validation basique
    if (!petName || !petType || !petColors || !lossAddress || !lossDate || !ownerPhone) {
      console.log('Champs obligatoires manquants');
      return;
    }

    // Logique pour envoyer l'annonce au backend
    // Puis retourner à l'écran précédent
    onNavigateBack && onNavigateBack();
  };

  // Fonction pour gérer l'ajout de photos
  const handleAddPhoto = (source) => {
    console.log(`Ajout de photo depuis: ${source}`);
    // Logique pour ouvrir l'appareil photo ou la galerie
  };

  // Fonction pour utiliser la localisation actuelle
  const handleUseCurrentLocation = () => {
    console.log('Utilisation de la position GPS pour localiser sur la carte');
    // Logique pour récupérer la position GPS
  };

  // Fonctions pour gérer les sélecteurs de date et heure
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setLossDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setLossTime(selectedTime);
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

  // Fonction pour sélectionner un type d'animal
  const selectPetType = (type) => {
    setPetType(type);
    setShowTypeDropdown(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editMode ? 'Modifier l\'annonce' : 'Signaler une perte'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Section photos de l'animal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos de l'animal *</Text>
          <View style={styles.photoGrid}>
            <TouchableOpacity 
              style={styles.mainPhotoButton}
              onPress={() => handleAddPhoto('camera')}
            >
              <Camera width={32} height={32} color="#9CA3AF" />
              <Text style={styles.photoButtonText}>Photo principale</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.additionalPhotoButton}
              onPress={() => handleAddPhoto('gallery')}
            >
              <Plus width={32} height={32} color="#9CA3AF" />
              <Text style={styles.photoButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations de base */}
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nom de l'animal *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Milo"
              value={petName}
              onChangeText={setPetName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Type *</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowTypeDropdown(true)}
              >
                <Text style={[styles.dropdownText, !petType && styles.placeholderText]}>
                  {petType || 'Sélectionner un type'}
                </Text>
                <ChevronDown width={20} height={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Race</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: Européen"
                value={petBreed}
                onChangeText={setPetBreed}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Couleur(s) *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Roux et blanc"
              value={petColors}
              onChangeText={setPetColors}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description et signes distinctifs</Text>
            <TextInput
              style={styles.textArea}
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lieu de disparition</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Adresse *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Place Bellecour, Lyon"
              value={lossAddress}
              onChangeText={setLossAddress}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MapPin width={24} height={24} color="#6B7280" />
              <Text style={styles.mapPlaceholderText}>Localiser sur la carte</Text>
            </View>
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={handleUseCurrentLocation}
            >
              <Text style={styles.mapButtonText}>📍 Utiliser ma position</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date et heure de disparition */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Date et heure de disparition *</Text>
          <View style={styles.inputRow}>
            {/* Sélecteur de date */}
            <View style={styles.inputHalf}>
              <Text style={styles.dateTimeLabel}>Date</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeButtonText}>
                  {formatDate(lossDate)}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Sélecteur d'heure */}
            <View style={styles.inputHalf}>
              <Text style={styles.dateTimeLabel}>Heure</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeButtonText}>
                  {formatTime(lossTime)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Sélecteurs natifs */}
          {showDatePicker && (
            <DateTimePicker
              value={lossDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()} // Ne permet pas de sélectionner une date future
            />
          )}
          
          {showTimePicker && (
            <DateTimePicker
              value={lossTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              is24Hour={true} // Format 24h
            />
          )}
        </View>

        {/* Informations de contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos informations de contact</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Téléphone *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="06 12 34 56 78"
              value={ownerPhone}
              onChangeText={setOwnerPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Récompense (optionnel)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: 50€"
              value={reward}
              onChangeText={setReward}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Conseils et informations */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Conseils pour une annonce efficace</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Ajoutez plusieurs photos sous différents angles</Text>
            <Text style={styles.tipItem}>• Décrivez tous les signes distinctifs (cicatrices, collier...)</Text>
            <Text style={styles.tipItem}>• Indiquez le comportement habituel de votre animal</Text>
            <Text style={styles.tipItem}>• Soyez précis sur le lieu et l'heure de disparition</Text>
            <Text style={styles.tipItem}>• Vérifiez que votre numéro est correct</Text>
          </View>
        </View>

        {/* Bouton de soumission */}
        <View style={styles.submitSection}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitAnnouncement}
          >
            <Text style={styles.submitButtonText}>
              {editMode ? 'Enregistrer les modifications' : 'Publier l\'annonce'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espace en bas */}
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
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Sélectionner le type d'animal</Text>
            {petTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => selectPetType(type)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  petType === type && styles.selectedItemText
                ]}>
                  {type}
                </Text>
                {petType === type && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },

  headerSpacer: {
    width: 32,
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

  // Groupes d'inputs
  inputGroup: {
    gap: 8,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },

  inputHalf: {
    flex: 1,
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

  // Styles pour la liste déroulante
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },

  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },

  placeholderText: {
    color: '#9CA3AF',
  },

  // Modal pour la liste déroulante
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  dropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    maxWidth: 300,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },

  selectedItemText: {
    color: '#3B82F6',
    fontWeight: '600',
  },

  checkmark: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Styles pour les sélecteurs de date et heure
  dateTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  dateTimeButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
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

  selectContainer: {
    position: 'relative',
  },

  // Section photos
  photoGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  mainPhotoButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  additionalPhotoButton: {
    flex: 1,
    aspectRatio: 1,
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

  // Carte
  mapContainer: {
    alignItems: 'center',
    gap: 12,
  },

  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 128,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  mapPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
  },

  mapButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Section conseils
  tipsSection: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginBottom: 12,
  },

  tipsList: {
    gap: 4,
  },

  tipItem: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  // Section de soumission
  submitSection: {
    padding: 16,
  },

  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Espace en bas
  bottomSpacer: {
    height: 32,
  },
});

export default CreateScreen;