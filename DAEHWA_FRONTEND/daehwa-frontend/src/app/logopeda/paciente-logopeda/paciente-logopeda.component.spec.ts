import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteLogopedaComponent } from './paciente-logopeda.component';

describe('PacienteLogopedaComponent', () => {
  let component: PacienteLogopedaComponent;
  let fixture: ComponentFixture<PacienteLogopedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteLogopedaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteLogopedaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
