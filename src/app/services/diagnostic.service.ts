import { Doctor } from 'src/app/shared/models/doctor.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Diagnostic } from '../shared/models/diagnostics.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  private diagCollection: AngularFirestoreCollection<Diagnostic>;

  constructor(
    private readonly afs: AngularFirestore,
    private firebaseService: FirebaseService
  ) {
    this.diagCollection = afs.collection<Diagnostic>('diagnostice');
  }

  getAll(): Observable<Diagnostic[]> {
    return this.diagCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Diagnostic))
      );
  }
}
