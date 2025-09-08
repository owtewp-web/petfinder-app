// ================================
// src/utils/helpers.js - Fonctions utilitaires
// ================================

import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formatage des dates
export const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
};

export const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true, 
    locale: fr 
  });
};

// Calcul de distance entre deux points (formule de Haversine)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Arrondir à 1 décimale
};

// Génération d'avatars par défaut
export const getDefaultAvatar = (name) => {
  const avatars = ['👤', '👨', '👩', '🧑', '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳'];
  const index = name.charCodeAt(0) % avatars.length;
  return avatars[index];
};

// Validation des emails
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation des téléphones français
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

// Calcul du niveau utilisateur
export const calculateUserLevel = (points) => {
  const levels = USER_LEVELS.slice().reverse();
  const currentLevel = levels.find(level => points >= level.minPoints);
  return currentLevel || USER_LEVELS[0];
};

// Calcul du prochain niveau
export const getNextLevel = (currentLevel) => {
  const currentIndex = USER_LEVELS.findIndex(level => level.level === currentLevel);
  return USER_LEVELS[currentIndex + 1] || null;
};

// Formatage des points
export const formatPoints = (points) => {
  return points.toLocaleString('fr-FR');
};

// Génération d'ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};