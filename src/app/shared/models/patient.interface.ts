import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Patient {
  id?: string;
  email: string;
  password: string;
  doctorID: string;
  firstName: string;
  lastName: string;
}

export interface PatientFile {
  id?: string;
  email: string;
  patientID: string;
  firstName: string;
  lastname: string;
  age: number;
  CNP: string;
  address: string;
  phoneNumber: string;
  profession: string;
  placeForWork: string;
  allergies: string;
  cardiologicalConsultations: string;
}

export interface PatientConsultation {
  id?: string;
  patientID: string;
  symptoms: string;
  reason: string;
  diagnosis: string;
}

export interface PatientAlarm {
  data: string;
  parametru: string;
  text: string;
  valActuala: number;
  valMaxima: number;
  valMinima: number;
}

export interface PatientRecomandation {
  durata: number;
  frecventa: number;
  indicatii: string;
  tipActivitate: string;
}

export interface PatientParametersPuls {
  valMaxima: number;
  valMinima: number;
  valori: [0];
}
