import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeGraphComponent } from './home-graph/home-graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/1', pathMatch: 'full' },
  {
    path: 'home/:id',
    component: HomeComponent,
   },
   { path: '**', redirectTo: '/home/1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
