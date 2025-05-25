# Filter Component

The `FilterComponent` is a reusable Angular component designed to provide various filters for data types in your application. It allows parent components to determine which filters to display based on their specific needs.

## Usage

To use the `FilterComponent`, include it in your parent component's template and bind the necessary input properties to control the visibility of each filter.

### Available Filters

The `FilterComponent` includes the following filters:

- **Date Filters**
  - `fromDate`: Start date for filtering.
  - `toDate`: End date for filtering.

- **Fee Filters**
  - `fromFees`: Minimum fee for filtering.
  - `toFees`: Maximum fee for filtering.

- **Dropdown Filters**
  - `areaIds`: Filter by area.
  - `citiesIds`: Filter by city.
  - `litigationRequestCategoryIds`: Filter by litigation request category.
  - `litigationRequestStatusIds`: Filter by litigation request status.

## Configuration

To configure which filters to display, use the following input properties in your parent component:

```html
<app-filter 
  [showFromDate]="true" 
  [showToDate]="true" 
  [showFromFees]="true" 
  [showToFees]="true" 
  [showAreaIds]="true" 
  [showCitiesIds]="true" 
  [showLitigationRequestCategoryIds]="true" 
  [showLitigationRequestStatusIds]="true">
</app-filter>
```

Set each property to `true` or `false` to control the visibility of the corresponding filter.

## API Calls

The `FilterComponent` handles input changes and makes API calls for dropdown filters to fetch the necessary data dynamically. Ensure that the appropriate services are provided in your module to support these operations.

## Testing

Unit tests for the `FilterComponent` are included in the `filter.component.spec.ts` file. These tests ensure that the component behaves as expected and that filters are displayed or hidden based on the parent component's configuration.

## Conclusion

The `FilterComponent` is a flexible and powerful tool for managing filters in your Angular application. Customize it to fit your needs and enhance the user experience with effective data filtering capabilities.