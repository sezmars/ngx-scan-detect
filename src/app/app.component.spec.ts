import {AppComponent} from './app.component';
import {NgxBarCodePutModule} from 'ngx-barcodeput';
import {async, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarCodePutComponent} from './examples/ngx-barcodeput';
import {NgxBarCodePutLibComponent} from './examples/ngx-barcodeput-lib';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule,
        NgxBarCodePutModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        DeviceDetectorModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        NgxBarCodePutComponent,
        NgxBarCodePutLibComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Barcode Scanner Input Detect'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Barcode Scanner Input Detect');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Barcode Scanner Input Detect!');
  });
});
