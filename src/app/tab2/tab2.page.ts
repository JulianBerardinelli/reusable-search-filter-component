import { Component, OnInit } from '@angular/core';
import { DataService, GuitarItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  guitars: GuitarItem[] = [];
  guitarCategories: string[] = [];
  guitarDateRanges: string[] = []


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadGuitars();
  }

  async loadGuitars() {
    this.guitars = await this.dataService.getAllGuitarItems();
    
    // Verifica si todas las propiedades se están cargando correctamente
    console.log('Guitarras cargadas:', this.guitars);
    
    // Crear el set de categorías únicas de las guitarras cargadas
    this.guitarCategories = [...new Set(this.guitars.map(guitar => guitar.categorie))];
    console.log('Categorías de guitarras:', this.guitarCategories);

    // Crear el set de rangos de fechas únicas de las guitarras cargadas
    this.guitarDateRanges = [...new Set(this.guitars.map(guitar => guitar.date_time))];
    console.log('Rangos de fechas de guitarras:', this.guitarDateRanges);
    
    // Verifica cada guitarra y sus propiedades
    this.guitars.forEach(guitar => {
      console.log(`Modelo: ${guitar.model}, Marca: ${guitar.brand}, Precio: ${guitar.price}, Material: ${guitar.body_material}, Año: ${guitar.year_of_manufacture}, Número de cuerdas: ${guitar.number_of_strings}, Imagen: ${guitar.photo_url}, Fecha: ${guitar.date_time}`);
    });
  }
  
  
}
