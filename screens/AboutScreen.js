import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Card variant="glass" style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <Text style={styles.title}>About LegalCare</Text>
          <Text style={styles.description}>
            Trusted legal representation since 1992. Our team brings decades of experience, 
            professionalism, and compassion to every case we handle.
          </Text>

          <View style={styles.statsContainer}>
            {[
              { number: '1992', label: 'Founded', color: colors.primary.main },
              { number: '30+', label: 'Years', color: colors.success },
              { number: '1000+', label: 'Cases Won', color: colors.gold }
            ].map((stat, idx) => (
              <View key={idx} style={styles.statCard}>
                <Text style={[styles.statNumber, { color: stat.color }]}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={[styles.statAccent, { backgroundColor: stat.color }]} />
              </View>
            ))}
          </View>
        </Card>

        {/* Mission Card */}
        <Card variant="glass" style={styles.missionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="flag-outline" size={24} color={colors.primary.main} />
            </View>
            <Text style={styles.missionTitle}>Our Mission</Text>
          </View>
          <Text style={styles.missionText}>
            To uphold justice and deliver client-focused legal solutions that make a real difference. 
            We pride ourselves on professionalism, ethics, and unwavering commitment to our clients.
          </Text>
        </Card>

        {/* Values Grid */}
        <View style={styles.valuesSection}>
          <Text style={styles.valuesTitle}>Our Core Values</Text>
          
          {[
            { emoji: '⚖️', label: 'Justice', description: 'Committed to fairness and equality in every case', color: colors.primary.main },
            { emoji: '🤝', label: 'Trust', description: 'Building lasting relationships through transparency', color: colors.success },
            { emoji: '💡', label: 'Excellence', description: 'Delivering exceptional results with expertise', color: colors.gold },
            { emoji: '🛡️', label: 'Integrity', description: 'Maintaining the highest ethical standards', color: colors.info }
          ].map((value, idx) => (
            <Card key={idx} variant="glass" style={styles.valueCard}>
              <View style={[styles.valueIcon, { backgroundColor: value.color + '20' }]}>
                <Text style={styles.valueEmoji}>{value.emoji}</Text>
                <View style={[styles.valueGlow, { backgroundColor: value.color }]} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueLabel}>{value.label}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Timeline */}
        <Card variant="glass" style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Our Journey</Text>
          
          {[
            { year: '1992', milestone: 'Founded LegalCare with a vision for justice' },
            { year: '2000', milestone: 'Expanded to corporate law services' },
            { year: '2010', milestone: 'Reached 500+ successful cases' },
            { year: '2020', milestone: 'Digital transformation and remote services' },
            { year: '2024', milestone: 'Over 1000 cases won, continuing excellence' }
          ].map((item, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.timelineYear}>
                <Text style={styles.yearText}>{item.year}</Text>
              </View>
              <View style={styles.timelineLine} />
              <View style={styles.timelineContent}>
                <Text style={styles.milestoneText}>{item.milestone}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
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
    opacity: 0.05,
  },
  circle1: {
    width: 250,
    height: 250,
    backgroundColor: colors.primary.main,
    top: 100,
    right: -125,
  },
  circle2: {
    width: 180,
    height: 180,
    backgroundColor: colors.success,
    bottom: 200,
    left: -90,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  heroCard: {
    padding: 40,
    marginBottom: 25,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    height: 150,
    backgroundColor: colors.primary.main,
    opacity: 0.1,
    borderRadius: 100,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '900',
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 26,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
    position: 'relative',
    ...shadows.medium,
  },
  statNumber: {
    ...typography.title1,
    fontWeight: '900',
    marginBottom: 6,
  },
  statLabel: {
    ...typography.caption1,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  statAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  missionCard: {
    padding: 30,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...shadows.small,
  },
  missionTitle: {
    ...typography.title2,
    color: colors.text.primary,
    fontWeight: '700',
  },
  missionText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 26,
  },
  valuesSection: {
    marginBottom: 25,
  },
  valuesTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    marginBottom: 15,
  },
  valueIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    position: 'relative',
    ...shadows.small,
  },
  valueEmoji: {
    fontSize: 28,
    zIndex: 1,
  },
  valueGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 23,
    opacity: 0.2,
  },
  valueContent: {
    flex: 1,
  },
  valueLabel: {
    ...typography.headline,
    color: colors.text.primary,
    marginBottom: 6,
    fontWeight: '700',
  },
  valueDescription: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  timelineCard: {
    padding: 30,
    marginBottom: 20,
  },
  timelineTitle: {
    ...typography.title2,
    color: colors.text.primary,
    marginBottom: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timelineYear: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  yearText: {
    ...typography.subhead,
    color: colors.text.primary,
    fontWeight: '700',
  },
  timelineLine: {
    width: 2,
    height: 60,
    backgroundColor: colors.border.medium,
    marginHorizontal: 20,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 15,
    ...shadows.small,
  },
  milestoneText: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default AboutScreen;