import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  ScrollView,
  LinearGradient,
  BlurView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const NAV_ITEMS = [
  { label: 'About Us', icon: 'information-circle-outline', screen: 'About' },
  { label: 'Our Lawyers', icon: 'people-outline', screen: 'Lawyers' },
  { label: 'Practice Areas', icon: 'briefcase-outline', screen: 'PracticeAreas' },
  { label: 'Contact Us', icon: 'call-outline', screen: 'Contact' },
  { label: 'FAQ', icon: 'help-circle-outline', screen: 'FAQ' },
  { label: 'Book Appointment', icon: 'calendar-outline', screen: 'AppointmentBooking' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={styles.backgroundGradient} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Navigation Bar */}
          <View style={styles.navBar}>
            <Text style={styles.navTitle}>LegalCare</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/lady_justice_logo.png')} 
                style={styles.logo}
              />
              <View style={styles.logoGlow} />
            </View>
            
            <Text style={styles.heroTitle}>Justice. Expertise. Trust.</Text>
            <Text style={styles.heroSubtitle}>Your trusted legal partner since 1992</Text>
            
            <Button 
              title="Book a Consultation"
              onPress={() => navigation.navigate('AppointmentBooking')}
              size="large"
              style={styles.heroButton}
            />
          </View>

          {/* Main Actions Grid */}
          <View style={styles.gridSection}>
            {NAV_ITEMS.map((item, idx) => (
              <Card
                key={item.label}
                variant="blur"
                onPress={() => navigation.navigate(item.screen)}
                style={styles.gridCard}
              >
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={item.icon} 
                    size={28} 
                    color={colors.primary.main} 
                  />
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </Card>
            ))}
          </View>

          {/* Stats Section */}
          <Card variant="elevated" style={styles.statsCard}>
            <Text style={styles.statsTitle}>Our Track Record</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>30+</Text>
                <Text style={styles.statLabel}>Years</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Cases Won</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-linkedin" size={20} color={colors.primary.main} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={20} color={colors.primary.main} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color={colors.primary.main} />
              </TouchableOpacity>
            </View>
            <Text style={styles.footerText}>© 2024 LegalCare Professional Services</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FF',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(90, 200, 250, 0.05) 100%)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  navBar: {
    height: 60,
    backgroundColor: colors.background.blur,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
    backdropFilter: 'blur(20px)',
  },
  navTitle: {
    ...typography.title2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 60,
    backgroundColor: colors.background.card,
    ...shadows.large,
  },
  logoGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 70,
    backgroundColor: colors.primary.main,
    opacity: 0.1,
    zIndex: -1,
  },
  heroTitle: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '800',
  },
  heroSubtitle: {
    ...typography.title3,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  heroButton: {
    marginTop: 10,
    paddingHorizontal: 32,
  },
  gridSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  gridCard: {
    width: '47%',
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...shadows.small,
  },
  gridLabel: {
    ...typography.callout,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 24,
  },
  statsTitle: {
    ...typography.title3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.title1,
    color: colors.primary.main,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.footnote,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border.light,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.background.secondary,
    marginTop: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    ...shadows.small,
  },
  footerText: {
    ...typography.caption1,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});

export default HomeScreen;