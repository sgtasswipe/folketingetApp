// app.config.js
import 'dotenv/config';
import { version } from 'react';

export default {
  expo: {
    "owner":"sgt_asswipe",    
    name: "Folketinget",
    slug: "Folketinget",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "/assets/adaptive-icon.png",
        backgroundColor: "#FFFFF",
    },  package: "com.intelliJKingZ.folketinget",
        versionCode: 1 },
    
    web: {
      favicon: "/assets/favicon.png"
    },
    
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
     
    }
    
  }
};