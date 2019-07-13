import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgxBarCodePutComponent} from './ngx-barcodeput.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatCardModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {NgxBarCodePutModule} from 'ngx-barcodeput';

describe('NgxBarCodePutComponent', () => {
  let component: NgxBarCodePutComponent;
  let fixture: ComponentFixture<NgxBarCodePutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [ NgxBarCodePutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBarCodePutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
