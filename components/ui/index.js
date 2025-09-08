// src/components/ui/index.js
// Composants UI robustes et testés pour PetFinder

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// ===== COMPOSANT BUTTON =====
export const Button = ({ 
  title, 
  onPress, 
  loading = false, 
  style = {}, 
  disabled = false,
  variant = 'primary' // primary, secondary, danger
}) => {
  const getButtonStyle = () => {
    let baseStyle = [styles.button];
    
    // Styles selon la variante
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'danger':
        baseStyle.push(styles.buttonDanger);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }
    
    // Style désactivé
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    // Style personnalisé
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    let textStyle = [styles.buttonText];
    
    if (variant === 'secondary') {
      textStyle.push(styles.buttonTextSecondary);
    }
    
    return textStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? '#3B82F6' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// ===== COMPOSANT INPUT =====
export const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  style = {},
  error = '',
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  ...otherProps 
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {/* Label */}
      {label && (
        <Text style={styles.inputLabel}>{label}</Text>
      )}
      
      {/* Input */}
      <TextInput
        style={[
          styles.input, 
          error ? styles.inputError : null,
          multiline ? styles.inputMultiline : null
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...otherProps}
      />
      
      {/* Message d'erreur */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

// ===== COMPOSANT CARD =====
export const Card = ({ 
  children, 
  style = {},
  onPress = null 
}) => {
  // Si onPress est fourni, utiliser TouchableOpacity, sinon View
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {children}
    </CardComponent>
  );
};

// ===== STYLES POUR LES COMPOSANTS =====
const styles = StyleSheet.create({
  // ===== STYLES BUTTON =====
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 48,
  },
  
  buttonPrimary: {
    backgroundColor: '#3B82F6',
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    borderColor: '#9CA3AF',
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  buttonTextSecondary: {
    color: '#3B82F6',
  },

  // ===== STYLES INPUT =====
  inputContainer: {
    marginBottom: 16,
  },
  
  inputLabel: {
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
  
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },

  // ===== STYLES CARD =====
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
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
});