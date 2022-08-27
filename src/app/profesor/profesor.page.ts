import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './profesor.service';
import { LoginService } from '../login/login.service'
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  asignaturas = []
  list = []


  constructor(private profesorService: ProfesorService, private loginService: LoginService) { }


  ngOnInit() {

    this.asignaturas = this.profesorService.getAsignaturas()
    this.loginService.$getListSource.subscribe(lista => this.list = [...lista]).unsubscribe
  }
}
