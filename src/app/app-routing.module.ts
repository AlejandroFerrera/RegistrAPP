import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosPageModule)
  },
  {
    path: 'profesor',
    children: [
      {
        path: "",
        loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorPageModule)
      },
      {
        path: ":sectionCode",
        loadChildren: () => import('./profesor/section-qr/section-qr.module').then(m => m.SectionQrPageModule)
      }
    ]

  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
