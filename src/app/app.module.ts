import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {InputDefinitionComponent} from './input-definition/input-definition.component';

@NgModule({
  declarations: [
    AppComponent,
    InputDefinitionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
