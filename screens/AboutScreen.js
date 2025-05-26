import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';

const AboutScreen = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Text style={styles.title}>About LegalCare</Text>
        <Text style={styles.description}>
          Trusted legal representation since 1992. Our team brings decades of experience, 
          professionalism, and compassion to every case we handle.
        </Text>
      </View>

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

      <View style={styles.contentSection}>
        <View style={styles.missionCard}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            To uphold justice and deliver client-focused legal solutions that make a real difference. 
            We pride ourselves on professionalism, ethics, and unwavering commitment to our clients.
          </Text>
        </View>

        <View style={styles.valuesSection}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueEmoji}>⚖️</Text>
            </View>
            <View style={styles.valueContent}>
              <Text style={styles.valueLabel}>Justice</Text>
              <Text style={styles.valueDescription}>
                Committed to fairness and equality in every case
              </Text>
            </View>
          </View>

          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueEmoji}>🤝</Text>
            </View>
            <View style={styles.valueContent}>
              <Text style={styles.valueLabel}>Trust</Text>
              <Text style={styles.valueDescription}>
                Building lasting relationships through transparency
              </Text>
            </View>
          </View>

          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueEmoji}>💡</Text>
            </View>
            <View style={styles.valueContent}>
              <Text style={styles.valueLabel}>Excellence</Text>
              <Text style={styles.valueDescription}>
                Delivering exceptional results with expertise
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#F1F5F9',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  statsCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
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
  contentSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  missionCard: {
    padding: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    marginBottom: 32,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  missionText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  valuesSection: {
    padding: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
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
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
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
  valueEmoji: {
    fontSize: 24,
  },
  valueContent: {
    flex: 1,
    paddingTop: 2,
  },
  valueLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default AboutScreen;