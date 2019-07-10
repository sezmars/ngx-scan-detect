import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InputDefinitionComponent} from './input-definition/input-definition.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InputDefinitionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
