
import * as admin from 'firebase-admin';

// This is the one and only place admin SDK is initialized.
if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountString) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountString)),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (e: any) {
      console.error('Firebase admin initialization error:', e.stack);
    }
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Firebase Admin SDK will not be initialized.');
  }
}

// Export adminDb, making sure it's null if initialization failed.
export const adminDb = admin.apps.length ? admin.firestore() : null;
export { admin };
