import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject<boolean | User>(false);

  constructor(private router: Router) { 
    // Inicializa el cliente Supa y configura el listener de cambio de estado.
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // Listener cambios en el estado de AUTH y actualiza.
    this.supabase.auth.onAuthStateChange((event, session)=> {
      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {

        this.logAuthEvent('User signed in or token refreshed.', session.user);
        this.currentUser.next(session.user);
      } else if (event === 'SIGNED_OUT') {

        this.logAuthEvent('User signed out.');
        this.currentUser.next(false);
      } else {

        this.logAuthEvent('Auth state changed but no session found.');
        this.currentUser.next(false);
      }
    });    

    this.loadUser();
  }

  // Registra eventos AUTH
  private logAuthEvent(message: string, user?: User) {
    if (user) {

      console.log(`${message} User ID: ${user.id}, Email: ${user.email}`);
    } else {
      
      console.log(message);
    }
  }

  // Carga el usuario
  async loadUser() {
    if (this.currentUser.value) {
      // Positivo, loguea la información y retorna
      console.log("User already loaded: ", this.currentUser.value);
      return;
    }

    // Obtiene los datos del usuario
    const user = await this.supabase.auth.getUser();

    if (user.data.user) {
      // Loguea y actualiza el usuario actual si la sesión contiene un usuario
      this.logAuthEvent('User loaded from session.', user.data.user);
      this.currentUser.next(user.data.user);
    } else {
      // Loguea que no se encontró un usuario en la sesión y establece el usuario actual en `false`
      this.logAuthEvent('No user found in session.');
      this.currentUser.next(false);
    }
  }

  signUp(credentials: { email: string, password: string }) {
    return this.supabase.auth.signUp(credentials)
      .then(({ data }) => {
        if (data.user) {

          this.logAuthEvent('User account created.', data.user);
        }
        return data;
      });
  }

  // signIn(credentials: { email: string, password: string }) {
  //   return this.supabase.auth.signInWithPassword(credentials)
  //     .then(({ data }) => {
  //       if (data.user) {

  //         this.logAuthEvent('User signed in.', data.user);
  //       }
  //       return data;
  //     });
  // }

  signIn(credentials: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword(credentials)
      .then((response) => {
        if (response.error) {
          console.error('Supabase login error:', response.error);
          throw response.error; // Lanza el error para ser manejado en el componente
        }
        return response; // Devuelve la respuesta para ser manejada en el componente
      })
      .catch((error) => {
        console.error('Catch login error:', error);
        throw error; // Lanza el error para ser manejado en el componente
      });
  }

  sendPwReset(email: string): Promise<{ error?: Error }> {
    return this.supabase.auth.resetPasswordForEmail(email)
      .then(() => ({ error: undefined }))
      .catch((error) => ({ error }));
  }
  
  

  async signOut() {
    await this.supabase.auth.signOut();

    this.logAuthEvent('User signed out.');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string {
    if (this.currentUser.value && typeof this.currentUser.value !== 'boolean') {
      return (this.currentUser.value as User).id;
    } else {
      return '';
    }
  }
}

