import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReusableSearchFilterComponent } from './reusable-search-filter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('ReusableSearchFilterComponent', () => {
  let component: ReusableSearchFilterComponent;
  let fixture: ComponentFixture<ReusableSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableSearchFilterComponent],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableSearchFilterComponent);
    component = fixture.componentInstance;

    // Datos iniciales de prueba
    component.data = [
      { model: 'Guitarra A', categorie: 'Cuerdas', price: 100, date_time: '2023-10-01' },
      { model: 'Guitarra B', categorie: 'Cuerdas', price: 200, date_time: '2023-11-15' },
      { model: 'Teclado A', categorie: 'Teclados', price: 150, date_time: '2023-10-10' }
    ];

    fixture.detectChanges();
  });

  it('debe filtrar los datos por texto en el campo de búsqueda', () => {
    component.searchText = 'guitarra';
    component.filterBySearchText();
    
    console.log('Resultado de filtro por búsqueda:', component.filteredData);

    expect(component.filteredData.length).toBe(2); // Solo debería mostrar los modelos con "Guitarra"
    expect(component.filteredData[0].model).toContain('Guitarra');
  });

  it('debe filtrar los datos por rango de fechas', () => {
    component.filterDates = { fromDate: '2023-10-01', toDate: '2023-10-31' };
    component.applyFilters();
  
    console.log('Resultado de filtro por rango de fechas:', component.filteredData);

    expect(component.filteredData.length).toBe(2); // Solo debe mostrar elementos en octubre
    expect(component.filteredData.every(item => new Date(item.date_time) >= new Date('2023-10-01') && new Date(item.date_time) <= new Date('2023-10-31'))).toBeTrue();
  });

  it('debe filtrar los datos por categoría', () => {
    component.selectedCategory = 'Cuerdas';
    component.applyFilters();
  
    console.log('Resultado de filtro por categoría:', component.filteredData);

    expect(component.filteredData.length).toBeGreaterThan(0); // Asegura que hay resultados para la categoría
    expect(component.filteredData.every(item => item.categorie === 'Cuerdas')).toBeTrue(); // Confirma que todos los elementos coinciden
  });

  it('debe aplicar múltiples filtros correctamente y mostrar resultados válidos', () => {
    component.searchText = 'Guitarra';
    component.selectedCategory = 'Cuerdas';
    component.filterDates = { fromDate: '2023-10-01', toDate: '2023-12-01' };
    component.applyFilters();

    console.log('Resultado de múltiples filtros:', component.filteredData);

    const isCorrect = component.filteredData.every(item => 
      item.model.includes('Guitarra') &&
      item.categorie === 'Cuerdas' &&
      new Date(item.date_time) >= new Date('2023-10-01') &&
      new Date(item.date_time) <= new Date('2023-12-01')
    );

    expect(component.filteredData.length).toBeGreaterThan(0); // Confirma que hay resultados
    expect(isCorrect).toBeTrue(); // Verifica que todos cumplen con los filtros
  });

  it('debe realizar la paginación correctamente', () => {
    component.itemsPerPage = 2;
    component.filteredData = component.data; // Usa todos los datos para paginación
    component.paginate();
  
    expect(component.paginatedResults.length).toBe(2); // Solo dos elementos en la primera página
    expect(component.totalPages).toBe(2); // Total de páginas: 2 (3 elementos divididos en 2 por página)
  });

  it('debe limpiar todos los filtros y restablecer los datos', () => {
    component.searchText = 'Guitarra';
    component.selectedCategory = 'Cuerdas';
    component.filterDates = { fromDate: '2023-10-01', toDate: '2023-12-01' };
  
    component.clearFilters();
  
    expect(component.searchText).toBe('');
    expect(component.selectedCategory).toBe('');
    expect(component.filterDates.fromDate).toBe('');
    expect(component.filterDates.toDate).toBe('');
    expect(component.filteredData.length).toBe(component.data.length); // Debería mostrar todos los datos
  });
});
