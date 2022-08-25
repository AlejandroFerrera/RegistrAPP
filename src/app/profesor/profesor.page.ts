import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  private asignaturas = [
    {
      cod:'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '002V' 
    },
    {
      cod:'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '003V' 
    },
    {
      cod:'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '004V' 
    },
    {
      cod:'PGY2121',
      title: 'Programación de escritorio',
      section: '002V' 
    },
    {
      cod:'PGY1121',
      title: 'Programación de algoritmos',
      section: '002V' 
    }
  ]

  constructor() { }
    
  ngOnInit() {
  }

}
