import {Route} from '@angular/router';
import {NgxBarCodePutComponent} from './examples/ngx-barcodeput';

export const APP_ROUTES: Route[] = [
    {path: '', redirectTo: 'ngx-barcodeput', pathMatch: 'full'},
    {
        path: 'ngx-barcodeput',
        component: NgxBarCodePutComponent
    },
    {path: '**', redirectTo: '/'},
];
