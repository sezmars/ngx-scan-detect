import { TestBed } from '@angular/core/testing';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          RouterLink,
          RouterOutlet,
        ],
      })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Barcode Scanner Input Detect'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Barcode Scanner Input Detect');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain(
        'Barcode Scanner Input Detect'
    );
  });
});
