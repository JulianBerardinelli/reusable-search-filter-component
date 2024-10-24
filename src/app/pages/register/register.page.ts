import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  async createAccount() {
    const loading = await this.loadingController.create();
    await loading.present();

    console.log('Credentials:', this.credentials.getRawValue());

    this.authService
      .signUp(this.credentials.getRawValue())
      .then(async (response) => {

        console.log('Signup Response:', response);

        await loading.dismiss();

        if (!response.user) {
          // Si no hay usuario, entonces ocurrió un error (usuario no registrado)
          this.showAlert('Registro fallido', 'Ocurrió un error durante el registro.');
        } else {
          // Si el usuario fue creado con éxito, redirige a /tabs
          this.showAlert('Registro exitoso', '¡Tu cuenta ha sido creada exitosamente!');
          this.navCtrl.navigateRoot('/tabs/tab2');  // Redirige a la página principal
        }
      })
      .catch(async (error) => {
        // Captura cualquier error que ocurra durante el proceso de registro
        await loading.dismiss();
        this.showAlert('Registro fallido', error.message || 'Ocurrió un error inesperado.');
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
}
