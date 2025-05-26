import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';

const practiceAreas = [
  { id: '1', icon: '🛡️', title: 'Criminal Law', color: colors.error },
  { id: '2', icon: '👨‍👩‍👧', title: 'Family Law', color: colors.success },
  { id: '3', icon: '💼', title: 'Corporate Law', color: colors.primary.main },
  { id: '4', icon: '🌍', title: 'Immigration Law', color: colors.info },
  { id: '5', icon: '🏠', title: 'Real Estate Law', color: colors.warning },
  { id: '6', icon: '📄', title: 'Legal Drafting', color: colors.secondary.main },
];

const PracticeAreasScreen = ({ navigation }) => {
  const renderPracticeArea = ({ item, index }) => (
    <Card
      variant="elevated"
      onPress={() => navigation.navigate('PracticeAreaDetail', { area: item })}
      style={[styles.card, { marginRight: index % 2 === 0 ? 8 : 0, marginLeft: index % 2 === 1 ? 8 : 0 }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
        <Text style={styles.icon}>{item.icon}</Text>
        <View style={[styles.iconGlow, { backgroundColor: item.color }]} />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.arrowContainer}>
        <Ionicons name="arrow-forward" size={16} color={colors.text.tertiary} />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Card variant="blur" style={styles.headerCard}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="briefcase-outline" size={32} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Practice Areas</Text>
          <Text style={styles.subtitle}>
            Comprehensive legal services across multiple specializations
          </Text>
        </Card>
      </View>

      <FlatList
        data={practiceAreas}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderPracticeArea}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FF',
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  headerCard: {
    alignItems: 'center',
    padding: 24,
  },
  headerIconContainer: {
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
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    position: 'relative',
    minHeight: 160,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    ...shadows.small,
  },
  icon: {
    fontSize: 32,
    zIndex: 1,
  },
  iconGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 24,
    opacity: 0.1,
    zIndex: 0,
  },
  cardTitle: {
    ...typography.headline,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PracticeAreasScreen;