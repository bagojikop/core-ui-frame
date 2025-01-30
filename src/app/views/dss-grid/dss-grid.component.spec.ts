import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DssGridComponent } from './dss-grid.component';

describe('DssGridComponent', () => {
  let component: DssGridComponent;
  let fixture: ComponentFixture<DssGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DssGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DssGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
