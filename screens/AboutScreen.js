import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>About Our Law Firm</Text>
          <Text style={styles.description}>
            Trusted legal representation since 1992. Our team brings decades of experience, professionalism, and compassion to every case.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1992</Text>
              <Text style={styles.statLabel}>Founded</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>30+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Cases Won</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            To uphold justice and deliver client-focused legal solutions that make a real difference. We pride ourselves on professionalism, ethics, and empathy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 32,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#35507b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#182848',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 1.2,
    fontFamily: 'System',
  },
  description: {
    color: '#35507b',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 25,
    fontWeight: '500',
    opacity: 0.85,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    marginTop: 8,
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginHorizontal: 4,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: '#e5e7ef',
  },
  statNumber: {
    fontSize: 22,
    color: '#182848',
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  statLabel: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginVertical: 22,
    borderRadius: 1,
    width: '70%',
    alignSelf: 'center',
  },
  missionTitle: {
    fontSize: 21,
    color: '#182848',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'System',
  },
  missionText: {
    color: '#35507b',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.85,
    fontWeight: '500',
  },
});

export default AboutScreen;
