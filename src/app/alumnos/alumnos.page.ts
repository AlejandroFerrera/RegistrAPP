import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { RegisterAssistanceService } from '../services/register-assistance.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit, OnDestroy {
  scannedResult: any;
  contentVisibility = '';
  handlerMessage = '';
  roleMessage = '';
  scannedResultText = '';

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private router: Router,
    private registerAssistance: RegisterAssistanceService
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
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: message,
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

  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    this.contentVisibility = 'hidden';
    const result = await BarcodeScanner.startScan();
    BarcodeScanner.showBackground();
    document.querySelector('body').classList.add('scanner-active');
    this.contentVisibility = '';

    if (result.hasContent) {
      let idAlumno = Number(localStorage.getItem('idAlumno'));
      let idSeccion = Number(result.content);

      this.scannedResultText = `Id alumno: ${idAlumno}, Id seccion: ${idSeccion}`;

      this.registerAssistance
        .register(idAlumno, idSeccion, true)
        .subscribe(() => {
          this.presentAlert(
            `Gracias ${this.nombre} ${this.apellido}, asistencia registrada con éxito!`
          );
        });
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.contentVisibility = '';
  }
}
