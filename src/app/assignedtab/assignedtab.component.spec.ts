import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtabComponent } from './assignedtab.component';

describe('AssignedtabComponent', () => {
  let component: AssignedtabComponent;
  let fixture: ComponentFixture<AssignedtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedtabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
