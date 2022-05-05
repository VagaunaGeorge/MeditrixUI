import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QuerySnapshot,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Patient,
  PatientConsultation,
  PatientFile,
  PatientAlarm,
  PatientRecomandation,
  PatientParametersPuls,
} from 'src/app/shared/models/patient.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private patientsCollection: AngularFirestoreCollection<Patient>;
  private patientFileCollection: AngularFirestoreCollection<PatientFile>;
  private patientConsulationCollection: AngularFirestoreCollection<PatientConsultation>;
  private patientAlarmsCollection: AngularFirestoreCollection<PatientAlarm>;

  constructor(
    private readonly afs: AngularFirestore,
    private firebaseService: FirebaseService
  ) {
    this.patientsCollection = afs.collection<Patient>('pacienti');
    this.patientFileCollection = afs.collection<PatientFile>('fisaPacient');
    this.patientConsulationCollection =
      afs.collection<PatientConsultation>('consultatii');
    this.patientAlarmsCollection = afs.collection<PatientAlarm>('alarme');
  }

  onDeletePatients(empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.patientsCollection.doc(empId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSavePatient(patient: Patient, empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...patient };
        const result = await this.patientsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveRecom(recom: PatientRecomandation, pacId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { id, ...recom };
        const result = this.afs
          .collection('pacienti')
          .doc(pacId)
          .collection<PatientRecomandation>('recomandari')
          .doc(id)
          .set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSavePatientFile(patientFile: PatientFile): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = patientFile.id || this.afs.createId();
        const data = { id, ...patientFile };
        const result = await this.patientFileCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getPatientFile(patientId: string): Promise<QuerySnapshot<PatientFile>> {
    console.log(patientId);
    return this.patientFileCollection.ref
      .where('patientID', '==', patientId)
      .limit(1)
      .get();
  }

  onSavePatientConsultation(consult: PatientConsultation): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = consult.id || this.afs.createId();
        const data = { id, ...consult };
        const result = await this.patientConsulationCollection
          .doc(id)
          .set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveParametersLimits(consult: PatientConsultation): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = consult.id || this.afs.createId();
        const data = { id, ...consult };
        const result = await this.patientConsulationCollection
          .doc(id)
          .set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getPatientConsulatations(
    patientId: string
  ): Promise<QuerySnapshot<PatientConsultation>> {
    return this.patientConsulationCollection.ref
      .where('patientID', '==', patientId)
      .get();
  }

  getPatients(): Observable<Patient[]> {
    var user = this.firebaseService.getCurrentUser();
    console.log(user);
    return this.patientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions
          .map((a) => a.payload.doc.data() as Patient)
          .filter((p) => {
            if (!user?.doctor) {
              return true;
            }
            return p.doctorID == user.id;
          })
      )
    );
  }

  getPatientAlarms2(patientId: string): Promise<QuerySnapshot<PatientAlarm>> {
    return this.afs
      .collection<PatientAlarm>(`patienti/${patientId}/alarme`)
      .ref.get();
    //.valueChanges()
    // .subscribe();
  }

  getPatientAlarms(patientId: string): Promise<QuerySnapshot<PatientAlarm>> {
    return this.afs
      .collection('pacienti')
      .doc(patientId)
      .collection<PatientAlarm>('alarme')
      .ref.get();
    //.valueChanges()
    // .subscribe();
  }
  /*
  private getPatients(): void {
    this.patients = this.patientsCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Patient))
      );
  }
  */

  getPatientRecomandations(
    patientId: string
  ): Promise<QuerySnapshot<PatientRecomandation>> {
    return this.afs
      .collection('pacienti')
      .doc(patientId)
      .collection<PatientRecomandation>('recomandari')
      .ref.get();
  }

  getPatientParametersPuls(
    patientId: string
  ): Promise<QuerySnapshot<PatientParametersPuls>> {
    return this.afs
      .collection('pacienti')
      .doc(patientId)
      .collection<PatientParametersPuls>('parametri')
      .ref.get();
  }
}
