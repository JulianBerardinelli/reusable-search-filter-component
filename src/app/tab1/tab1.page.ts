import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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



