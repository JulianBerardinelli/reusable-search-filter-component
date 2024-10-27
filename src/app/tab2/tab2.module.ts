import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ReusableSearchFilterModule } from '../components/reusable-search-filter/reusable-search-filter.module';
import { DataGridModule } from '../components/data-grid/data-grid.modal';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ReusableSearchFilterModule,
    DataGridModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
