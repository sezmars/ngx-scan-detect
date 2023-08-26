import { Route } from '@angular/router';

import { NgxScanDetectComponent } from './examples/ngx-scan-detect/ngx-scan-detect.component';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'ngx-scan-detect', pathMatch: 'full' },
  {
    path: 'ngx-scan-detect',
    component: NgxScanDetectComponent,
  },
  { path: '**', redirectTo: '/' },
];
