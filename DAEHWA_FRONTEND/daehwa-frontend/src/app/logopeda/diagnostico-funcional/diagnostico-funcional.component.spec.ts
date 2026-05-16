import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoFuncionalComponent } from './diagnostico-funcional.component';

describe('DiagnosticoFuncionalComponent', () => {
  let component: DiagnosticoFuncionalComponent;
  let fixture: ComponentFixture<DiagnosticoFuncionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticoFuncionalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticoFuncionalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
