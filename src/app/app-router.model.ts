import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoader } from './app-loader';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppLoader],
    children: [
      {
        path: '',
        component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
