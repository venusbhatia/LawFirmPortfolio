import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LawyerDetailScreen = ({ route, navigation }) => {
  const { lawyer } = route.params || {};

  // Handle case where lawyer is undefined
  if (!lawyer) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Lawyer information not found</Text>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleEmailPress = async () => {
    if (lawyer.email) {
      const emailUrl = `mailto:${lawyer.email}`;
      try {
        await Linking.openURL(emailUrl);
      } catch (error) {
        Alert.alert('Error', 'Could not open email client');
      }
    }
  };

  const handlePhonePress = async () => {
    if (lawyer.phone) {
      const phoneUrl = `tel:${lawyer.phone}`;
      try {
        await Linking.openURL(phoneUrl);
      } catch (error) {
        Alert.alert('Error', 'Could not open phone dialer');
      }
    }
  };

  const handleBookAppointment = () => {
    navigation.navigate('AppointmentBooking');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: lawyer.image }} style={styles.image} />
        <Text style={styles.name}>{lawyer.name}</Text>
        <Text style={styles.specialty}>{lawyer.specialty}</Text>
        <View style={styles.divider} />
        <Text style={styles.experience}>{lawyer.experience} of experience</Text>
        
        {/* Contact Information */}
        <View style={styles.contactSection}>
          {lawyer.email && (
            <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
              <Ionicons name="mail-outline" size={20} color="#d4af37" />
              <Text style={styles.contactText}>{lawyer.email}</Text>
            </TouchableOpacity>
          )}
          
          {lawyer.phone && (
            <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
              <Ionicons name="call-outline" size={20} color="#d4af37" />
              <Text style={styles.contactText}>{lawyer.phone}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Biography */}
        <Text style={styles.bio}>
          {lawyer.bio || `${lawyer.name} is an experienced ${lawyer.specialty} attorney who has been helping clients for ${lawyer.experience}. Trusted and respected in the legal field.`}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBookAppointment}>
            <Ionicons name="calendar-outline" size={20} color="#182848" />
            <Text style={styles.primaryButtonText}>Book Appointment</Text>
          </TouchableOpacity>
          
          {lawyer.email && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleEmailPress}>
              <Ionicons name="mail-outline" size={18} color="#d4af37" />
              <Text style={styles.secondaryButtonText}>Send Email</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1c3c',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(24, 40, 72, 0.97)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#d4af37',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 1,
    textAlign: 'center',
  },
  specialty: {
    fontSize: 18,
    color: '#d4af37',
    marginTop: 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginVertical: 16,
    borderRadius: 1,
    width: '60%',
  },
  experience: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactSection: {
    width: '100%',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 80, 123, 0.5)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  bio: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#d4af37',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#182848',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  secondaryButtonText: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LawyerDetailScreen;
