import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McuDetails } from './mcu-details';

describe('McuDetails', () => {
  let component: McuDetails;
  let fixture: ComponentFixture<McuDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McuDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McuDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
