import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBarCodePutComponent} from './ngx-barcodeput.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';

describe('NgxBarCodePutComponent', () => {
  let component: NgxBarCodePutComponent;
  let fixture: ComponentFixture<NgxBarCodePutComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        MatTooltipModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
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
