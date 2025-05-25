import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
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
          email: 'richard.davis@lawfirm.com',
          phone: '(555) 123-4567'
        },
        {
          id: 2,
          name: 'Jane Smith',
          specialty: 'Family Law',
          experience: '15 years',
          image: 'https://randomuser.me/api/portraits/women/44.jpg',
          bio: 'Jane Smith specializes in family law matters with compassionate service.',
          email: 'jane.smith@lawfirm.com',
          phone: '(555) 234-5678'
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
        <ActivityIndicator size="large" color="#d4af37" />
        <Text style={styles.loadingText}>Loading lawyers...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#d4af37']}
          tintColor="#d4af37"
        />
      }
    >
      <Text style={styles.title}>Our Lawyers</Text>
      <View style={styles.divider} />
      
      {lawyers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No lawyers found</Text>
          <Text style={styles.emptySubtext}>Pull down to refresh</Text>
        </View>
      ) : (
        lawyers.map((lawyer) => (
          <TouchableOpacity
            key={lawyer.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('LawyerDetail', { lawyer: lawyer })}
          >
            <Image source={{ uri: lawyer.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{lawyer.name}</Text>
              <Text style={styles.specialty}>{lawyer.specialty}</Text>
              <Text style={styles.experience}>{lawyer.experience} of experience</Text>
              {lawyer.email && (
                <Text style={styles.contact}>{lawyer.email}</Text>
              )}
              {lawyer.phone && (
                <Text style={styles.contact}>{lawyer.phone}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1c3c',
    padding: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginBottom: 18,
    borderRadius: 1,
    width: '80%',
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 80, 123, 0.95)',
    borderRadius: 16,
    marginBottom: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 50,
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#d4af37',
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  specialty: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  experience: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 2,
  },
  contact: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 1,
  },
  loadingText: {
    color: '#d4af37',
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#bbb',
    fontSize: 14,
  },
});

export default LawyersScreen;