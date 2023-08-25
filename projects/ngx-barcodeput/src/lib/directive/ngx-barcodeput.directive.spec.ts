import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxBarCodePutDirective } from './ngx-barcodeput.directive';

@Component({
  template: `<input ngxBarCodePut />`,
})
class TestComponent {}

describe('NgxBarcodeputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let tooltipElement: DebugElement;
  let testComponent: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewContainerRef],
    });
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    tooltipElement = fixture.debugElement.query(
      By.directive(NgxBarCodePutDirective)
    );
  });

  it('should create an instance', () => {
    const directive = new NgxBarCodePutDirective(tooltipElement?.nativeElement);
    expect(directive).toBeTruthy();
  });
});
