import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      await loadAppointments(); // Reload to show updated status
      Alert.alert('Success', `Appointment marked as ${status}`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      Alert.alert('Error', 'Failed to update appointment status');
    }
  };

  const deleteAppointment = async (id) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseService.deleteAppointment(id);
              await loadAppointments();
              Alert.alert('Success', 'Appointment deleted');
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
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      case 'completed': return '#2196F3';
      default: return '#FF9800'; // pending
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

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
      <Text style={styles.title}>Appointment Requests</Text>
      <View style={styles.divider} />
      
      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No appointments found</Text>
        </View>
      ) : (
        appointments.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.name}>{appointment.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                <Text style={styles.statusText}>{appointment.status.toUpperCase()}</Text>
              </View>
            </View>
            
            <Text style={styles.info}>📧 {appointment.email}</Text>
            <Text style={styles.info}>📞 {appointment.phone}</Text>
            <Text style={styles.info}>📅 {appointment.date}</Text>
            
            {appointment.message && (
              <Text style={styles.message}>💬 {appointment.message}</Text>
            )}
            
            <Text style={styles.timestamp}>
              Created: {formatDate(appointment.created_at)}
            </Text>
            
            <View style={styles.actions}>
              {appointment.status === 'pending' && (
                <>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.confirmButton]}
                    onPress={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={styles.actionButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
              
              {appointment.status === 'confirmed' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={() => updateAppointmentStatus(appointment.id, 'completed')}
                >
                  <Ionicons name="checkmark-done" size={16} color="#fff" />
                  <Text style={styles.actionButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteAppointment(appointment.id)}
              >
                <Ionicons name="trash" size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 4,
  },
  message: {
    color: '#ddd',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 8,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  completeButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#757575',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AppointmentsAdminScreen;