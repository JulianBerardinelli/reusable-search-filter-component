import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule

import { ReusableSearchFilterComponent } from './reusable-search-filter.component';  // Importa el componente

@NgModule({
  declarations: [ReusableSearchFilterComponent],
  imports: [
    CommonModule,  // Necesario para las directivas de Angular
    FormsModule,   // Para los formularios y [(ngModel)]
    IonicModule    // Para los componentes de Ionic (ion-button, ion-list, etc.)
  ],
  exports: [ReusableSearchFilterComponent]  // Exporta el componente para que sea usado fuera
})
export class ReusableSearchFilterModule {}
