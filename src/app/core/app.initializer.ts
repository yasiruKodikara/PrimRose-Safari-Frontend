import { catchError, of, tap } from "rxjs";
import { Api } from "./services/api";
import { AuthState } from "./services/auth-state";


export function initializeAuth(api: Api, authState: AuthState) {
  // We return a function that returns an Observable. Angular waits for this Observable to complete.
  return () => api.getAuthStatus().pipe(
    tap((res: any) => {
      // If the backend says we are authenticated, save the user state
      if (res.isAuthenticated && res.user) {
        authState.setCurrentUser(res.user);
      }
    }),
    catchError((error) => {
      // If the cookie is missing, expired, or invalid, the server throws an error.
      // We catch it and return 'of(null)' so the app doesn't crash on load.
      console.log('No valid session found. User is logged out.');
      return of(null); 
    })
  );
}