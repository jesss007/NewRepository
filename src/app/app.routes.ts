import { Routes } from '@angular/router';
import { ProductComponent } from './INV/Product/Components/product-list/product.component';
import { OpeningBalanceComponent } from './INV/Opening Balance/Components/opening-balance-list/opening-balance.component';
import { StockSummaryComponent } from './INV/Stock/Components/stock-summary-list/stock-summary.component';

export const routes: Routes = [
   {path : 'product', component : ProductComponent},
   {path : 'opening-balance', component: OpeningBalanceComponent},
   {path: 'stock-summary', component: StockSummaryComponent},
  
];
