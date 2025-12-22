# 💬 Real-Time Group Chat

A group instant messaging application built with React and Firebase, demonstrating how to build a functional real-time solution using modern cloud technologies.

## 📋 Description

This application allows users to authenticate via Google and participate in a group chat with real-time messaging features. Users can send, edit, and delete their own messages, all synchronized instantly thanks to Cloud Firestore.

The project was designed for demonstrative and academic purposes, prioritizing simplicity and clarity in implementation to facilitate learning of the Firebase ecosystem.

## 🔗 Live Demo

Access the group chat here: [Firechat](https://sage-beignet-824934.netlify.app/).

## ✨ Features

- 🔐 Google Authentication
- 💬 Real-time messaging
- ✏️ Edit own messages
- 🗑️ Delete own messages
- 👤 User profiles with photo
- ⚡ Instant synchronization
- 📱 Responsive interface

## 🔒 Security and Privacy

Google authentication was implemented to **simplify the login process** and demonstrate integration with OAuth providers.

**Requested data**: The application **only requests and stores**:
- ✅ User name
- ✅ Email address
- ✅ Profile photo URL

**Transparency**: You can verify exactly what data is requested by reviewing the code in `/src/store/useAuthStore.js`.

**Not accessed**: Contacts, calendars, Google Drive files, or any other additional data from your Google account.

## 🛠️ Technologies Used

### Frontend (Client)
- **React 19** - JavaScript library for building user interfaces
- **Tailwind CSS** - CSS framework for responsive design
- **Zustand** - Lightweight and efficient state management
- **Headless UI** - Accessible UI components without predefined styles

### Backend (Database)
- **Firebase**
  - Cloud Firestore - Real-time database
  - Authentication - Google authentication system

## 📊 Database Structure

The application uses a main collection called `fire-messages`, where each document represents a message with the following structure:

```javascript
{
  userName: string,           // User name
  userEmail: string,          // Email address
  userPhotoURL: string,       // Profile photo URL
  text: string,               // Message content
  isEdited: boolean,          // Edit indicator
  createdAt: timestamp        // Creation date and time
}
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Account
- Firebase Account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/annerh3/chat-grupal-firebase.git
   cd chat-grupal-firebase
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase**
   
   a. Create a project in [Firebase Console](https://console.firebase.google.com/)
   
   b. Enable Authentication with Google
   
   c. Create a Cloud Firestore database
   
   d. Copy the configuration credentials
   
   e. Create a `.env` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Configure Firestore security rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /fire-messages/{messageId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null 
           && request.auth.token.email == resource.data.userEmail;
       }
     }
   }
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
chat-grupal-firebase/
├── src/
│   ├── components/        # React components
│   ├── config/           # Firebase configuration
│   ├── store/            # Global state with Zustand
│   ├── services/         # Firebase services
│   ├── hooks/            # Custom hooks
│   └── App.jsx           # Main component
├── public/               # Static files
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md            # This file
```

## 🎯 Usage

1. **Sign in**: Click the "Sign in with Google" button
2. **Send messages**: Type your message in the text field and press Enter or click send
3. **Edit messages**: Click the edit icon on your own messages
4. **Delete messages**: Click the delete icon on your own messages

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run linter
```

## 📝 Important Notes

- This implementation prioritizes simplicity and learning over scalability
- For production, it is recommended to implement:
  - Separation of collections for users and messages
  - Message pagination
  - More granular access control
  - Server-side data validation
  - Rate limiting

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

Anner Henriquez - [@annerh3](https://github.com/annerh3)

## 🙏 Acknowledgments

- Project developed for academic and demonstrative purposes
- Firebase for providing a robust and easy-to-use cloud platform

---

⭐ If this project was useful to you, consider giving it a star on GitHub
