import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Document } from 'src/app/models/document.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit, OnDestroy {
  constructor(private documentService: DocumentService) {}

  document: Document;
  private _docSub: Subscription;

  vote: number;

  count: number = 0;

  ngOnInit(): void {
    this._docSub = this.documentService.currentDocument
      .pipe(
        startWith({
          id: '',
          doc: 'Select an existing document or create a new one to get started',
          users: [],
          currentUser: '',
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.document.doc = `I have been indeed... edited ${this.count} times`;
    this.documentService.editDocument(this.document);
    this.count += 1;
  }

  handleVote(vote: number): void {
    this.vote = vote;
  }
}
