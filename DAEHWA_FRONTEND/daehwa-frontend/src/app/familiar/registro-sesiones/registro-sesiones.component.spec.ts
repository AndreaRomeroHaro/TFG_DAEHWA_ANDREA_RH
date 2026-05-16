import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSesionesComponent } from './registro-sesiones.component';

describe('RegistroSesionesComponent', () => {
  let component: RegistroSesionesComponent;
  let fixture: ComponentFixture<RegistroSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSesionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroSesionesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
