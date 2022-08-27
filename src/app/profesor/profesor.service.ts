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
      color: 'primary',
      hex: '#428cff'
    },
    {
      cod: 'PGY4121',
      title: 'Programación de aplicaciones móviles',
      section: '003V',
      color: 'primary',
      hex: '#428cff'
    },
    {
      cod: 'PGY2121',
      title: 'Programación de escritorio',
      section: '002V',
      color: "warning",
      hex: '#ffd534'
    },
    {
      cod: 'PGY1121',
      title: 'Programación de algoritmos',
      section: '002V',
      color: 'tertiary',
      hex: '#6a64ff'
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