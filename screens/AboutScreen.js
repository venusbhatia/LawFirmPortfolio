import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="blur" style={styles.heroCard}>
          <Text style={styles.title}>About LegalCare</Text>
          <Text style={styles.description}>
            Trusted legal representation since 1992. Our team brings decades of experience, 
            professionalism, and compassion to every case we handle.
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
        </Card>

        <Card variant="elevated" style={styles.missionCard}>
          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            To uphold justice and deliver client-focused legal solutions that make a real difference. 
            We pride ourselves on professionalism, ethics, and unwavering commitment to our clients.
          </Text>
        </Card>

        <Card variant="outlined" style={styles.valuesCard}>
          <Text style={styles.valuesTitle}>Our Values</Text>
          
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
        </Card>
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
  heroCard: {
    padding: 32,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '800',
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 6,
    ...shadows.small,
    borderWidth: 0.5,
    borderColor: colors.border.light,
  },
  statNumber: {
    ...typography.title2,
    color: colors.primary.main,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption1,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  missionCard: {
    padding: 24,
    marginBottom: 20,
  },
  missionTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginBottom: 12,
    fontWeight: '700',
  },
  missionText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  valuesCard: {
    padding: 24,
    marginBottom: 20,
  },
  valuesTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginBottom: 20,
    fontWeight: '700',
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...shadows.small,
  },
  valueEmoji: {
    fontSize: 24,
  },
  valueContent: {
    flex: 1,
    paddingTop: 2,
  },
  valueLabel: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: 4,
    fontWeight: '600',
  },
  valueDescription: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default AboutScreen;