import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCartComponent } from './voting-cart.component';

describe('VotingCartComponent', () => {
  let component: VotingCartComponent;
  let fixture: ComponentFixture<VotingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
