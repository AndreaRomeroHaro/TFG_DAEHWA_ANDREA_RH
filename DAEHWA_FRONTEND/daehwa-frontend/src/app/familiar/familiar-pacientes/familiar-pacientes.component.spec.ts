import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarPacientesComponent } from './familiar-pacientes.component';

describe('FamiliarPacientesComponent', () => {
  let component: FamiliarPacientesComponent;
  let fixture: ComponentFixture<FamiliarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliarPacientesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamiliarPacientesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
