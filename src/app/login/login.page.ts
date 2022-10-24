import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isInDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  password = new FormControl('', [Validators.required]);

  // init login form ,
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario y/o contraseña son incorrectos.',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }

  login() {
    const email = this.email.value!;
    const password = this.password.value!;

    this.authService.login(email, password).subscribe((response: User) => {
      if (this.authService.isLogedIn()) {
        const navigationExtras: NavigationExtras = {
          state: {
            idAlumno: response.idAlumno,
            nombre: response.nombre,
            apellido: response.apellido,
          },
        };

        this.router.navigate(['alumnos'], navigationExtras);
      } else {
        this.authService.logout();
        this.presentAlert();
      }
    });
  }

  startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };
}
