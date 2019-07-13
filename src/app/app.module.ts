import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxBarCodePutModule} from 'ngx-barcodeput';
import {BrowserModule} from '@angular/platform-browser';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarCodePutComponent} from './examples/ngx-barcodeput';
import {NgxBarCodePutLibComponent} from './examples/ngx-barcodeput-lib';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatInputModule, MatTooltipModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        NgxBarCodePutComponent,
        NgxBarCodePutLibComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        MatCardModule,
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule,
        NgxBarCodePutModule,
        BrowserAnimationsModule,
        DeviceDetectorModule.forRoot(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
