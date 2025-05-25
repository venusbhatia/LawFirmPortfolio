import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, shadows } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import databaseService from '../database';

const AppointmentsAdminScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    try {
      const appointmentsData = await databaseService.getAllAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateAppointmentStatus = async (id, status) => {
    try {
      await databaseService.updateAppointmentStatus(id, status);
      await loadAppointments();
      Alert.alert('Success', `Appointment marked as ${status}`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      Alert.alert('Error', 'Failed to update appointment status');
    }
  };

  const deleteAppointment = async (id) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseService.deleteAppointment(id);
              await loadAppointments();
              Alert.alert('Success', 'Appointment deleted successfully');
            } catch (error) {
              console.error('Error deleting appointment:', error);
              Alert.alert('Error', 'Failed to delete appointment');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'cancelled': return colors.error;
      case 'completed': return colors.info;
      default: return colors.warning; // pending
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      case 'completed': return 'checkmark-done-circle';
      default: return 'time-outline'; // pending
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const AppointmentCard = ({ appointment }) => (
    <Card variant="elevated" style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.clientInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {appointment.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.clientName}>{appointment.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}15` }]}>
              <Ionicons 
                name={getStatusIcon(appointment.status)} 
                size={12} 
                color={getStatusColor(appointment.status)} 
              />
              <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                {appointment.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.contactInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.infoText}>{appointment.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.infoText}>{appointment.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.infoText}>{appointment.date}</Text>
        </View>
      </View>
      
      {appointment.message && (
        <View style={styles.messageContainer}>
          <View style={styles.messageHeader}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.messageLabel}>Message</Text>
          </View>
          <Text style={styles.messageText}>{appointment.message}</Text>
        </View>
      )}
      
      <View style={styles.timestampContainer}>
        <Ionicons name="time-outline" size={12} color={colors.text.tertiary} />
        <Text style={styles.timestamp}>
          Created {formatDate(appointment.created_at)}
        </Text>
      </View>
      
      <View style={styles.actionButtons}>
        {appointment.status === 'pending' && (
          <>
            <Button
              title="Confirm"
              onPress={() => updateAppointmentStatus(appointment.id, 'confirmed')}
              size="small"
              style={[styles.actionButton, styles.confirmButton]}
            />
            <Button
              title="Cancel"
              onPress={() => updateAppointmentStatus(appointment.id, 'cancelled')}
              variant="outlined"
              size="small"
              style={[styles.actionButton, styles.cancelButton]}
            />
          </>
        )}
        
        {appointment.status === 'confirmed' && (
          <Button
            title="Mark Complete"
            onPress={() => updateAppointmentStatus(appointment.id, 'completed')}
            size="small"
            style={[styles.actionButton, styles.completeButton]}
          />
        )}
        
        <Button
          title="Delete"
          onPress={() => deleteAppointment(appointment.id)}
          variant="outlined"
          size="small"
          style={[styles.actionButton, styles.deleteButton]}
          textStyle={styles.deleteButtonText}
        />
      </View>
    </Card>
  );

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
            <Ionicons name="calendar-outline" size={32} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Appointment Requests</Text>
          <Text style={styles.subtitle}>
            Manage and track all client appointment requests
          </Text>
        </Card>
        
        {appointments.length === 0 ? (
          <Card variant="outlined" style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={48} color={colors.text.tertiary} />
            <Text style={styles.emptyTitle}>No Appointments</Text>
            <Text style={styles.emptyText}>
              No appointment requests found. New requests will appear here.
            </Text>
          </Card>
        ) : (
          <View style={styles.appointmentsContainer}>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </View>
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
  appointmentsContainer: {
    gap: 16,
  },
  appointmentCard: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    ...typography.callout,
    color: colors.text.inverse,
    fontWeight: '700',
  },
  nameContainer: {
    flex: 1,
  },
  clientName: {
    ...typography.headline,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    ...typography.caption2,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactInfo: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    ...typography.callout,
    color: colors.text.primary,
    marginLeft: 12,
    flex: 1,
  },
  messageContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageLabel: {
    ...typography.subhead,
    color: colors.text.secondary,
    marginLeft: 8,
    fontWeight: '600',
  },
  messageText: {
    ...typography.callout,
    color: colors.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timestamp: {
    ...typography.caption1,
    color: colors.text.tertiary,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: 80,
  },
  confirmButton: {
    backgroundColor: colors.success,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  completeButton: {
    backgroundColor: colors.info,
  },
  deleteButton: {
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    ...typography.headline,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  emptyText: {
    ...typography.callout,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AppointmentsAdminScreen;