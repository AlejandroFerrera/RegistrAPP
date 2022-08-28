import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from './profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  asignaturas = []
  user: any;
  name: any;


  constructor(private profesorService: ProfesorService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.asignaturas = this.profesorService.getAsignaturas()
    this.route.queryParams.subscribe(queryParams => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.name = this.router.getCurrentNavigation().extras.state.name;

      }
    })
  }
}
