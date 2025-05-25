import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PracticeAreaDetailScreen = ({ route }) => {
  const { area } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>{area.icon}</Text>
        <Text style={styles.title}>{area.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>
          {area.title} services include comprehensive legal support, expert advice, and client-focused representation tailored to individual cases.
        </Text>

        <Text style={styles.servicesTitle}>Key Services:</Text>
        <Text style={styles.service}>• Consultation & Legal Advice</Text>
        <Text style={styles.service}>• Case Analysis & Representation</Text>
        <Text style={styles.service}>• Documentation & Filing</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1c3c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(24, 40, 72, 0.97)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 54,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginVertical: 16,
    borderRadius: 1,
    width: '60%',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  servicesTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
  },
  service: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 6,
  },
});

export default PracticeAreaDetailScreen;
