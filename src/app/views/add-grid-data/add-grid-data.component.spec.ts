import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGridDataComponent } from './add-grid-data.component';

describe('AddGridDataComponent', () => {
  let component: AddGridDataComponent;
  let fixture: ComponentFixture<AddGridDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGridDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGridDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
