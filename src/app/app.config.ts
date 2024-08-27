import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyBNXKwBjv-pUwlVpgYGkBe9I0aW30S4ffM",
  authDomain: "todolist-c8cb3.firebaseapp.com",
  projectId: "todolist-c8cb3",
  storageBucket: "todolist-c8cb3.appspot.com",
  messagingSenderId: "687851136844",
  appId: "1:687851136844:web:1671e43315973fb6a5d1e9"
};




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),

    ]),
    provideAnimations(), provideAnimationsAsync()

  ],
};
