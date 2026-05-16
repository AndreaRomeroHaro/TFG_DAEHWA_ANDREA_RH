import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionInicialComponent } from './evaluacion-inicial.component';

describe('EvaluacionInicialComponent', () => {
  let component: EvaluacionInicialComponent;
  let fixture: ComponentFixture<EvaluacionInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionInicialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionInicialComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
