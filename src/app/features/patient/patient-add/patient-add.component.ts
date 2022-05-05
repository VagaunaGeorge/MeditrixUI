import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/shared/models/patient.interface';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
})
export class PatientAddComponent implements OnInit {
  patient: Patient;
  patientForm: FormGroup;
  doctors$ = this.doctorsSvc.doctors;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private patientsSvc: PatientsService,
    public firebaseService: FirebaseService,
    private angularFirestore: AngularFirestore,
    private doctorsSvc: DoctorsService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.patient === 'undefined') {
      // if this.patient is undefined we are in create new mode
    } else {
      this.patientForm.patchValue(this.patient);
    }
  }

  onSave(): void {
    console.log('Saved', this.patientForm.value);
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      const patientId = this.patient?.id || null;
      this.patientsSvc.onSavePatient(patient, patientId);
      this.patientForm.reset();

      alert('Pacient adaugat cu succes!');
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['patients']);
  }

  async onSignUp(email: string, password: string) {
    await this.firebaseService.signup(email, password);
    this.angularFirestore
      .collection('pacienti')
      .add(this.patient)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
      );
    // if (this.firebaseService.isLoggedIn) {
    //   // this.isSignedIn = true;
    // }
  }

  isValidField(field: string): string {
    const validatedField = this.patientForm.get(field);
    return !validatedField.valid && validatedField.touched
      ? 'is-invalid'
      : validatedField.touched
      ? 'is-valid'
      : '';
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      // lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      doctorID: ['', [Validators.required]],
    });
  }
}
