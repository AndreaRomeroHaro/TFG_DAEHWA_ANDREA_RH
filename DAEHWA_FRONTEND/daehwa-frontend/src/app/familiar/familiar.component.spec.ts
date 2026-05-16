import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFamiliar } from './familiar.component';

describe('ComponenteFamiliar', () => {
  let component: ComponenteFamiliar;
  let fixture: ComponentFixture<ComponenteFamiliar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteFamiliar],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteFamiliar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
