import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './interceptor/auth-interceptor';
import { AuthState } from './core/services/auth-state';
import { Api } from './core/services/api';
import { initializeAuth } from './core/app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 3. Configure the HTTP Client to use your interceptor
    provideHttpClient(withInterceptors([authInterceptor])),

    // 🚀 Add the App Initializer here
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [Api, AuthState], // These are injected into the factory function
      multi: true // Essential: tells Angular this is one of many initializers
    }
  ]
};

