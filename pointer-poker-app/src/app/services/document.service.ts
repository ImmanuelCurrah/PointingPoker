import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) {}

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    this.socket.emit('addDoc', {
      id: this.docId(),
      doc: '',
      users: [],
    });
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let docId = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      docId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return docId;
  }
}
