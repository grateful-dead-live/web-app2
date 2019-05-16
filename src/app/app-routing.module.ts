import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './views/show.component';
import { LocationComponent } from './views/location.component';
import { VenueComponent } from './views/venue.component';

const routes: Routes = [
  { path: '', redirectTo: '/show', pathMatch: 'full' },
  { path: 'show', component: ShowComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'location/:id', component: LocationComponent },
  { path: 'venue/:id', component: VenueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
