import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isInDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // hardData users
  private userList = [

    {
      "user": "dcaresg@profesor.duoc.cl",
      "pass": "profepass",
      "nombre": "Diego Cares",
      "isProfesor": true
    },
    {
      "user": "otroprofe@profesor.duoc.cl",
      "pass": "profepass",
      "nombre": "Otro Profesor",
      "isProfesor": true
    },
    {
      "user": "cr.contrerasv@duocuc.cl",
      "pass": "alumnopass",
      "nombre": "Cristian Contreras",
      "isProfesor": false,
    },
    {
      "user": "al.ferrera@duocuc.cl",
      "pass": "alumnopass",
      "nombre": "Alejandro Ferrera",
      "isProfesor": false,
    }


  ];

  // create Login form
  loginForm: FormGroup;

  // init login form ,
  constructor(public fb: FormBuilder, private router: Router, private alertController: AlertController) {
    this.loginForm = this.fb.group({
      'user': new FormControl("", Validators.required),
      'pass': new FormControl("", Validators.required),
    })
  };



  ngOnInit() {
  }

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
  };

  login() {
    //get data form
    var f = this.loginForm.value;

    // list source
    var lista = []
    // loop validate
    for (let i in this.userList) {

      // profesor - alumno - error
      if (this.userList[i].user === f.user && this.userList[i].pass === f.pass && this.userList[i].isProfesor === true) {
        // generate navigator
        let navigatorExtras: NavigationExtras = {
          state: {
            user: this.userList[i].user,
            name: this.userList[i].nombre
          }

        }
        var error = false;



        this.router.navigate(['/profesor'], navigatorExtras);
        break;
      }
      else if (this.userList[i].user === f.user && this.userList[i].pass === f.pass && this.userList[i].isProfesor === false) {
        lista = [this.userList[i].user, this.userList[i].nombre]
        var error = false;
        let navigatorExtras: NavigationExtras = {
          state: {
            user: this.userList[i].user,
            name: this.userList[i].nombre
          }

        }

        this.router.navigate(['/alumnos'], navigatorExtras);
        break;
      }
      else {
        var error = true;
      }
      // && this.userList[i].pass === f.pass
    };
    console.log(error)
    if (error) {
      this.presentAlert();
    }



  }
}

/*
ToDo
OnInit profesor
this.loginService.$getObjectSource.suscribe(data -> console.log(data)).unsuscribe

*/
