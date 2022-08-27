import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private asignaturas = [
    {
      cod: 'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '002V',
      color: 'primary'
    },
    {
      cod: 'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '003V',
      color: 'primary'
    },
    {
      cod: 'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '004V',
      color: 'primary'
    },
    {
      cod: 'PGY2121',
      title: 'Programación de escritorio',
      section: '002V',
      color: "success"
    },
    {
      cod: 'PGY1121',
      title: 'Programación de algoritmos',
      section: '002V',
      color: 'warning'
    }
  ]

  constructor() { }

  getAsignaturas() {
    return [...this.asignaturas]
  }

  getAsignatura(codAsignatura: string) {
    return {
      ...this.asignaturas.find(asignatura => {
        return asignatura.cod + asignatura.section === codAsignatura
      })
    }
  }
}