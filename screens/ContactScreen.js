import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const ContactScreen = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:info@legalcare.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleLocationPress = () => {
    const address = '123 Wentworth Crescent, Thunder Bay, ON';
    const url = Platform.OS === 'ios' 
      ? `maps:0,0?q=${encodeURIComponent(address)}`
      : `geo:0,0?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="blur" style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="call-outline" size={32} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>We're here to help you every step of the way</Text>
        </Card>

        <Card variant="elevated" style={styles.contactCard}>
          <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
            <View style={styles.contactIcon}>
              <Ionicons name="location-outline" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Visit Our Office</Text>
              <Text style={styles.contactText}>123 Wentworth Crescent{'\n'}Thunder Bay, ON</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <View style={styles.contactIcon}>
              <Ionicons name="call-outline" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Call Us</Text>
              <Text style={styles.contactText}>+1 (234) 567-890</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <View style={styles.contactIcon}>
              <Ionicons name="mail-outline" size={24} color={colors.primary.main} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email Us</Text>
              <Text style={styles.contactText}>info@legalcare.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </Card>

        <Card variant="outlined" style={styles.hoursCard}>
          <View style={styles.hoursHeader}>
            <Ionicons name="time-outline" size={24} color={colors.primary.main} />
            <Text style={styles.sectionTitle}>Business Hours</Text>
          </View>
          
          <View style={styles.hoursContainer}>
            <View style={styles.hoursRow}>
              <Text style={styles.day}>Monday - Friday</Text>
              <Text style={styles.hours}>9:00 AM - 6:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.day}>Saturday</Text>
              <Text style={styles.hours}>10:00 AM - 4:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.dayInactive}>Sunday</Text>
              <Text style={styles.hoursInactive}>Closed</Text>
            </View>
          </View>
        </Card>

        <Card variant="blur" style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="alert-circle-outline" size={24} color={colors.warning} />
            <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          </View>
          <Text style={styles.emergencyText}>
            For urgent legal matters outside business hours, please call our emergency line:
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Linking.openURL('tel:+1234567999')}
          >
            <Ionicons name="call" size={20} color={colors.text.inverse} />
            <Text style={styles.emergencyButtonText}>+1 (234) 567-999</Text>
          </TouchableOpacity>
        </Card>

        <Button
          title="Schedule a Consultation"
          onPress={() => navigation.navigate('AppointmentBooking')}
          size="large"
          style={styles.scheduleButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
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
  contactCard: {
    padding: 0,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...shadows.small,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: 4,
    fontWeight: '600',
  },
  contactText: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.border.light,
    marginHorizontal: 20,
  },
  hoursCard: {
    padding: 20,
    marginBottom: 20,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text.primary,
    marginLeft: 12,
    fontWeight: '600',
  },
  hoursContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  day: {
    ...typography.callout,
    color: colors.text.primary,
    fontWeight: '500',
  },
  dayInactive: {
    ...typography.callout,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  hours: {
    ...typography.callout,
    color: colors.text.secondary,
  },
  hoursInactive: {
    ...typography.callout,
    color: colors.text.tertiary,
  },
  emergencyCard: {
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.warning,
    backgroundColor: 'rgba(255, 149, 0, 0.05)',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    ...typography.headline,
    color: colors.text.primary,
    marginLeft: 12,
    fontWeight: '600',
  },
  emergencyText: {
    ...typography.callout,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warning,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    ...shadows.small,
  },
  emergencyButtonText: {
    ...typography.callout,
    color: colors.text.inverse,
    fontWeight: '600',
    marginLeft: 8,
  },
  scheduleButton: {
    marginTop: 8,
  },
});

export default ContactScreen;