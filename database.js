import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
  }

  async init() {
    try {
      this.db = await SQLite.openDatabaseAsync('lawfirm.db');
      await this.createTables();
      await this.seedLawyers();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  async createTables() {
    // Create appointments table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        date TEXT NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create lawyers table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS lawyers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialty TEXT NOT NULL,
        experience TEXT NOT NULL,
        image TEXT NOT NULL,
        bio TEXT,
        email TEXT,
        phone TEXT
      );
    `);
  }

  async seedLawyers() {
    // Check if lawyers already exist
    const result = await this.db.getFirstAsync('SELECT COUNT(*) as count FROM lawyers');
    
    if (result.count === 0) {
      const lawyers = [
        {
          name: 'Richard Davis',
          specialty: 'Criminal Law',
          experience: '20 years',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          bio: 'Richard Davis is a seasoned criminal defense attorney with over 20 years of experience defending clients in complex criminal cases.',
          email: 'richard.davis@lawfirm.com',
          phone: '(555) 123-4567'
        },
        {
          name: 'Jane Smith',
          specialty: 'Family Law',
          experience: '15 years',
          image: 'https://randomuser.me/api/portraits/women/44.jpg',
          bio: 'Jane Smith specializes in family law matters including divorce, custody, and adoption cases with compassionate and professional service.',
          email: 'jane.smith@lawfirm.com',
          phone: '(555) 234-5678'
        },
        {
          name: 'Robert Brown',
          specialty: 'Business Law',
          experience: '10 years',
          image: 'https://randomuser.me/api/portraits/men/75.jpg',
          bio: 'Robert Brown helps businesses navigate complex legal challenges with expertise in corporate law and business litigation.',
          email: 'robert.brown@lawfirm.com',
          phone: '(555) 345-6789'
        },
        {
          name: 'Emily Johnson',
          specialty: 'Immigration Law',
          experience: '12 years',
          image: 'https://randomuser.me/api/portraits/women/68.jpg',
          bio: 'Emily Johnson is dedicated to helping individuals and families navigate the immigration process with expertise and care.',
          email: 'emily.johnson@lawfirm.com',
          phone: '(555) 456-7890'
        },
        {
          name: 'Michael Lee',
          specialty: 'Corporate Law',
          experience: '8 years',
          image: 'https://randomuser.me/api/portraits/men/20.jpg',
          bio: 'Michael Lee provides comprehensive corporate legal services including mergers, acquisitions, and regulatory compliance.',
          email: 'michael.lee@lawfirm.com',
          phone: '(555) 567-8901'
        },
        {
          name: 'Sarah Walker',
          specialty: 'Real Estate Law',
          experience: '11 years',
          image: 'https://randomuser.me/api/portraits/women/50.jpg',
          bio: 'Sarah Walker specializes in real estate transactions, property law, and real estate litigation with proven results.',
          email: 'sarah.walker@lawfirm.com',
          phone: '(555) 678-9012'
        }
      ];

      for (const lawyer of lawyers) {
        await this.db.runAsync(
          'INSERT INTO lawyers (name, specialty, experience, image, bio, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [lawyer.name, lawyer.specialty, lawyer.experience, lawyer.image, lawyer.bio, lawyer.email, lawyer.phone]
        );
      }
      console.log('Lawyers seeded successfully');
    }
  }

  // Appointment methods
  async createAppointment(appointmentData) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO appointments (name, email, phone, date, message) VALUES (?, ?, ?, ?, ?)',
        [appointmentData.name, appointmentData.email, appointmentData.phone, 
         appointmentData.date, appointmentData.message]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async getAllAppointments() {
    try {
      const appointments = await this.db.getAllAsync(
        'SELECT * FROM appointments ORDER BY created_at DESC'
      );
      return appointments;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getAppointmentById(id) {
    try {
      const appointment = await this.db.getFirstAsync(
        'SELECT * FROM appointments WHERE id = ?',
        [id]
      );
      return appointment;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  }

  async updateAppointmentStatus(id, status) {
    try {
      await this.db.runAsync(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, id]
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }

  async deleteAppointment(id) {
    try {
      await this.db.runAsync('DELETE FROM appointments WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  // Lawyer methods
  async getAllLawyers() {
    try {
      const lawyers = await this.db.getAllAsync(
        'SELECT * FROM lawyers ORDER BY name'
      );
      return lawyers;
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      throw error;
    }
  }

  async getLawyerById(id) {
    try {
      const lawyer = await this.db.getFirstAsync(
        'SELECT * FROM lawyers WHERE id = ?',
        [id]
      );
      return lawyer;
    } catch (error) {
      console.error('Error fetching lawyer:', error);
      throw error;
    }
  }

  async getLawyersBySpecialty(specialty) {
    try {
      const lawyers = await this.db.getAllAsync(
        'SELECT * FROM lawyers WHERE specialty = ? ORDER BY name',
        [specialty]
      );
      return lawyers;
    } catch (error) {
      console.error('Error fetching lawyers by specialty:', error);
      throw error;
    }
  }

  async addLawyer(lawyerData) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO lawyers (name, specialty, experience, image, bio, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [lawyerData.name, lawyerData.specialty, lawyerData.experience, 
         lawyerData.image, lawyerData.bio, lawyerData.email, lawyerData.phone]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error adding lawyer:', error);
      throw error;
    }
  }

  async updateLawyer(id, lawyerData) {
    try {
      await this.db.runAsync(
        'UPDATE lawyers SET name = ?, specialty = ?, experience = ?, image = ?, bio = ?, email = ?, phone = ? WHERE id = ?',
        [lawyerData.name, lawyerData.specialty, lawyerData.experience, 
         lawyerData.image, lawyerData.bio, lawyerData.email, lawyerData.phone, id]
      );
    } catch (error) {
      console.error('Error updating lawyer:', error);
      throw error;
    }
  }

  async deleteLawyer(id) {
    try {
      await this.db.runAsync('DELETE FROM lawyers WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting lawyer:', error);
      throw error;
    }
  }

  // Debug methods
  async debugLogTables() {
    try {
      console.log('\n=== Database Tables ===');
      
      // Log appointments
      const appointments = await this.getAllAppointments();
      console.log('\nAppointments Table:');
      console.table(appointments);
      
      // Log lawyers
      const lawyers = await this.getAllLawyers();
      console.log('\nLawyers Table:');
      console.table(lawyers);
      
      console.log('\n=== End Database Tables ===\n');
    } catch (error) {
      console.error('Error logging database tables:', error);
    }
  }

  async debugDatabaseInfo() {
    try {
      console.log('\n=== Database Information ===');
      
      // Get table schemas
      const tables = await this.db.getAllAsync(`
        SELECT name, sql 
        FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
      `);
      
      console.log('\nTable Schemas:');
      tables.forEach(table => {
        console.log(`\n${table.name}:`);
        console.log(table.sql);
      });
      
      // Get record counts
      for (const table of tables) {
        const count = await this.db.getFirstAsync(`SELECT COUNT(*) as count FROM ${table.name}`);
        console.log(`\n${table.name} record count: ${count.count}`);
      }
      
      console.log('\n=== End Database Information ===\n');
    } catch (error) {
      console.error('Error getting database info:', error);
    }
  }
}

// Create and export a singleton instance
const databaseService = new DatabaseService();
export default databaseService;