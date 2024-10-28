import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 

import { ReusableSearchFilterComponent } from './reusable-search-filter.component'; 

@NgModule({
  declarations: [ReusableSearchFilterComponent],
  imports: [
    CommonModule,  
    FormsModule,  
    IonicModule    
  ],
  exports: [ReusableSearchFilterComponent] 
})
export class ReusableSearchFilterModule {}
