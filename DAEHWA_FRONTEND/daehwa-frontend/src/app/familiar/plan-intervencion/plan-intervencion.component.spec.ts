import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanIntervencionComponent } from './plan-intervencion.component';

describe('PlanIntervencionComponent', () => {
  let component: PlanIntervencionComponent;
  let fixture: ComponentFixture<PlanIntervencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanIntervencionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanIntervencionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
