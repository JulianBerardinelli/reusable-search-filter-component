import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items = [
    { label: 'Leche', category: 'Lácteos', date: '2024-01-10' },
    { label: 'Jugo de Naranja', category: 'Refrescos', date: '2024-01-12' },
    { label: 'Pan', category: 'Panadería', date: '2024-01-15' },
    { label: 'Huevos', category: 'Lácteos', date: '2024-01-20' },
    { label: 'Pollo', category: 'Carnes', date: '2024-01-25' },
    { label: 'Pescado', category: 'Carnes', date: '2024-04-30' },
    { label: 'Papas', category: 'Verduras', date: '2024-02-01' },
    { label: 'Zanahorias', category: 'Verduras', date: '2024-02-05' },
  ];

  categories = ['Lácteos', 'Refrescos', 'Panadería', 'Carnes', 'Verduras'];
  

  constructor() {}

}
