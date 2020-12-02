import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignComponentComponent } from './sign-component.component';

describe('SignComponentComponent', () => {
  let component: SignComponentComponent;
  let fixture: ComponentFixture<SignComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
