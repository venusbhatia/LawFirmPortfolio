import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const faqs = [
  { question: 'What areas of law do you practice?', answer: 'We specialize in criminal, family, corporate, immigration, real estate, and legal drafting.' },
  { question: 'How can I book a consultation?', answer: 'You can book a consultation through our app or by contacting us directly.' },
  { question: 'Where is your office located?', answer: '123 Wentworth Crescent, Thunder Bay, ON.' },
  { question: 'Do you offer free initial consultations?', answer: 'Yes, we offer a free initial consultation for new clients.' },
];

const FAQScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Frequently Asked Questions</Text>
    <View style={styles.divider} />
    {faqs.map((faq, idx) => (
      <View key={idx} style={styles.card}>
        <Text style={styles.question}>{faq.question}</Text>
        <Text style={styles.answer}>{faq.answer}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1c3c',
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
  card: {
    backgroundColor: 'rgba(24, 40, 72, 0.97)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  answer: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
});

export default FAQScreen; 