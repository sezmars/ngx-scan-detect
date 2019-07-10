import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDefinitionComponent } from './input-definition.component';

describe('InputDefinitionComponent', () => {
  let component: InputDefinitionComponent;
  let fixture: ComponentFixture<InputDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
