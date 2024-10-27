import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReusableSearchFilterModule } from './components/reusable-search-filter/reusable-search-filter.module';
import { DataGridModule } from './components/data-grid/data-grid.modal';

@NgModule({
  declarations: [AppComponent, ],  // Importa el componente ReusableSearchFilterComponent
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReusableSearchFilterModule, DataGridModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
