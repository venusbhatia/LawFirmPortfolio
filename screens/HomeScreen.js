import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');

const NAV_ITEMS = [
  { label: 'About Us', icon: 'information-circle-outline', screen: 'About', gradient: ['#007AFF', '#5AC8FA'] },
  { label: 'Our Lawyers', icon: 'people-outline', screen: 'Lawyers', gradient: ['#34C759', '#30D158'] },
  { label: 'Practice Areas', icon: 'briefcase-outline', screen: 'PracticeAreas', gradient: ['#FF9F0A', '#FFD60A'] },
  { label: 'Contact Us', icon: 'call-outline', screen: 'Contact', gradient: ['#FF453A', '#FF6B47'] },
  { label: 'FAQ', icon: 'help-circle-outline', screen: 'FAQ', gradient: ['#AF52DE', '#BF5AF2'] },
  { label: 'Book Appointment', icon: 'calendar-outline', screen: 'AppointmentBooking', gradient: ['#64D2FF', '#007AFF'] },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Premium Navigation Bar */}
          <View style={styles.navBar}>
            <Text style={styles.navTitle}>LegalCare</Text>
            <View style={styles.navAccent} />
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoGlow} />
              <Image 
                source={require('../assets/lady_justice_logo.png')} 
                style={styles.logo}
              />
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

          {/* Premium Grid */}
          <View style={styles.gridSection}>
            {NAV_ITEMS.map((item, idx) => (
              <Card
                key={item.label}
                variant="glass"
                onPress={() => navigation.navigate(item.screen)}
                style={styles.gridCard}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.gradient[0] + '20' }]}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={item.gradient[0]} 
                  />
                  <View style={[styles.iconGlow, { backgroundColor: item.gradient[0] }]} />
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <View style={styles.cardShimmer} />
              </Card>
            ))}
          </View>

          {/* Elegant Stats */}
          <Card variant="glass" style={styles.statsCard}>
            <Text style={styles.statsTitle}>Our Excellence</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>30+</Text>
                <Text style={styles.statLabel}>Years</Text>
                <View style={[styles.statGlow, { backgroundColor: colors.primary.main }]} />
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Cases Won</Text>
                <View style={[styles.statGlow, { backgroundColor: colors.success }]} />
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
                <View style={[styles.statGlow, { backgroundColor: colors.gold }]} />
              </View>
            </View>
          </Card>

          {/* Premium Footer */}
          <View style={styles.footer}>
            <View style={styles.socialRow}>
              {['logo-linkedin', 'logo-twitter', 'logo-facebook'].map((icon, idx) => (
                <TouchableOpacity key={idx} style={styles.socialButton}>
                  <Ionicons name={icon} size={20} color={colors.primary.main} />
                  <View style={styles.socialGlow} />
                </TouchableOpacity>
              ))}
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
    backgroundColor: colors.background.primary,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: colors.primary.main,
    top: -150,
    right: -150,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: colors.success,
    bottom: 100,
    left: -100,
  },
  circle3: {
    width: 150,
    height: 150,
    backgroundColor: colors.gold,
    top: '50%',
    right: -75,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  navBar: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  navTitle: {
    ...typography.title1,
    color: colors.text.primary,
    fontWeight: '800',
  },
  navAccent: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 3,
    backgroundColor: colors.primary.main,
    borderRadius: 2,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  logoGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 80,
    backgroundColor: colors.primary.main,
    opacity: 0.2,
    ...shadows.glow,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 60,
    backgroundColor: colors.background.glass,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  heroTitle: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '900',
  },
  heroSubtitle: {
    ...typography.title3,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '500',
  },
  heroButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  gridSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  gridCard: {
    width: (width - 60) / 2,
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    ...shadows.medium,
  },
  iconGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 25,
    opacity: 0.3,
  },
  gridLabel: {
    ...typography.callout,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
    zIndex: 1,
  },
  cardShimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    right: -100,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-15deg' }],
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 30,
  },
  statsTitle: {
    ...typography.title2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 25,
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
    position: 'relative',
  },
  statNumber: {
    ...typography.largeTitle,
    color: colors.text.primary,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption1,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  statGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 50,
    opacity: 0.1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border.medium,
    marginHorizontal: 15,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    position: 'relative',
    ...shadows.medium,
  },
  socialGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 27,
    backgroundColor: colors.primary.main,
    opacity: 0.2,
  },
  footerText: {
    ...typography.caption1,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});center',
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
    backgroundColor: colors.primary.main,
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
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.light,
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
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.light,
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
    backgroundColor: colors.border.medium,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
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
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  footerText: {
    ...typography.caption1,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});

export default HomeScreen;