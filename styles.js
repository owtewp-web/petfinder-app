// styles.js - Fichier de styles COMPLET pour l'application PetFinder
// Tous les styles CSS-in-JS organisés par sections

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ========================================================================================
  // STYLES GÉNÉRAUX ET COMPOSANTS UTILITAIRES
  // ========================================================================================
  
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // Container d'erreur
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },

  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Bouton générique
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonLoading: {
    backgroundColor: '#9CA3AF',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Input générique
  inputContainer: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },

  // Card générique
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Bouton retour
  backButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  backButtonIcon: {
    padding: 4,
  },

  backArrow: {
    fontSize: 24,
    color: '#374151',
  },

  backArrowWhite: {
    fontSize: 24,
    color: '#FFFFFF',
  },

  // Headers génériques
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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

  // Espace en bas
  bottomSpacer: {
    height: 80,
  },

  // ========================================================================================
  // STYLES ÉCRAN D'AUTHENTIFICATION
  // ========================================================================================

  // Gradient et header auth
  gradient: {
    flex: 1,
  },

  authHeader: {
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

  // Container formulaire auth
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

  // Onglets auth
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

  // Formulaire auth
  form: {
    marginBottom: 24,
    gap: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  loginOptions: {
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

  // Checkboxes auth
  checkboxItem: {
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

  checkboxText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },

  // Préférences auth
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

  // Accords légaux
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

  errorTextAgreement: {
    fontSize: 12,
    color: '#dc2626',
    marginBottom: 8,
    marginLeft: 32,
  },

  // Bouton principal auth
  mainButton: {
    marginBottom: 20,
  },

  // Footer auth
  authFooter: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Statistiques auth
  authStats: {
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

  // ========================================================================================
  // STYLES ÉCRAN D'ACCUEIL
  // ========================================================================================

  // Header accueil
  homeHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
    zIndex: 10,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  homeLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },

  headerIcon: {
    fontSize: 24,
  },

  // Barre de recherche accueil
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    fontSize: 20,
  },

  searchInput: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
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
    fontSize: 20,
  },

  // Statistiques rapides accueil
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

  // Liste des animaux accueil
  petList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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

  petImageHome: {
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

  // Localisation accueil
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

  locationIcon: {
    fontSize: 16,
  },

  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Statistiques pet card
  petStats: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },

  petStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statIcon: {
    fontSize: 16,
  },

  statIconOrange: {
    fontSize: 16,
  },

  statText: {
    fontSize: 14,
    color: '#2563EB',
  },

  statTextOrange: {
    fontSize: 14,
    color: '#EA580C',
  },

  // Navigation bottom accueil
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

  navIcon: {
    fontSize: 24,
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

  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },

  // Modal accueil
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },

  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseText: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },

  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  modalSubtitle: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 16,
  },

  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },

  modalFeaturesList: {
    alignSelf: 'stretch',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },

  modalFeatureItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },

  modalButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // ========================================================================================
  // STYLES ÉCRAN DÉTAIL ANIMAL
  // ========================================================================================

  // Header détail
  detailHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    zIndex: 10,
  },

  // Section image pet
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

  // Actions rapides détail
  quickActions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },

  participateButtonLarge: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  participateButtonLargeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  participateButtonActive: {
    backgroundColor: '#059669',
  },

  participateButtonLoading: {
    backgroundColor: '#9CA3AF',
  },

  sightingButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sightingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Grille stats détail
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  statCardOrange: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  statCardGreen: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
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

  statNumberGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#2563EB',
  },

  statLabelOrange: {
    fontSize: 12,
    color: '#EA580C',
  },

  statLabelGreen: {
    fontSize: 12,
    color: '#059669',
  },

  // Section détails
  detailsSection: {
    padding: 16,
    gap: 24,
  },

  infoBlock: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  infoList: {
    gap: 8,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  // Description
  descriptionContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },

  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Placeholder carte
  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  mapIcon: {
    fontSize: 32,
  },

  mapPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Section contact
  contactSection: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },

  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  callButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  messageButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  messageButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },

  // Modal participation
  modalStats: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },

  modalStatsText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },

  modalActions: {
    gap: 12,
    width: '100%',
  },

  modalButtonPrimary: {
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  modalButtonSecondary: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  modalButtonDanger: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtonDangerText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
  },

  // Notification participation
  participationNotification: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#059669',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  participationNotificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // ========================================================================================
  // STYLES ÉCRAN SIGNALEMENT
  // ========================================================================================

  // Header signalement
  sightingHeader: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 50,
  },

  sightingHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },

  // Récap pet
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

  // Alerte urgence
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

  // Sections signalement
  sightingSection: {
    padding: 16,
    gap: 16,
  },

  sightingSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  sightingInputGroup: {
    gap: 8,
  },

  sightingInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  sightingTextInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    height: 48,
  },

  sightingTextArea: {
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

  // Carte signalement
  sightingMapContainer: {
    marginTop: 8,
  },

  sightingMapPlaceholder: {
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

  // Date et heure signalement
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

  // Photos signalement
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

  photoIcon: {
    fontSize: 24,
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

  // Radio buttons signalement
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

  // Checkboxes signalement
  checkboxContainer: {
    gap: 8,
  },

  checkboxOptionSighting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  checkboxSighting: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActiveSighting: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },

  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  checkboxLabelSighting: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  // Contact signalement
  sightingContactSection: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    gap: 12,
  },

  sightingContactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
  },

  sightingContactSubtitle: {
    fontSize: 14,
    color: '#1D4ED8',
  },

  contactInputs: {
    gap: 12,
  },

  // Actions signalement
  sightingActionSection: {
    padding: 16,
    gap: 12,
  },

  sightingSubmitButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },

  sightingSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Conseils signalement
  sightingTipsSection: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  sightingTipsTitle: {
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

  // ========================================================================================
  // STYLES ÉCRAN DE CRÉATION
  // ========================================================================================

  // Header création
  createHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    zIndex: 10,
  },

  // Sections création
  createSection: {
    padding: 16,
    gap: 16,
  },

  createSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  createInputGroup: {
    gap: 8,
  },

  createInputRow: {
    flexDirection: 'row',
    gap: 12,
  },

  createInputHalf: {
    flex: 1,
    gap: 8,
  },

  createInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  createTextInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    height: 48,
  },

  createTextArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    height: 96,
  },

  // Dropdown création
  createDropdownButton: {
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

  createDropdownText: {
    fontSize: 14,
    color: '#374151',
  },

  createPlaceholderText: {
    color: '#9CA3AF',
  },

  dropdownArrow: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Modal dropdown création
  createModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  createDropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    maxWidth: 300,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  createDropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  createDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  createDropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },

  createSelectedItemText: {
    color: '#3B82F6',
    fontWeight: '600',
  },

  createCheckmark: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Photos création
  createPhotoGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  createMainPhotoButton: {
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

  createAdditionalPhotoButton: {
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

  createPhotoButtonText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Carte création
  createMapContainer: {
    alignItems: 'center',
    gap: 12,
  },

  createMapPlaceholder: {
    backgroundColor: '#E5E7EB',
    height: 128,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  createMapPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
  },

  createMapButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  createMapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Conseils création
  createTipsSection: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  createTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginBottom: 12,
  },

  createTipsList: {
    gap: 4,
  },

  createTipItem: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  // Soumission création
  createSubmitSection: {
    padding: 16,
  },

  createSubmitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  createSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ========================================================================================
  // STYLES ÉCRAN MESSAGES
  // ========================================================================================

  // Header messages
  messagesHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },

  messagesHeaderTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  messagesUnreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  messagesUnreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Stats messages
  messagesStatsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },

  messagesStatsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 4,
  },

  messagesStatsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  messagesStatsNumberGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },

  messagesStatsLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Liste conversations
  messagesConversationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  messagesSectionHeader: {
    marginBottom: 16,
  },

  messagesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },

  messagesSectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Carte conversation
  messagesConversationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },

  messagesConversationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    backgroundColor: '#FEFEFE',
  },

  messagesUnreadIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },

  messagesConversationContent: {
    gap: 12,
  },

  // Info pet messages
  messagesPetInfoSection: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  messagesPetImage: {
    fontSize: 40,
  },

  messagesPetDetails: {
    flex: 1,
    gap: 4,
  },

  messagesPetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  messagesPetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  messagesStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  messagesStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  messagesPetMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  messagesOwnerName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  messagesSeparator: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  messagesLocation: {
    fontSize: 14,
    color: '#6B7280',
  },

  messagesParticipationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  participationIcon: {
    fontSize: 14,
  },

  messagesParticipationText: {
    fontSize: 13,
    color: '#6B7280',
  },

  messagesJoinedDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  // Aperçu message
  messagesMessagePreview: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  messagesMessageContent: {
    flex: 1,
    gap: 6,
  },

  messagesMessageText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  messagesMessageTextUnread: {
    color: '#374151',
    fontWeight: '500',
  },

  messagesMessageMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  timeIcon: {
    fontSize: 12,
  },

  messagesMessageTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  messagesMessageIcon: {
    padding: 4,
  },

  messageIconEmoji: {
    fontSize: 20,
  },

  // Info section messages
  messagesInfoSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  messagesInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginBottom: 12,
  },

  messagesInfoList: {
    gap: 6,
  },

  messagesInfoItem: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  // ========================================================================================
  // STYLES ÉCRAN CHAT
  // ========================================================================================

  // Header chat
  chatHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingTop: 50,
    paddingBottom: 12,
  },

  chatAnnouncementInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  chatPetEmoji: {
    fontSize: 32,
  },

  chatAnnouncementDetails: {
    flex: 1,
  },

  chatAnnouncementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  chatAnnouncementSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  chatPhoneButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },

  phoneIcon: {
    fontSize: 20,
  },

  chatQuickActionsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },

  chatQuickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },

  signalIcon: {
    fontSize: 16,
  },

  cameraIcon: {
    fontSize: 16,
  },

  infoIcon: {
    fontSize: 16,
  },

  chatQuickActionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },

  // Messages chat
  chatMessagesContainer: {
    flex: 1,
  },

  chatMessagesContent: {
    padding: 16,
    gap: 8,
  },

  chatMessageGroup: {
    marginBottom: 8,
  },

  chatSenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    marginLeft: 4,
  },

  chatSenderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  chatSenderName: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },

  chatSenderNameOwner: {
    color: '#3B82F6',
  },

  // Containers messages chat
  chatMessageContainer: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },

  chatUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#059669',
    borderBottomRightRadius: 4,
  },

  chatOtherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  chatSignalingMessage: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FDBA74',
  },

  chatSignalingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },

  chatSignalingLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#EA580C',
  },

  // Texte messages chat
  chatMessageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  chatUserMessageText: {
    color: '#FFFFFF',
  },

  chatOtherMessageText: {
    color: '#374151',
  },

  chatSignalingMessageText: {
    color: '#9A3412',
  },

  chatMessageTime: {
    fontSize: 10,
    marginTop: 2,
  },

  chatUserMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },

  chatOtherMessageTime: {
    color: '#9CA3AF',
  },

  // Indicateur frappe
  chatTypingIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },

  chatTypingText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  // Input chat
  chatInputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },

  chatMessageInput: {
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

  chatSendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatSendButtonActive: {
    backgroundColor: '#059669',
  },

  chatSendButtonInactive: {
    backgroundColor: '#F3F4F6',
  },

  sendIcon: {
    fontSize: 20,
  },

  chatCharacterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },

  // ========================================================================================
  // STYLES ÉCRAN PROFIL
  // ========================================================================================

  // Header profil
  profileHeader: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 50,
  },

  profileBackButton: {
    padding: 4,
  },

  profileHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },

  profileHeaderInfo: {
    alignItems: 'center',
    gap: 8,
  },

  profileAvatar: {
    fontSize: 48,
    marginBottom: 8,
  },

  profileUserName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  profileUserLocation: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  profileLevelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },

  profileLevelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Container scroll profil
  profileScrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -24,
  },

  // Progression profil
  profileProgressSection: {
    marginBottom: 24,
  },

  profileProgressCard: {
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

  profileProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileProgressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },

  profileProgressPoints: {
    fontSize: 14,
    color: '#6B7280',
  },

  profileProgressBarContainer: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },

  profileProgressBar: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
  },

  profileProgressHint: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Stats rapides profil
  profileQuickStatsSection: {
    marginBottom: 24,
  },

  profileQuickStatsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  profileQuickStatCard: {
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

  profileQuickStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  profileQuickStatNumberPurple: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },

  profileQuickStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  profileQuickStatBadge: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
  },

  profileQuickStatBadgeBlue: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 4,
  },

  // Stats détaillées profil
  profileDetailedStatsSection: {
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

  profileSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },

  profileStatsGrid: {
    gap: 12,
  },

  profileStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  profileStatIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileStatEmoji: {
    fontSize: 20,
  },

  profileStatLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  profileStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  // Badges profil
  profileBadgesSection: {
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

  profileBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },

  profileBadgeCard: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },

  profileBadgeCardEarned: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },

  profileBadgeCardLocked: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },

  profileBadgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  profileBadgeIconGray: {
    opacity: 0.4,
  },

  profileBadgeName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  profileBadgeNameEarned: {
    color: '#92400E',
  },

  profileBadgeNameLocked: {
    color: '#6B7280',
  },

  profileNextBadgeHint: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },

  profileNextBadgeText: {
    fontSize: 14,
    color: '#1E40AF',
  },

  profileNextBadgeLabel: {
    fontWeight: 'bold',
  },

  profileNextBadgeDescription: {
    fontSize: 12,
    color: '#2563EB',
  },

  // Activité profil
  profileActivitySection: {
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

  profileActivityList: {
    gap: 12,
  },

  profileActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  profileActivityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  profileActivityEmoji: {
    fontSize: 20,
  },

  profileActivityContent: {
    flex: 1,
    gap: 2,
  },

  profileActivityDescription: {
    fontSize: 14,
    color: '#374151',
  },

  profileActivityAnimal: {
    fontWeight: 'bold',
  },

  profileActivityTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  profileActivityPoints: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
  },

  profileActivityPointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },

  // Classement profil
  profileLeaderboardSection: {
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

  profileLeaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },

  profileLeaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileLeaderboardLeft: {
    flex: 1,
  },

  profileLeaderboardSubtitle: {
    fontSize: 14,
    color: '#92400E',
    opacity: 0.8,
  },

  profileLeaderboardPosition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    marginVertical: 4,
  },

  profileLeaderboardTrend: {
    fontSize: 12,
    color: '#059669',
  },

  profileLeaderboardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  profileLeaderboardButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400E',
  },

  // Paramètres profil
  profileSettingsSection: {
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

  profileSettingsList: {
    gap: 4,
  },

  profileSettingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  profileSettingItemDanger: {
    paddingVertical: 12,
  },

  profileSettingText: {
    fontSize: 14,
    color: '#374151',
  },

  profileSettingTextDanger: {
    fontSize: 14,
    color: '#DC2626',
  },

  // ========================================================================================
  // STYLES ÉCRAN MES ANIMAUX
  // ========================================================================================

  // Header mes animaux
  myAnimalsHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },

  myAnimalsAddButton: {
    padding: 4,
  },

  addIcon: {
    fontSize: 24,
    color: '#3B82F6',
  },

  // Stats mes animaux
  myAnimalsStatsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },

  myAnimalsStatsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 4,
  },

  myAnimalsStatsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
  },

  myAnimalsStatsNumberBlue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  },

  myAnimalsStatsNumberGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },

  myAnimalsStatsLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Onglets mes animaux
  myAnimalsTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  myAnimalsTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  myAnimalsTabActive: {
    backgroundColor: '#3B82F6',
  },

  myAnimalsTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },

  myAnimalsTabTextActive: {
    color: '#FFFFFF',
  },

  // Liste annonces mes animaux
  myAnimalsAnnouncementsList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  myAnimalsAnnouncementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },

  myAnimalsAnnouncementContent: {
    padding: 16,
    gap: 12,
  },

  // Header annonce mes animaux
  myAnimalsAnnouncementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  myAnimalsPetInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },

  myAnimalsPetEmoji: {
    fontSize: 48,
  },

  myAnimalsPetDetails: {
    flex: 1,
    gap: 4,
  },

  myAnimalsPetName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  myAnimalsPetMetadata: {
    fontSize: 14,
    color: '#6B7280',
  },

  myAnimalsLocationInfo: {
    fontSize: 14,
    color: '#6B7280',
  },

  myAnimalsStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  myAnimalsStatusActive: {
    backgroundColor: '#EFF6FF',
  },

  myAnimalsStatusFound: {
    backgroundColor: '#F0FDF4',
  },

  myAnimalsStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  myAnimalsStatusTextActive: {
    color: '#2563EB',
  },

  myAnimalsStatusTextFound: {
    color: '#059669',
  },

  // Stats annonce mes animaux
  myAnimalsAnnouncementStats: {
    flexDirection: 'row',
    gap: 16,
  },

  myAnimalsStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  eyeIcon: {
    fontSize: 14,
  },

  myAnimalsStatText: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Infos supplémentaires mes animaux
  myAnimalsAdditionalInfo: {
    gap: 4,
  },

  myAnimalsRewardInfo: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },

  myAnimalsLastActivity: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  myAnimalsFoundInfo: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },

  // Actions mes animaux
  myAnimalsActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  myAnimalsActionButtonPrimary: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  myAnimalsActionButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  myAnimalsActionButtonSecondary: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  myAnimalsActionButtonTextSecondary: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },

  myAnimalsActionButtonSuccess: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  myAnimalsActionButtonTextSuccess: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // État vide mes animaux
  myAnimalsEmptyState: {
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },

  myAnimalsEmptyStateEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  myAnimalsEmptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },

  myAnimalsEmptyStateSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  myAnimalsEmptyStateButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },

  myAnimalsEmptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal clôture mes animaux
  myAnimalsModalActions: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },

  myAnimalsModalButtonFound: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },

  myAnimalsModalButtonFoundText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  myAnimalsModalButtonAbandon: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },

  myAnimalsModalButtonAbandonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  myAnimalsModalButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },

  myAnimalsModalButtonCancel: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },

  myAnimalsModalButtonCancelText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },

  // ========================================================================================
  // STYLES SUPPLÉMENTAIRES ET UTILITAIRES
  // ========================================================================================

  // Texte générique
  text: {
    fontSize: 16,
    color: '#374151',
  },

  textBold: {
    fontWeight: 'bold',
  },

  textCenter: {
    textAlign: 'center',
  },

  textSmall: {
    fontSize: 12,
    color: '#6B7280',
  },

  textLarge: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Marges et espacements
  margin: {
    margin: 16,
  },

  marginVertical: {
    marginVertical: 16,
  },

  marginHorizontal: {
    marginHorizontal: 16,
  },

  padding: {
    padding: 16,
  },

  paddingVertical: {
    paddingVertical: 16,
  },

  paddingHorizontal: {
    paddingHorizontal: 16,
  },

  // Couleurs de fond
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },

  backgroundGray: {
    backgroundColor: '#F9FAFB',
  },

  backgroundBlue: {
    backgroundColor: '#EFF6FF',
  },

  backgroundGreen: {
    backgroundColor: '#F0FDF4',
  },

  backgroundOrange: {
    backgroundColor: '#FFF7ED',
  },

  backgroundRed: {
    backgroundColor: '#FEF2F2',
  },

  // Ombres
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Bordures
  border: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  borderRadius: {
    borderRadius: 8,
  },

  borderRadiusLarge: {
    borderRadius: 12,
  },

  // Flex
  flex1: {
    flex: 1,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  alignCenter: {
    alignItems: 'center',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  // États disabled
  disabled: {
    opacity: 0.5,
  },

  // Position
  absolute: {
    position: 'absolute',
  },

  relative: {
    position: 'relative',
  },

  zIndex: {
    zIndex: 1000,
  },

  // Largeur et hauteur
  fullWidth: {
    width: '100%',
  },

  fullHeight: {
    height: '100%',
  },

  // Couleurs de texte
  textPrimary: {
    color: '#1F2937',
  },

  textSecondary: {
    color: '#6B7280',
  },

  textBlue: {
    color: '#3B82F6',
  },

  textGreen: {
    color: '#059669',
  },

  textOrange: {
    color: '#EA580C',
  },

  textRed: {
    color: '#DC2626',
  },

  textWhite: {
    color: '#FFFFFF',
  },

  // ========================================================================================
  // STYLES SPÉCIAUX ET UTILITAIRES SUPPLÉMENTAIRES
  // ========================================================================================

  // Animations et transitions (pour les futures améliorations)
  fadeIn: {
    opacity: 1,
  },

  fadeOut: {
    opacity: 0,
  },

  // États de focus
  focused: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },

  // États de sélection
  selected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },

  // États de succès, warning, erreur
  success: {
    backgroundColor: '#F0FDF4',
    borderColor: '#059669',
    color: '#059669',
  },

  warning: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
    color: '#EA580C',
  },

  error: {
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
    color: '#DC2626',
  },

  // Styles pour les loaders et spinners
  loading: {
    opacity: 0.6,
  },

  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  // Styles pour les badges et tags
  badge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Styles pour les dividers/séparateurs
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },

  dividerVertical: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },

  // Styles pour les overlays
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Styles pour les tooltips et popovers
  tooltip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    maxWidth: 200,
  },

  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },

  // Styles pour les accordéons et collapsibles
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  accordionContent: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  // Styles pour les progress bars
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },

  // Styles pour les ratings et étoiles
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  star: {
    fontSize: 16,
    color: '#FCD34D',
  },

  starEmpty: {
    fontSize: 16,
    color: '#E5E7EB',
  },

  // Styles pour les notifications toast
  toast: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 9999,
  },

  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },

  toastSuccess: {
    backgroundColor: '#059669',
  },

  toastError: {
    backgroundColor: '#DC2626',
  },

  toastWarning: {
    backgroundColor: '#EA580C',
  },

  // Styles pour les FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  fabIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },

  // Styles pour les chips/tags
  chip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },

  chipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },

  chipSelected: {
    backgroundColor: '#3B82F6',
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },

  // Styles pour les listes et éléments de liste
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  listItemIcon: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },

  listItemContent: {
    flex: 1,
  },

  listItemTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },

  listItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  listItemAction: {
    marginLeft: 12,
  },

  // Styles pour les segments/tabs horizontaux
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },

  segmentedOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  segmentedOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  segmentedOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  segmentedOptionTextActive: {
    color: '#1F2937',
  },

  // Styles pour les cartes avec actions
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  actionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  actionCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  actionCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  actionCardContent: {
    marginBottom: 16,
  },

  actionCardActions: {
    flexDirection: 'row',
    gap: 8,
  },

  // Fermeture du StyleSheet
});