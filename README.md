# Law Firm Portfolio App

A React Native mobile application for law firms to showcase their services, lawyers, and manage appointments.

## Features

- 📱 Modern and responsive UI
- 👨‍⚖️ Lawyer profiles and specialties
- 📅 Appointment booking system
- 💼 Practice areas showcase
- 📞 Contact information
- ❓ FAQ section
- 🗄️ SQLite database for data persistence

## Tech Stack

- React Native
- Expo
- SQLite (expo-sqlite)
- React Navigation

## Prerequisites

- Node.js >= 14
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd LawFirmPortfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Database Structure

The app uses SQLite for data persistence with two main tables:

### Lawyers Table
- id (PRIMARY KEY)
- name
- specialty
- experience
- image
- bio
- email
- phone

### Appointments Table
- id (PRIMARY KEY)
- name
- email
- phone
- date
- message
- status
- created_at

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 