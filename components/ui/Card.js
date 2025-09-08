// src/components/ui/Card.js (Version corrigée)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ 
  children, 
  style = {}, 
  onPress = null,
  shadow = true,
  padding = true,
  ...props 
}) => {
  const cardStyle = [
    styles.card,
    shadow && styles.shadow,
    padding && styles.padding,
    style
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.9}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

// Composant StatCard séparé
const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'blue',
  onPress = null,
  style = {}
}) => {
  const colorStyles = {
    blue: { backgroundColor: '#dbeafe', iconColor: '#2563eb' },
    green: { backgroundColor: '#dcfce7', iconColor: '#16a34a' },
    orange: { backgroundColor: '#fed7aa', iconColor: '#ea580c' },
    purple: { backgroundColor: '#e9d5ff', iconColor: '#9333ea' },
    red: { backgroundColor: '#fecaca', iconColor: '#dc2626' },
  };

  const currentColor = colorStyles[color] || colorStyles.blue;

  return (
    <Card 
      onPress={onPress}
      style={[styles.statCard, style]}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: currentColor.backgroundColor }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
      )}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: currentColor.iconColor }]}>
          {subtitle}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  padding: {
    padding: 16,
  },
  statCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Card;
export { StatCard };