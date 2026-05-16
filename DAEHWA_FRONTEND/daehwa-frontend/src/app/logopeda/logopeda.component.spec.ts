import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLogopeda } from './logopeda.component';

describe('ComponenteLogopeda', () => {
  let component: ComponenteLogopeda;
  let fixture: ComponentFixture<ComponenteLogopeda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteLogopeda],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteLogopeda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
