import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCardComponent } from './components/add-business-card/business-card.component';
import { HomeComponent } from './components/home/home.component';
import { BusinessCardListComponent } from './components/business-card-list/business-card-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-business-card', component: BusinessCardComponent },
  { path: 'show-business-cards', component: BusinessCardListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
