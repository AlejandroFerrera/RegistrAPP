import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    pathMatch: 'full',
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./alumnos/alumnos.module').then((m) => m.AlumnosPageModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./e404/e404.module').then((m) => m.E404PageModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
