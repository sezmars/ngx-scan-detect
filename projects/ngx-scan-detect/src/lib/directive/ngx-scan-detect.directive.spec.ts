import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxScanDetectDirective } from './ngx-scan-detect.directive';

@Component({
  template: `<input ngxScanDetect />`,
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
      By.directive(NgxScanDetectDirective)
    );
  });

  it('should create an instance', () => {
    const directive = new NgxScanDetectDirective(tooltipElement?.nativeElement);
    expect(directive).toBeTruthy();
  });
});
