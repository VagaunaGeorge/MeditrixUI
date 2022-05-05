import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Doctor } from 'src/app/shared/models/doctor.interface';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent implements OnInit {
  doctor: Doctor;
  doctorForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private doctorsSvc: DoctorsService,
    public firebaseService: FirebaseService,
    public firebaseAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.doctor = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.doctor === 'undefined') {
      // if this.doctor is undefined we are in create new mode
    } else {
      this.doctorForm.patchValue(this.doctor);
    }
  }

  onSave(): void {
    if (this.doctorForm.valid) {
      const doctor = this.doctorForm.value;
      this.firebaseAuth
        .createUserWithEmailAndPassword(doctor.email, doctor.password)
        .then((res) => {
          console.log('created ' + res.user.uid);
          const doctorId = this.doctor?.id || res.user.uid;
          this.doctorsSvc.onSaveDoctor(doctor, doctorId);
          console.log('Saved', this.doctorForm.value);
          this.doctorForm.reset();
        });
      alert('Doctor adaugat cu succes!');
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['doctors']);
  }

  isValidField(field: string): string {
    const validatedField = this.doctorForm.get(field);
    return !validatedField.valid && validatedField.touched
      ? 'is-invalid'
      : validatedField.touched
      ? 'is-valid'
      : '';
  }

  private initForm(): void {
    this.doctorForm = this.fb.group({
      // lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required]],
    });
  }
}
