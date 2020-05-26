import { MatPaginatorIntl } from '@angular/material';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Items per pagina: ';
  customPaginatorIntl.firstPageLabel = 'Eerste pagina';
  customPaginatorIntl.nextPageLabel = 'Volgende pagina';
  customPaginatorIntl.previousPageLabel = 'Vorige pagina';
  customPaginatorIntl.lastPageLabel = 'Laatste pagina';

  return customPaginatorIntl;
}