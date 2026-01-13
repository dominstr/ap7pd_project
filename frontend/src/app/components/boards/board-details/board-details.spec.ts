import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetails } from './board-details';

describe('Details', () => {
  let component: BoardDetails;
  let fixture: ComponentFixture<BoardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
