import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McuList } from './mcu-list';

describe('McuList', () => {
  let component: McuList;
  let fixture: ComponentFixture<McuList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McuList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McuList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
