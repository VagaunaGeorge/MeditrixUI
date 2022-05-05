import { Doctor } from 'src/app/shared/models/doctor.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctors: Observable<Doctor[]>;

  private doctorsCollection: AngularFirestoreCollection<Doctor>;

  constructor(private readonly afs: AngularFirestore) {
    this.doctorsCollection = afs.collection<Doctor>('medici');
    this.getDoctors();
  }

  onDeleteDoctors(empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.doctorsCollection.doc(empId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveDoctor(doctor: Doctor, empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...doctor };
        const result = await this.doctorsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getDoctors(): void {
    this.doctors = this.doctorsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Doctor))
    );
  }
}
