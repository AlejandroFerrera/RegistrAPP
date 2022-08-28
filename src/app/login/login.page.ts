import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service'
/*
! importo el servicio
*/
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
  constructor(public fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      'user': new FormControl("", Validators.required),
      'pass': new FormControl("", Validators.required),
    })
  };


  ngOnInit() {
  }


  login() {
    //get data form
    var f = this.loginForm.value;
    var error = true;
    // list source
    var lista = []
    // loop validate
    for (let i in this.userList) {

      // profesor - alumno - error
      if (this.userList[i].user === f.user && this.userList[i].pass === f.pass && this.userList[i].isProfesor === true) {
        // ? inicio la lista con el nombre y correo
        lista = [this.userList[i].user, this.userList[i].nombre]
        // ? envio la lista de la instacia de loginService metodo sendlistSource envio esta lista
        error = false;
        this.loginService.sendListSource(lista);

        this.router.navigate(['/profesor'])
      }
      else if (this.userList[i].user === f.user && this.userList[i].pass === f.pass && this.userList[i].isProfesor === false) {
        lista = [this.userList[i].user, this.userList[i].nombre]
        error = false;
        this.loginService.sendListSource(lista);

        this.router.navigate(['/alumnos'])
      }
      else {
        error = true;
      }
      // && this.userList[i].pass === f.pass
    };



  }
}

/*
ToDo
OnInit profesor
this.loginService.$getObjectSource.suscribe(data -> console.log(data)).unsuscribe

*/
