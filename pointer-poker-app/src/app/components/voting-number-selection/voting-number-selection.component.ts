import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voting-number-selection',
  templateUrl: './voting-number-selection.component.html',
  styleUrls: ['./voting-number-selection.component.scss'],
})
export class VotingNumberSelectionComponent implements OnInit {
  @Output() vote = new EventEmitter<number>();

  possibleVotes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {}

  ngOnInit(): void {}

  selectVote(vote: number) {
    this.vote.emit(vote);
  }
}
