import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasLogopedaComponent } from './citas-logopeda.component';

describe('CitasLogopedaComponent', () => {
  let component: CitasLogopedaComponent;
  let fixture: ComponentFixture<CitasLogopedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasLogopedaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitasLogopedaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
