import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import LawyersScreen from './screens/LawyersScreen';
import LawyerDetailScreen from './screens/LawyerDetailScreen';
import PracticeAreasScreen from './screens/PracticeAreasScreen';
import PracticeAreaDetailScreen from './screens/PracticeAreaDetailScreen';
import ContactScreen from './screens/ContactScreen';
import FAQScreen from './screens/FAQScreen';
import AppointmentBookingScreen from './screens/AppointmentBookingScreen';
import databaseService from './database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    // Initialize database when app starts
    const initDatabase = async () => {
      try {
        console.log('Initializing database...');
        await databaseService.init();
        console.log('Database initialized successfully');
        setIsDbReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        // Still allow app to run even if database fails
        setIsDbReady(true);
      }
    };

    initDatabase();
  }, []);

  // Show loading screen while database initializes
  if (!isDbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d4af37" />
        <Text style={styles.loadingText}>Initializing Law Firm App...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Lawyers" component={LawyersScreen} options={{ title: 'Our Lawyers', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="LawyerDetail" component={LawyerDetailScreen} options={{ title: 'Lawyer Profile', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="PracticeAreas" component={PracticeAreasScreen} options={{ title: 'Practice Areas', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="PracticeAreaDetail" component={PracticeAreaDetailScreen} options={{ title: 'Area Details', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="FAQ" component={FAQScreen} options={{ title: 'FAQ', headerShown: true, headerTitleAlign: 'center' }} />
        <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} options={{ title: 'Book Appointment', headerShown: true, headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0c1c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#d4af37',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});