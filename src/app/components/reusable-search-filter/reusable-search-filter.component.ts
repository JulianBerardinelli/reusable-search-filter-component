import { Component, Input, TemplateRef, ContentChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular'; // Importar LoadingController

@Component({
  selector: 'app-reusable-search-filter',
  templateUrl: './reusable-search-filter.component.html',
  styleUrls: ['./reusable-search-filter.component.scss'],
})
export class ReusableSearchFilterComponent implements OnInit, OnChanges {
  @Input() data: any[] = []; 
  @Input() categories: string[] = [];
  @Input() itemsPerPageOptions: number[] = [5, 10, 15];
  @Input() defaultItemsPerPage: number = 5;
  @Input() dateRanges: string[] = [];

  @ContentChild('itemTemplate', { static: true }) itemTemplate!: TemplateRef<any>;

  public filteredData: any[] = [];
  public paginatedResults: any[] = [];
  
  public currentPage = 1;
  public itemsPerPage!: number;
  public totalPages = 1;

  public searchText = '';
  public filterDates = { fromDate: '', toDate: '' }; // Para almacenar las fechas seleccionadas
  public selectedCategory = '';

  // Variables temporales para las fechas seleccionadas en el modal
  public tempFromDate = '';
  public tempToDate = '';

  constructor(private menuCtrl: MenuController, 
              private modalController: ModalController,
              private loadingController: LoadingController) {} // Inyectar LoadingController

  ngOnInit() {
    this.itemsPerPage = this.defaultItemsPerPage || 10; 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data.length > 0) {
      console.log('Datos recibidos:', this.data);
      this.filteredData = [...this.data];
      this.paginate();
    }
  }

  handleSearch(event: any) {
    this.searchText = event.target.value.toLowerCase();
    this.applyFilters();
  }

  async applyFilters() {
    // Mostrar loading
    const loading = await this.loadingController.create({
      message: 'Aplicando filtros...',
      duration: 500, // 0.5 segundos
    });
    await loading.present();

    this.filteredData = this.data.filter(item => {
      const matchesSearch = item.model?.toLowerCase().includes(this.searchText);
      const matchesCategory = this.selectedCategory 
        ? item.categorie?.toLowerCase() === this.selectedCategory.toLowerCase() 
        : true;
      const matchesDateRange = this.isWithinDateRange(item);

      return matchesSearch && matchesCategory && matchesDateRange;
    });
    
    this.currentPage = 1;
    this.paginate();

    // Cerrar el loading y el menú lateral
    await loading.dismiss();
    this.closeFilters();
  }

  clearFilters() {
    this.searchText = '';
    this.filterDates = { fromDate: '', toDate: '' };
    this.selectedCategory = '';
    this.filteredData = [...this.data];
    this.paginate();

    // Cerrar el menú lateral después de limpiar los filtros
    this.closeFilters();
  }

  async selectFromDate() {
    this.filterDates.fromDate = this.tempFromDate;
  
    const modal = await this.modalController.getTop();
    if (modal) {
      setTimeout(() => {
        modal.dismiss();
      }, 100);
    }
  }
  
  async selectToDate() {
    this.filterDates.toDate = this.tempToDate;
  
    const modal = await this.modalController.getTop();
    if (modal) {
      setTimeout(() => {
        modal.dismiss();
      }, 100);
    }
  }

  isWithinDateRange(item: any): boolean {
    const itemDate = item.date_time ? new Date(item.date_time) : null;
    const fromDate = this.filterDates.fromDate ? new Date(this.filterDates.fromDate) : null;
    const toDate = this.filterDates.toDate ? new Date(this.filterDates.toDate) : null;

    if (!itemDate) return true;
    if (fromDate && toDate) {
      return itemDate >= fromDate && itemDate <= toDate;
    } else if (fromDate) {
      return itemDate >= fromDate;
    } else if (toDate) {
      return itemDate <= toDate;
    } else {
      return true;
    }
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedResults = this.filteredData.slice(start, end);  
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  openFilters() {
    this.menuCtrl.open('filterMenu');
  }

  closeFilters() {
    this.menuCtrl.close('filterMenu');
  }
}
