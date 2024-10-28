# 🎛️ Reusable Search Filter Component

A powerful, flexible, and reusable search filter component for Angular + Ionic applications, designed to work with any type of data source — be it an external database, local data, or JSON. This component provides rich filtering, searching, sorting, and pagination capabilities that adapt to the data passed into it.

## 📄 Features
- 🔍 **Search**: Quickly filter items by a search term.
- 📅 **Date Range Filtering**: Filter results based on a specified date range.
- 📂 **Category Filter**: Narrow down results using specific categories.
- 💸 **Sort by Price**: Optionally sort items by price, ascending or descending.
- 📄 **Pagination**: Display items in pages and control the number of items shown.

---

## 🛠️ Installation

To include the component in your Angular + Ionic project, follow these steps:

1. **Import the Module**

   Make sure to import the `ReusableSearchFilterModule` in your desired module:

   ```typescript
   import { ReusableSearchFilterModule } from 'path-to-your-component/reusable-search-filter.module';

   @NgModule({
     imports: [ReusableSearchFilterModule, ...],
   })
   export class YourModule {}
   ```

2. **Add to Template**

   Add the `<app-reusable-search-filter>` component tag in your HTML template where you want to display the filter and pagination UI.

---

## 📝 Component Setup and Usage

The `ReusableSearchFilterComponent` works by accepting data and various configurations as props. It adapts to any dataset, and you can enable/disable features such as category filtering, date range filtering, and sorting based on your needs.

### 📂 Component Properties (Props)

Here is a list of all the configurable properties for the `ReusableSearchFilterComponent`:

| Prop                  | Type          | Default       | Required | Description                                                                                   |
|-----------------------|---------------|---------------|----------|-----------------------------------------------------------------------------------------------|
| `data`                | `any[]`       | `[]`         | ✔️       | Array of data items to be displayed and filtered.                                             |
| `categories`          | `string[]`    | `[]`         | ❌       | Array of categories available for filtering items.                                            |
| `dateRanges`          | `string[]`    | `[]`         | ❌       | Date range values for filtering items by date.                                                |
| `enableOrderByPrice`  | `boolean`     | `false`      | ❌       | Enables sorting by price when set to `true`.                                                  |
| `itemsPerPageOptions` | `number[]`    | `[5,10,15]`  | ❌       | Options for selecting items per page in pagination.                                           |
| `defaultItemsPerPage` | `number`      | `5`          | ❌       | Default number of items to display per page.                                                  |

---

### 🔌 Example Usage

The component can be set up with dynamic data using props. Here’s an example:

```typescript
// tab2.page.ts
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
  guitarDateRanges: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadGuitars();
  }

  async loadGuitars() {
    this.guitars = await this.dataService.getAllGuitarItems();
    this.guitarCategories = [...new Set(this.guitars.map(guitar => guitar.categorie))];
    this.guitarDateRanges = [...new Set(this.guitars.map(guitar => guitar.date_time))];
  }
}
```

```html
<!-- tab2.page.html -->
<ion-content>
  <app-reusable-search-filter 
    [data]="guitars" 
    [categories]="guitarCategories"
    [dateRanges]="guitarDateRanges"
    [enableOrderByPrice]="true"
    [itemsPerPageOptions]="[5, 10, 20]" 
    [defaultItemsPerPage]="10">
    <ng-template #itemTemplate let-items>
      <app-data-grid [guitars]="items"></app-data-grid>
    </ng-template>
  </app-reusable-search-filter>
</ion-content>
```

### 💡 Explanation

In this setup:
- **`[data]="guitars"`**: Passes the array of guitar data to the filter component.
- **`[categories]="guitarCategories"`**: Defines categories based on guitar types for filtering.
- **`[dateRanges]="guitarDateRanges"`**: Sets up date range filtering options.
- **`[enableOrderByPrice]="true"`**: Enables price-based sorting.
- **`[itemsPerPageOptions]="[5, 10, 20]"`**: Provides options for items per page.
- **`[defaultItemsPerPage]="10"`**: Sets default items displayed per page to 10.

### 🧩 Custom Template Slot

Use the `<ng-template #itemTemplate let-items>` slot to customize how items are displayed:

```html
<ng-template #itemTemplate let-items>
  <app-data-grid [guitars]="items"></app-data-grid>
</ng-template>
```

---

## 📋 Features and Functionalities in Detail

1. **Search Functionality**
   - Utilizes the `searchText` variable to filter items based on text input. Simply type in the search bar, and the list will update in real-time.

2. **Category Filter**
   - Enables filtering by category. Pass a `categories` array to the component, and it will display a dropdown with options. Selecting a category will filter the list accordingly.

3. **Date Range Filter**
   - Allows filtering items based on a date range. Use the `dateRanges` prop to set up available date ranges. When a range is selected, the component filters items that fall within it.

4. **Price Sorting**
   - Enables sorting items by price in ascending or descending order. To enable this feature, set the `enableOrderByPrice` prop to `true`. The user can then choose the order from a dropdown menu.

5. **Pagination**
   - Allows users to control how many items are shown per page. Options can be set with the `itemsPerPageOptions` prop. The default items per page can be specified with `defaultItemsPerPage`.

---

## 📐 Design and UI Elements

### Search Bar
A simple text input field to filter items by name or description. This component listens to changes and applies them immediately.

### Sidebar Menu
The filtering options appear in a sidebar (`ion-menu`), which slides in from the right. It contains options to apply filters by:
   - Price
   - Category
   - Date Range

### Pagination Controls
At the bottom of the component, there are controls for navigating between pages of filtered data, with buttons for "Previous" and "Next".

---

## 🚀 Advanced Usage

For more advanced usage, such as customizing label texts or modifying the filter functionality:
1. **Template Customization**: You can customize the look and feel by adjusting the CSS or overriding the component’s internal HTML structure.
2. **Dynamic Data**: Pass any dynamic data source, and the component will handle sorting, pagination, and filtering.

---

## 👥 Contributors

This component was developed by Julián Berardinelli and can be adapted or extended as needed for specific project requirements.

