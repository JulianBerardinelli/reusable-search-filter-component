import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userEmail: string | null = null;

  public actionSheetButtons = [
    {
      text: 'Cerrar sesión',
      role: 'destructive',
      icon: 'log-out-outline',
      handler: () => {
        this.logout();  // Llama a la función de cierre de sesión
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close-outline',
      handler: () => {
        console.log('Cancel clicked');
      },
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user && typeof user !== 'boolean') {
        this.userEmail = user.email || null;
      } else {
        this.userEmail = null;
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
}
