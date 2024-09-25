import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerSliderComponent } from './best-seller-slider.component';

describe('BestSellerSliderComponent', () => {
  let component: BestSellerSliderComponent;
  let fixture: ComponentFixture<BestSellerSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestSellerSliderComponent]
    });
    fixture = TestBed.createComponent(BestSellerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
