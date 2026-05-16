import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesPeriodicasComponent } from './evaluaciones-periodicas.component';

describe('EvaluacionesPeriodicasComponent', () => {
  let component: EvaluacionesPeriodicasComponent;
  let fixture: ComponentFixture<EvaluacionesPeriodicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesPeriodicasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionesPeriodicasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
