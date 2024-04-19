import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfsuComponent } from './efsu.component';

describe('EfsuComponent', () => {
  let component: EfsuComponent;
  let fixture: ComponentFixture<EfsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfsuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EfsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
