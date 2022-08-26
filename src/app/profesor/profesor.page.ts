import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  asignaturas = []

  constructor(private profesorService: ProfesorService) { }
    
  ngOnInit() {
    this.asignaturas = this.profesorService.getAsignaturas()
  }
}
