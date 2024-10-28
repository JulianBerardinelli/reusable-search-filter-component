import { Component, Input, TemplateRef, ContentChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reusable-search-filter',
  templateUrl: './reusable-search-filter.component.html',
  styleUrls: ['./reusable-search-filter.component.scss'],
})
export class ReusableSearchFilterComponent implements OnInit, OnChanges {
  @Input() data: any[] = []; // Datos a filtrar
  @Input() categories: string[] = []; // Categorías disponibles para el filtro de categoría
  @Input() itemsPerPageOptions: number[] = [5, 10, 15]; // Opciones de paginación
  @Input() defaultItemsPerPage: number = 5; // Cantidad de elementos por página por defecto
  @Input() dateRanges: string[] = []; // Rango de fechas disponible para el filtro de fechas
  @Input() enableOrderByPrice: boolean = false; // Habilita el filtro de ordenamiento por precio

  @ContentChild('itemTemplate', { static: true }) itemTemplate!: TemplateRef<any>;

  public filteredData: any[] = []; // Datos después de aplicar los filtros
  public paginatedResults: any[] = []; // Resultados de datos paginados

  public currentPage = 1; // Página actual de la paginación
  public itemsPerPage!: number; // Elementos por página seleccionados
  public totalPages = 1; // Número total de páginas

  public searchText = ''; // Texto de búsqueda
  public filterDates = { fromDate: '', toDate: '' }; // Rango de fechas para el filtro
  public selectedCategory = ''; // Categoría seleccionada en el filtro
  public selectedOrder = ''; // Orden seleccionado para el filtro de precio

  // Variables temporales para fechas en el modal
  public tempFromDate = '';
  public tempToDate = '';

  constructor(
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.itemsPerPage = this.defaultItemsPerPage || 10; 
  }

  ngOnChanges(changes: SimpleChanges) {
    // Actualiza datos si cambian y reinicia la paginación
    if (changes['data'] && this.data.length > 0) {
      this.filteredData = [...this.data];
      this.paginate();
    }
  }

  handleSearch(event: any) {
    // Actualiza texto de búsqueda y aplica filtros
    this.searchText = event.target.value.toLowerCase();
    this.applyFilters();
  }

  async applyFilters() {
    // Muestra un indicador de carga mientras se aplican los filtros
    const loading = await this.loadingController.create({
      message: 'Aplicando filtros...',
      duration: 500,
    });
    await loading.present();

    // Filtra datos según búsqueda, categoría y rango de fechas
    this.filteredData = this.data.filter((item) => {
      const matchesSearch = item.model?.toLowerCase().includes(this.searchText);
      const matchesCategory = this.selectedCategory
        ? item.categorie?.toLowerCase() === this.selectedCategory.toLowerCase()
        : true;
      const matchesDateRange = this.isWithinDateRange(item);

      return matchesSearch && matchesCategory && matchesDateRange;
    });

    this.applyOrder(); // Aplica el orden si está habilitado
    this.currentPage = 1; // Reinicia la paginación
    this.paginate();

    await loading.dismiss();
    this.closeFilters(); // Cierra el menú de filtros
  }

  clearFilters() {
    // Limpia todos los filtros y restablece los datos originales
    this.searchText = '';
    this.filterDates = { fromDate: '', toDate: '' };
    this.selectedCategory = '';
    this.selectedOrder = '';
    this.filteredData = [...this.data];
    this.paginate();
    this.closeFilters();
  }

  async selectFromDate() {
    // Asigna la fecha de inicio seleccionada y cierra el modal
    this.filterDates.fromDate = this.tempFromDate;
    const modal = await this.modalController.getTop();
    if (modal) {
      setTimeout(() => modal.dismiss(), 100);
    }
  }

  async selectToDate() {
    // Asigna la fecha de fin seleccionada y cierra el modal
    this.filterDates.toDate = this.tempToDate;
    const modal = await this.modalController.getTop();
    if (modal) {
      setTimeout(() => modal.dismiss(), 100);
    }
  }

  isWithinDateRange(item: any): boolean {
    // Comprueba si el elemento está dentro del rango de fechas especificado
    const itemDate = item.date_time ? new Date(item.date_time) : null;
    const fromDate = this.filterDates.fromDate ? new Date(this.filterDates.fromDate) : null;
    const toDate = this.filterDates.toDate ? new Date(this.filterDates.toDate) : null;

    if (!itemDate) return true;
    if (fromDate && toDate) return itemDate >= fromDate && itemDate <= toDate;
    if (fromDate) return itemDate >= fromDate;
    if (toDate) return itemDate <= toDate;
    return true;
  }

  applyOrder() {
    // Aplica el orden de los elementos por precio si está habilitado
    if (this.selectedOrder === 'asc') {
      this.filteredData.sort((a, b) => a.price - b.price);
    } else if (this.selectedOrder === 'desc') {
      this.filteredData.sort((a, b) => b.price - a.price);
    }
  }

  paginate() {
    // Divide los datos filtrados en páginas
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedResults = this.filteredData.slice(start, end);
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  prevPage() {
    // Retrocede una página en la paginación
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    // Avanza una página en la paginación
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  openFilters() {
    // Abre el menú lateral de filtros
    this.menuCtrl.open('filterMenu');
  }

  closeFilters() {
    // Cierra el menú lateral de filtros
    this.menuCtrl.close('filterMenu');
  }
}
