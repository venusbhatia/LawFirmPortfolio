import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:info@lawfirm.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="location-outline" size={22} color="#d4af37" style={styles.icon} />
          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.text}>123 Wentworth Crescent, Thunder Bay, ON</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={22} color="#d4af37" style={styles.icon} />
          <View>
            <Text style={styles.label}>Phone</Text>
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={[styles.text, styles.link]}>+1 (234) 567-890</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={22} color="#d4af37" style={styles.icon} />
          <View>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={[styles.text, styles.link]}>info@lawfirm.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media Links */}
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/')}> 
            <Ionicons name="logo-linkedin" size={28} color="#d4af37" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/')}> 
            <Ionicons name="logo-twitter" size={28} color="#d4af37" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/')}> 
            <Ionicons name="logo-facebook" size={28} color="#d4af37" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
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
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d4af37',
    opacity: 0.18,
    marginBottom: 22,
    borderRadius: 1,
    width: '80%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  icon: {
    marginRight: 16,
    marginTop: 2,
  },
  label: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 2,
  },
  link: {
    color: '#d4af37',
    textDecorationLine: 'underline',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default ContactScreen;
