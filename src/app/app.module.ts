import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxBarCodePutModule} from 'ngx-barcodeput';
import {AppRoutingModule} from './app.routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarCodePutComponent} from './examples/ngx-barcodeput';
import {NgxBarCodePutLibComponent} from './examples/ngx-barcodeput-lib';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatInputModule, MatTabsModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NgxBarCodePutComponent,
    NgxBarCodePutLibComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxBarCodePutModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
