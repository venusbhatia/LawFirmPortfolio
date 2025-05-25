import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const practiceAreas = [
  { id: '1', icon: '🛡️', title: 'Criminal Law' },
  { id: '2', icon: '👨‍👩‍👧', title: 'Family Law' },
  { id: '3', icon: '💼', title: 'Corporate Law' },
  { id: '4', icon: '🌍', title: 'Immigration Law' },
  { id: '5', icon: '🏠', title: 'Real Estate Law' },
  { id: '6', icon: '📄', title: 'Legal Drafting' },
];

const PracticeAreasScreen = ({ navigation }) => {
  return (
    <View style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Practice Areas</Text>
        <View style={styles.divider} />
        <FlatList
          data={practiceAreas}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('PracticeAreaDetail', { area: item })}
              activeOpacity={0.85}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.grid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#182848',
  },
  container: {
    flex: 1,
    padding: 20,
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
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(52, 80, 123, 0.95)',
    flex: 1,
    margin: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 6,
    transition: 'transform 0.1s',
  },
  icon: {
    fontSize: 38,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default PracticeAreasScreen;
