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

