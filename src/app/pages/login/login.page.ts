import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['ejemplo@nexions.com', Validators.required],
    password: ['12345', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('User is logged in', user);
        this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
      }
    })
  }

  get email() {
    return this.credentials.controls.email;
  }
  get password() {
    return this.credentials.controls.password;
  }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    // Llama al servicio de autenticación para iniciar sesión
    this.authService.signIn(this.credentials.getRawValue())
      .then(async (response) => {
        await loading.dismiss();

        console.log('Login response', response);

        if (!response.data.user) {
          this.showAlert('Inicio de sesión fallido', 'Credenciales inválidas u otro error');
        } else {
          console.log('Login successful!', response.data.user);
        }
      })
      .catch(async (error) => {
        await loading.dismiss();
        this.showAlert('Inicio de sesión fallido', error.message || 'Ocurrió un error inesperado.');
      });
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async forgotPw() {
    const alert = await this.alertController.create({
      header: 'Recibe una nueva contraseña',
      message: 'Por favor ingrese su correo electrónico',
      inputs: [
        {
          type: 'email',
          name: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Restablecer contraseña',
          handler: async (result) => {
            const email = result.email;
  
            // Validar formato de email
            if (!this.isValidEmail(email)) {
              this.showAlert('Correo electrónico inválido', 'Por favor ingrese un correo electrónico válido.');
              return;
            }
  
            const loading = await this.loadingController.create();
            await loading.present();
  
            const { error } = await this.authService.sendPwReset(email);
            await loading.dismiss();
  
            if (error) {
              this.showAlert('Fallo al restablecer la contraseña', error.message || 'Ocurrió un error inesperado.');
            } else {
              this.showAlert('Éxito', 'Por favor revise su bandeja de entrada para más instrucciones.');
            }
          }
        }
      ]
    });
  
    await alert.present(); 
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
