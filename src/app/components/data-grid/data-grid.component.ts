import { Component, Input } from '@angular/core';
import { GuitarItem } from '../../services/data.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent  {
  @Input() guitars: GuitarItem[] = [];

  ngOnInit() {
    console.log('Guitarras recibidas en el grid:', this.guitars); // Verifica que los datos se están pasando correctamente
  }
}

