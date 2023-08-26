import { Route } from '@angular/router';

import { NgxScanDetectComponent } from './examples/ngx-scan-detect/ngx-scan-detect.component';

export const APP_ROUTES: Route[] = [
  { path: '', pathMatch: 'full', component: NgxScanDetectComponent },
  { path: '**', redirectTo: '/' },
];
