import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdergroupComponent } from './ordergroup.component';

describe('OrdergroupComponent', () => {
  let component: OrdergroupComponent;
  let fixture: ComponentFixture<OrdergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
