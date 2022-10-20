import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'home',
    redirectTo: 'hone',
    pathMatch: 'full'
  },

  {
    path: 'alumnos',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },

  {
    path: 'profesor',
    redirectTo: 'profesor',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
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
  
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
