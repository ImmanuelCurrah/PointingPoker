import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingNumberSelectionComponent } from './voting-number-selection.component';

describe('VotingNumberSelectionComponent', () => {
  let component: VotingNumberSelectionComponent;
  let fixture: ComponentFixture<VotingNumberSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingNumberSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingNumberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
