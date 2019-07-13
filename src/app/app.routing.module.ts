import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxBarCodePutComponent} from './examples/ngx-barcodeput';
import {NgxBarCodePutLibComponent} from './examples/ngx-barcodeput-lib';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ngx-barcodeput',
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'ngx-barcodeput',
    component: NgxBarCodePutComponent,
  },
  {
    path: 'ngx-barcodeput-lib',
    component: NgxBarCodePutLibComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
