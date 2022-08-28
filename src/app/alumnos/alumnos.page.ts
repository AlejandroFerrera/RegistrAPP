import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,AnimationController,createAnimation} from '@ionic/angular';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {

  /*animacion*/
  
  const animationClick = this.animationCtrl.create()
  .addElement(document.getElementById("animationClick"))
  .fill('none')
  .duration(1500)
  .iterations(Infinity)
  .keyframes([
    { offset: 0, transform: 'scale(1)', opacity: '1' },
    { offset: 0.5, transform: 'scale(1.1)', opacity: '0.9' },
    { offset: 1, transform: 'scale(1)', opacity: '1' }
  ]);

  animationClick.play()

  }

}
