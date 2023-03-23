import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AirportListComponent } from './components/airport-list/airport-list.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './components/map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AirportListComponent,
    HomeComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'app-airport-list', component: AirportListComponent,
      },
      {
        path: 'app-map-view', component: MapViewComponent,
      },
      {
        path: '**', component: HomeComponent,
      },
    ]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
