import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 16) / 2;

const NAV_ITEMS = [
  { 
    label: 'About Us', 
    icon: 'information-circle', 
    screen: 'About',
    color: '#4338CA'
  },
  { 
    label: 'Our Lawyers', 
    icon: 'people', 
    screen: 'Lawyers',
    color: '#0891B2'
  },
  { 
    label: 'Practice Areas', 
    icon: 'briefcase', 
    screen: 'PracticeAreas',
    color: '#0E7490'
  },
  { 
    label: 'Contact Us', 
    icon: 'call', 
    screen: 'Contact',
    color: '#0D9488'
  }
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Image 
                source={require('../assets/lady_justice_logo.png')} 
                style={styles.logo}
              />
            </View>
            <View style={styles.logoGlow} />
          </View>
          
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleHighlight}>Justice.</Text>{' '}
            <Text style={styles.heroTitleHighlight}>Expertise.</Text>{' '}
            <Text style={styles.heroTitleHighlight}>Trust.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>Your trusted legal partner since 1992</Text>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('AppointmentBooking')}
            style={styles.heroButton}
            activeOpacity={0.8}
          >
            <View style={styles.buttonBackground}>
              <Text style={styles.buttonText}>Book a Consultation</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text.inverse} style={styles.buttonIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Main Actions Grid */}
        <View style={styles.gridSection}>
          {NAV_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => navigation.navigate(item.screen)}
              style={[styles.gridCard, { backgroundColor: item.color }]}
              activeOpacity={0.9}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={item.icon} 
                    size={32} 
                    color={colors.text.inverse}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.text.inverse}
                  style={styles.cardArrow}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1992</Text>
                <Text style={styles.statLabel}>Founded</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>30+</Text>
                <Text style={styles.statLabel}>Years</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>Cases Won</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.socialRow}>
            {['logo-linkedin', 'logo-twitter', 'logo-facebook'].map((icon, idx) => (
              <TouchableOpacity 
                key={icon} 
                style={styles.socialButton}
                activeOpacity={0.8}
              >
                <View style={styles.socialContent}>
                  <Ionicons name={icon} size={20} color={colors.text.accent} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.footerText}>© 2024 LegalCare Professional Services</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F1F5F9',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 32,
    alignItems: 'center',
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.secondary.main,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  logoGlow: {
    position: 'absolute',
    top: -10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.secondary.main,
    opacity: 0.15,
    zIndex: -1,
  },
  heroTitle: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 48,
  },
  heroTitleHighlight: {
    color: colors.primary.main,
    fontWeight: '900',
  },
  heroSubtitle: {
    ...typography.title3,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  heroButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent.main,
    ...Platform.select({
      ios: {
        shadowColor: colors.accent.main,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    ...typography.headline,
    color: colors.text.inverse,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  gridSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  gridCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.8,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginBottom: 12,
  },
  icon: {
    opacity: 0.9,
  },
  gridLabel: {
    ...typography.headline,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  cardArrow: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    opacity: 0.8,
  },
  statsSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  statsCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#F8FAFC',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary.main,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border.light,
    marginHorizontal: 8,
  },
  footer: {
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.secondary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    ...typography.footnote,
    color: colors.text.tertiary,
  },
});

export default HomeScreen;