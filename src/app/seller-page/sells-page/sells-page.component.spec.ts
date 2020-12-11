import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsPageComponent } from './sells-page.component';

describe('SellsPageComponent', () => {
  let component: SellsPageComponent;
  let fixture: ComponentFixture<SellsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
