import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
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


  ngOnInit(): void {
    this._docSub = this.documentService.currentDocument
      .pipe(
        startWith({
          id: '',
          doc: 'Select an existing document or create a new one to get started',
          users: [],
        }),
        tap((document) => {
          document.users.forEach((user, index) => {
            localStorage.setItem(`user${index}`, user);
          });
          console.log(document);
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.document.doc = 'ahaha';
    console.log(this.document);
    this.documentService.editDocument(this.document);
  }
}
