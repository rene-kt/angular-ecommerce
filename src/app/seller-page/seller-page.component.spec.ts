import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPageComponent } from './seller-page.component';

describe('SellerPageComponent', () => {
  let component: SellerPageComponent;
  let fixture: ComponentFixture<SellerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
