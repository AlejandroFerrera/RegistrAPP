import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit, OnDestroy {
  scannedResult: any;
  content_visibility = '';
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation?.extras.state as {
      idAlumno: string;
      nombre: string;
      apellido: string;
    };
  }

  state: any;
  nombre: String;
  apellido: String;

  /* Alert*/
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Abriendo cámara para confirmar QR...',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  ngOnInit() {
    /* paso de data */
    this.nombre = this.state.nombre;
    this.apellido = this.state.apellido;

    /*animacion*/
    const animationClick = this.animationCtrl
      .create()
      .addElement(document.getElementById('animationClick'))
      .fill('none')
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.1)', opacity: '0.9' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    animationClick.play();
  }

  async checkPermission() {
    try {
      //Consultar o solicitar permisión
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        //El usuario otorgó permiso
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permision = await this.checkPermission();
      if (!permision) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }
}
