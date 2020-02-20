import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';


const routes: Routes = [
  { path: 'people', component: HomeComponent},
  { path: 'people/:id', component: PersonDetailComponent},
  {path: "**", redirectTo: '/people'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
