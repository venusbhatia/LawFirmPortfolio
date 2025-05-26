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
    borderRadius: 20,
    padding: 20,
    ...shadows.card,
  },
  default: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  elevated: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.medium,
    ...shadows.medium,
  },
  outlined: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  blur: {
    backgroundColor: colors.background.blur,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.large,
  },
  glass: {
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.glow,
  },
});