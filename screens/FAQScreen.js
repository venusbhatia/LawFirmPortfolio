import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';

const faqs = [
  { 
    id: 1,
    question: 'What areas of law do you practice?', 
    answer: 'We specialize in criminal law, family law, corporate law, immigration law, real estate law, and comprehensive legal drafting services. Our experienced team provides expert representation across all these practice areas.'
  },
  { 
    id: 2,
    question: 'How can I book a consultation?', 
    answer: 'You can easily book a consultation through our mobile app, call us directly at (234) 567-890, or send us an email at info@legalcare.com. We offer free initial consultations for new clients.'
  },
  { 
    id: 3,
    question: 'Where is your office located?', 
    answer: 'Our main office is located at 123 Wentworth Crescent, Thunder Bay, ON. We offer convenient parking and wheelchair accessibility. Virtual consultations are also available.'
  },
  { 
    id: 4,
    question: 'Do you offer free initial consultations?', 
    answer: 'Yes, we provide a free 30-minute initial consultation for all new clients. This allows us to understand your legal needs and explain how we can help you achieve the best possible outcome.'
  },
  { 
    id: 5,
    question: 'What are your business hours?', 
    answer: 'We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays, but emergency consultations can be arranged.'
  },
  { 
    id: 6,
    question: 'How much do your services cost?', 
    answer: 'Our fees vary depending on the complexity and type of legal service required. We offer transparent pricing and will provide a detailed estimate during your initial consultation. Payment plans are available.'
  },
];

const FAQItem = ({ faq, isExpanded, onPress }) => {
  return (
    <Card variant="elevated" style={styles.faqCard}>
      <TouchableOpacity onPress={onPress} style={styles.questionContainer}>
        <View style={styles.questionContent}>
          <Text style={styles.question}>{faq.question}</Text>
          <View style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
            <Ionicons 
              name="chevron-down" 
              size={20} 
              color={colors.primary.main} 
            />
          </View>
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.answerContainer}>
          <View style={styles.divider} />
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      )}
    </Card>
  );
};

const FAQScreen = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="blur" style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle-outline" size={32} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>
            Find answers to common questions about our legal services
          </Text>
        </Card>

        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedItems.has(faq.id)}
              onPress={() => toggleExpanded(faq.id)}
            />
          ))}
        </View>

        <Card variant="outlined" style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Ionicons name="chatbubble-outline" size={24} color={colors.primary.main} />
            <Text style={styles.contactTitle}>Still have questions?</Text>
          </View>
          <Text style={styles.contactText}>
            Our legal experts are here to help. Contact us for personalized assistance with your legal matters.
          </Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call-outline" size={18} color={colors.primary.main} />
              <Text style={styles.contactButtonText}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="mail-outline" size={18} color={colors.primary.main} />
              <Text style={styles.contactButtonText}>Email Us</Text>
            </TouchableOpacity>
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
  faqContainer: {
    marginBottom: 20,
  },
  faqCard: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
  },
  questionContainer: {
    padding: 20,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    ...typography.headline,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '600',
    marginRight: 12,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
    transition: 'transform 0.2s ease',
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.border.light,
    marginBottom: 16,
  },
  answer: {
    ...typography.callout,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  contactCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary.main,
    backgroundColor: 'rgba(0, 122, 255, 0.02)',
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    ...typography.headline,
    color: colors.text.primary,
    marginLeft: 12,
    fontWeight: '600',
  },
  contactText: {
    ...typography.callout,
    color: colors.text.secondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.small,
  },
  contactButtonText: {
    ...typography.callout,
    color: colors.primary.main,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default FAQScreen;