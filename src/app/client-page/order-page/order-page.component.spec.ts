import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageComponent } from './order-page.component';

describe('OrderPageComponent', () => {
  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
