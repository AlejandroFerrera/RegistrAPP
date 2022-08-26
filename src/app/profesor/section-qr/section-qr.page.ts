import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../profesor.service';
import { ActivatedRoute } from "@angular/router";
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-section-qr',
  templateUrl: './section-qr.page.html',
  styleUrls: ['./section-qr.page.scss'],
})
export class SectionQrPage implements OnInit {

  section = {}
  constructor(private activetedRoute: ActivatedRoute, private profesorService: ProfesorService, private animationCtrl: AnimationController) {


  }


  ngOnInit() {
    this.activetedRoute.paramMap.subscribe(paramMap => {
      const cod = paramMap.get('sectionCode')
      this.section = this.profesorService.getAsignatura(cod)



      const animation = this.animationCtrl.create()
        .addElement(document.getElementById("arrow"))
        .duration(3000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translateY(0px)', opacity: 0 },
          { offset: 0.5, transform: 'translateY(10px)', opacity: 1 },
          { offset: 1, transform: 'translateY(0px)', opacity: 0 }
        ])
      animation.play();
    })
  }
}
