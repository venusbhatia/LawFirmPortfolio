import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import databaseService from '../database';

const AppointmentBookingScreen = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    date: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!form.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    if (!form.email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    if (!form.phone.trim()) {
      Alert.alert('Validation Error', 'Please enter your phone number');
      return false;
    }
    if (!form.date.trim()) {
      Alert.alert('Validation Error', 'Please enter your preferred date and time');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const appointmentId = await databaseService.createAppointment({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date.trim(),
        message: form.message.trim()
      });

      Alert.alert(
        'Appointment Requested', 
        `Thank you ${form.name}! Your appointment request has been submitted successfully. We will contact you soon to confirm your appointment.`,
        [{ text: 'OK', style: 'default' }]
      );

      // Reset form
      setForm({ name: '', email: '', phone: '', date: '', message: '' });
      
      console.log('Appointment created with ID:', appointmentId);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      Alert.alert(
        'Submission Error', 
        'There was an error submitting your appointment. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (placeholder, key, options = {}) => {
    const isFocused = focusedField === key;
    const hasValue = form[key].length > 0;
    
    return (
      <View style={styles.inputContainer}>
        <View style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          hasValue && styles.inputFilled
        ]}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            value={form[key]}
            onChangeText={text => handleChange(key, text)}
            onFocus={() => setFocusedField(key)}
            onBlur={() => setFocusedField(null)}
            editable={!isSubmitting}
            {...options}
          />
          {hasValue && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => handleChange(key, '')}
            >
              <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Card variant="blur" style={styles.headerCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={32} color={colors.primary.main} />
            </View>
            <Text style={styles.title}>Book an Appointment</Text>
            <Text style={styles.subtitle}>
              Schedule a consultation with our legal experts
            </Text>
          </Card>
          
          <Card variant="elevated" style={styles.formCard}>
            {renderInput('Full Name *', 'name', {
              autoCapitalize: 'words',
              textContentType: 'name'
            })}
            
            {renderInput('Email Address *', 'email', {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              textContentType: 'emailAddress'
            })}
            
            {renderInput('Phone Number *', 'phone', {
              keyboardType: 'phone-pad',
              textContentType: 'telephoneNumber'
            })}
            
            {renderInput('Preferred Date & Time *', 'date', {
              placeholder: 'e.g., Monday, Jan 15 at 2:00 PM'
            })}
            
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                styles.textAreaWrapper,
                focusedField === 'message' && styles.inputFocused,
                form.message.length > 0 && styles.inputFilled
              ]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Additional Message (Optional)"
                  placeholderTextColor={colors.text.tertiary}
                  value={form.message}
                  onChangeText={text => handleChange('message', text)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  multiline
                  textAlignVertical="top"
                  editable={!isSubmitting}
                />
                {form.message.length > 0 && (
                  <TouchableOpacity 
                    style={[styles.clearButton, styles.textAreaClear]}
                    onPress={() => handleChange('message', '')}
                  >
                    <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            <Button 
              title={isSubmitting ? 'Submitting...' : 'Submit Request'}
              onPress={handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
              size="large"
              style={styles.submitButton}
            />
            
            <View style={styles.noteContainer}>
              <Ionicons name="information-circle-outline" size={16} color={colors.text.tertiary} />
              <Text style={styles.note}>
                Required fields marked with *. We'll contact you within 24 hours to confirm.
              </Text>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...shadows.small,
  },
  title: {
    ...typography.title1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.callout,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: 16,
    minHeight: 48,
    ...shadows.small,
  },
  inputFocused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.background.tertiary,
    ...shadows.medium,
  },
  inputFilled: {
    backgroundColor: colors.background.tertiary,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    paddingVertical: 12,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    minHeight: 80,
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 56,
    textAlignVertical: 'top',
  },
  clearButton: {
    padding: 4,
  },
  textAreaClear: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  submitButton: {
    marginVertical: 16,
    backgroundColor: colors.primary.main,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primary.light,
    opacity: 0.9,
  },
  note: {
    ...typography.caption1,
    color: colors.text.secondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
});

export default AppointmentBookingScreen;