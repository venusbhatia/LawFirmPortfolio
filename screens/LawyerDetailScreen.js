import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const LawyerImage = ({ source, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[style, { overflow: 'hidden' }]}>
      <Image 
        source={source}
        style={[style, { position: 'absolute' }]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={(error) => {
          console.log('Image failed to load:', error);
          setHasError(true);
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <View style={[style, styles.imagePlaceholder]}>
          <ActivityIndicator size="small" color={colors.primary.main} />
        </View>
      )}
      {hasError && (
        <View style={[style, styles.imagePlaceholder]}>
          <Ionicons name="person" size={40} color={colors.text.secondary} />
        </View>
      )}
    </View>
  );
};

const LawyerDetailScreen = ({ route, navigation }) => {
  const { lawyer } = route.params || {};

  // Handle case where lawyer is undefined
  if (!lawyer) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Card variant="elevated" style={styles.errorCard}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.errorTitle}>Lawyer Not Found</Text>
          <Text style={styles.errorText}>The lawyer information could not be loaded.</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.errorButton}
          />
        </Card>
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
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card variant="blur" style={styles.profileCard}>
          <View style={styles.imageContainer}>
            <LawyerImage source={lawyer.image} style={styles.image} />
            <View style={styles.onlineIndicator} />
          </View>
          
          <Text style={styles.name}>{lawyer.name}</Text>
          
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialty}>{lawyer.specialty}</Text>
          </View>
          
          <View style={styles.experienceContainer}>
            <Ionicons name="briefcase-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.experience}>{lawyer.experience} of experience</Text>
          </View>
        </Card>

        {/* Contact Information */}
        <Card variant="elevated" style={styles.contactCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          {lawyer.email && (
            <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail-outline" size={20} color={colors.primary.main} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{lawyer.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
          
          {lawyer.phone && (
            <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
              <View style={styles.contactIcon}>
                <Ionicons name="call-outline" size={20} color={colors.primary.main} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{lawyer.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </Card>

        {/* Biography */}
        <Card variant="outlined" style={styles.bioCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>
            {lawyer.bio || `${lawyer.name} is an experienced ${lawyer.specialty} attorney who has been helping clients for ${lawyer.experience}. With a commitment to excellence and client satisfaction, ${lawyer.name.split(' ')[0]} provides trusted legal representation and guidance tailored to each client's unique needs.`}
          </Text>
        </Card>

        {/* Expertise */}
        <Card variant="elevated" style={styles.expertiseCard}>
          <Text style={styles.sectionTitle}>Areas of Expertise</Text>
          <View style={styles.expertiseGrid}>
            <View style={styles.expertiseItem}>
              <View style={styles.expertiseIcon}>
                <Text style={styles.expertiseEmoji}>⚖️</Text>
              </View>
              <Text style={styles.expertiseText}>Legal Consultation</Text>
            </View>
            <View style={styles.expertiseItem}>
              <View style={styles.expertiseIcon}>
                <Text style={styles.expertiseEmoji}>📋</Text>
              </View>
              <Text style={styles.expertiseText}>Case Analysis</Text>
            </View>
            <View style={styles.expertiseItem}>
              <View style={styles.expertiseIcon}>
                <Text style={styles.expertiseEmoji}>🏛️</Text>
              </View>
              <Text style={styles.expertiseText}>Court Representation</Text>
            </View>
            <View style={styles.expertiseItem}>
              <View style={styles.expertiseIcon}>
                <Text style={styles.expertiseEmoji}>📄</Text>
              </View>
              <Text style={styles.expertiseText}>Legal Documentation</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Book Appointment"
            onPress={handleBookAppointment}
            size="large"
            style={styles.primaryAction}
          />
          
          <View style={styles.secondaryActions}>
            {lawyer.email && (
              <Button
                title="Send Email"
                onPress={handleEmailPress}
                variant="outlined"
                style={styles.secondaryAction}
              />
            )}
            {lawyer.phone && (
              <Button
                title="Call Now"
                onPress={handlePhonePress}
                variant="outlined"
                style={styles.secondaryAction}
              />
            )}
          </View>
        </View>
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
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCard: {
    alignItems: 'center',
    padding: 32,
    margin: 20,
  },
  errorTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '700',
  },
  errorText: {
    ...typography.callout,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    marginTop: 8,
  },
  profileCard: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: colors.background.secondary,
    ...shadows.large,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    borderWidth: 3,
    borderColor: colors.background.card,
  },
  name: {
    ...typography.title1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '800',
  },
  specialtyBadge: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  specialty: {
    ...typography.callout,
    color: colors.primary.main,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experience: {
    ...typography.callout,
    color: colors.text.secondary,
    marginLeft: 6,
  },
  contactCard: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: 16,
    fontWeight: '700',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    ...typography.subhead,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  contactValue: {
    ...typography.callout,
    color: colors.text.primary,
    fontWeight: '500',
  },
  bioCard: {
    padding: 20,
    marginBottom: 20,
  },
  bio: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  expertiseCard: {
    padding: 20,
    marginBottom: 24,
  },
  expertiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  expertiseItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  expertiseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.small,
  },
  expertiseEmoji: {
    fontSize: 20,
  },
  expertiseText: {
    ...typography.caption1,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionButtons: {
    marginBottom: 20,
  },
  primaryAction: {
    marginBottom: 16,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
  },
  imagePlaceholder: {
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LawyerDetailScreen;