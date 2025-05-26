// components/Card.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors, shadows } from '../theme/colors';

export const Card = ({ 
  children, 
  style, 
  variant = 'default', 
  onPress, 
  ...props 
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[
        styles.base,
        styles[variant],
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    padding: 16,
    ...shadows.card,
  },
  default: {
    backgroundColor: colors.background.card,
    borderWidth: 0.5,
    borderColor: colors.border.light,
  },
  elevated: {
    backgroundColor: colors.background.elevated,
    ...shadows.medium,
  },
  outlined: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  blur: {
    backgroundColor: colors.background.blur,
    ...shadows.large,
  },
});