import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-cart',
  templateUrl: './voting-cart.component.html',
  styleUrls: ['./voting-cart.component.scss'],
})
export class VotingCartComponent implements OnInit {
  @Input() vote: number;
  @Input() users: string[];
  @Input() currentUser: string;

  setVote: number;

  constructor() {}

  ngOnInit(): void {}
}
