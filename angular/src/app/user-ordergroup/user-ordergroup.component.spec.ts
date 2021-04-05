import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdergroupComponent } from './user-ordergroup.component';

describe('UserOrdergroupComponent', () => {
  let component: UserOrdergroupComponent;
  let fixture: ComponentFixture<UserOrdergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrdergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrdergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
