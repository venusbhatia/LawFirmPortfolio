import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import databaseService from '../database';

const LawyersScreen = ({ navigation }) => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLawyers = async () => {
    try {
      console.log('Loading lawyers from database...');
      const lawyersData = await databaseService.getAllLawyers();
      console.log('Loaded lawyers:', lawyersData.length);
      setLawyers(lawyersData);
    } catch (error) {
      console.error('Error loading lawyers:', error);
      // Fallback to hardcoded data if database fails
      const fallbackLawyers = [
        {
          id: 1,
          name: 'Richard Davis',
          specialty: 'Criminal Law',
          experience: '20 years',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          bio: 'Richard Davis is a seasoned criminal defense attorney with over 20 years of experience.',
          email: 'richard.davis@legalcare.com',
          phone: '(555) 123-4567'
        },
        {
          id: 2,
          name: 'Jane Smith',
          specialty: 'Family Law',
          experience: '15 years',
          image: 'https://randomuser.me/api/portraits/women/44.jpg',
          bio: 'Jane Smith specializes in family law matters with compassionate service.',
          email: 'jane.smith@legalcare.com',
          phone: '(555) 234-5678'
        },
        {
          id: 3,
          name: 'Michael Johnson',
          specialty: 'Corporate Law',
          experience: '18 years',
          image: 'https://randomuser.me/api/portraits/men/45.jpg',
          bio: 'Michael Johnson provides expert corporate legal counsel for businesses.',
          email: 'michael.johnson@legalcare.com',
          phone: '(555) 345-6789'
        }
      ];
      setLawyers(fallbackLawyers);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLawyers();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadLawyers();
  }, []);

  // Focus effect to reload when returning to screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLawyers();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Loading our legal team...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary.main]}
            tintColor={colors.primary.main}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Card variant="blur" style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="people-outline" size={32} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Our Legal Team</Text>
          <Text style={styles.subtitle}>
            Meet our experienced attorneys dedicated to serving you
          </Text>
        </Card>
        
        {lawyers.length === 0 ? (
          <Card variant="outlined" style={styles.emptyCard}>
            <Ionicons name="people-outline" size={48} color={colors.text.tertiary} />
            <Text style={styles.emptyText}>No lawyers found</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
          </Card>
        ) : (
          lawyers.map((lawyer) => (
            <Card
              key={lawyer.id}
              variant="elevated"
              onPress={() => navigation.navigate('LawyerDetail', { lawyer: lawyer })}
              style={styles.lawyerCard}
            >
              <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: lawyer.image }} style={styles.image} />
                  <View style={styles.onlineIndicator} />
                </View>
                
                <View style={styles.info}>
                  <Text style={styles.name}>{lawyer.name}</Text>
                  <View style={styles.specialtyContainer}>
                    <View style={styles.specialtyBadge}>
                      <Text style={styles.specialty}>{lawyer.specialty}</Text>
                    </View>
                  </View>
                  <View style={styles.experienceContainer}>
                    <Ionicons name="briefcase-outline" size={14} color={colors.text.secondary} />
                    <Text style={styles.experience}>{lawyer.experience} of experience</Text>
                  </View>
                  
                  <View style={styles.contactRow}>
                    {lawyer.email && (
                      <View style={styles.contactItem}>
                        <Ionicons name="mail-outline" size={12} color={colors.text.tertiary} />
                        <Text style={styles.contact} numberOfLines={1}>{lawyer.email}</Text>
                      </View>
                    )}
                    {lawyer.phone && (
                      <View style={styles.contactItem}>
                        <Ionicons name="call-outline" size={12} color={colors.text.tertiary} />
                        <Text style={styles.contact}>{lawyer.phone}</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.chevronContainer}>
                  <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
  },
  iconContainer: {
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
  lawyerCard: {
    marginBottom: 16,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    ...shadows.small,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.background.card,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.headline,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: 6,
  },
  specialtyContainer: {
    marginBottom: 8,
  },
  specialtyBadge: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: colors.border.light,
  },
  specialty: {
    ...typography.caption1,
    color: colors.primary.main,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  experience: {
    ...typography.subhead,
    color: colors.text.secondary,
    marginLeft: 6,
  },
  contactRow: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contact: {
    ...typography.caption2,
    color: colors.text.tertiary,
    marginLeft: 4,
    flex: 1,
  },
  chevronContainer: {
    marginLeft: 12,
  },
  loadingText: {
    ...typography.callout,
    color: colors.text.secondary,
    marginTop: 16,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    ...typography.headline,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...typography.callout,
    color: colors.text.secondary,
  },
});

export default LawyersScreen;