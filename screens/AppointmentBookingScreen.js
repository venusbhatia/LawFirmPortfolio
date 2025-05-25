import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import databaseService from '../database';

const AppointmentBookingScreen = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Book an Appointment</Text>
        <View style={styles.divider} />
        
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          placeholderTextColor="#bbb"
          value={form.name}
          onChangeText={text => handleChange('name', text)}
          editable={!isSubmitting}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email Address *"
          placeholderTextColor="#bbb"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isSubmitting}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          placeholderTextColor="#bbb"
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
          keyboardType="phone-pad"
          editable={!isSubmitting}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Preferred Date & Time *"
          placeholderTextColor="#bbb"
          value={form.date}
          onChangeText={text => handleChange('date', text)}
          editable={!isSubmitting}
        />
        
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Additional Message (Optional)"
          placeholderTextColor="#bbb"
          value={form.message}
          onChangeText={text => handleChange('message', text)}
          multiline
          textAlignVertical="top"
          editable={!isSubmitting}
        />
        
        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.note}>
          * Required fields. We'll contact you within 24 hours to confirm your appointment.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0c1c3c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(24, 40, 72, 0.97)',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginBottom: 18,
    borderRadius: 1,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#22335a',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#d4af37',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#8a7324',
    opacity: 0.7,
  },
  buttonText: {
    color: '#182848',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  note: {
    color: '#bbb',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default AppointmentBookingScreen;