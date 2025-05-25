import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <Text style={styles.navTitle}>Law Firm</Text>
        </View>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={require('../assets/lady_justice_logo.png')} style={styles.logo} />
          <Text style={styles.heroTitle}>Justice. Expertise. Trust.</Text>
          <Text style={styles.heroSubtitle}>Your trusted legal partner since 1992</Text>
        </View>
        {/* Main Actions as Grid */}
        <View style={styles.gridSection}>
          {NAV_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={styles.gridCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.85}
            >
              <Ionicons name={item.icon} size={28} color="#35507b" style={styles.gridIcon} />
              <Text style={styles.gridLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="logo-linkedin" size={22} color="#35507b" style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="logo-twitter" size={22} color="#35507b" style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="logo-facebook" size={22} color="#35507b" style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>© 2024 Law Firm Portfolio</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CARD_SIZE = (Dimensions.get('window').width - 64) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 0,
  },
  navBar: {
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#182848',
    letterSpacing: 1.1,
    fontFamily: 'System',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 18,
    borderRadius: 55,
    borderWidth: 1.5,
    borderColor: '#e5e7ef',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 30,
    color: '#182848',
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1.2,
    fontFamily: 'System',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#35507b',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    opacity: 0.8,
  },
  gridSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 32,
    gap: 12,
  },
  gridCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 0.85,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 22,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#35507b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#e5e7ef',
  },
  gridIcon: {
    marginBottom: 10,
    opacity: 0.85,
  },
  gridLabel: {
    color: '#182848',
    fontSize: 15.5,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
    fontFamily: 'System',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 18,
    opacity: 0.95,
  },
  footerText: {
    color: '#b0b4c0',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  socialIcon: {
    marginHorizontal: 10,
    opacity: 0.8,
  },
});

export default HomeScreen;
