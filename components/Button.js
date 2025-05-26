// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, shadows } from '../theme/colors';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.text.inverse : colors.primary.main} 
        />
      ) : (
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...shadows.small,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary.main,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  
  // Text styles
  text: {
    ...typography.callout,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlinedText: {
    color: colors.primary.main,
  },
  ghostText: {
    color: colors.primary.main,
  },
  
  // Size-specific text
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 17,
    fontWeight: '700',
  },
  
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});