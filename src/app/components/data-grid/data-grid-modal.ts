import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataGridComponent } from './data-grid.component';

@NgModule({
  declarations: [DataGridComponent],
  imports: [CommonModule, IonicModule],
  exports: [DataGridComponent]
})
export class DataGridModule {}
