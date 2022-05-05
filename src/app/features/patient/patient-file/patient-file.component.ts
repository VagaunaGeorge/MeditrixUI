import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';
import {
  Patient,
  PatientFile,
  PatientRecomandation,
} from 'src/app/shared/models/patient.interface';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.scss'],
})
export class PatientFileComponent implements OnInit {
  patient: Patient;
  patientFileForm: FormGroup;
  recomForm: FormGroup;

  private emailPattern = /\S+@\S+\.\S+/;
  private cnpPattern = /^-?(0|[1-9]\d*)?$/;

  constructor(
    private router: Router,
    private patientService: PatientsService,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras?.state?.value;
    if (this.patient) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    if (typeof this.patient === 'undefined') {
      this.router.navigate(['patients']);
    } else {
      this.patientService.getPatientFile(this.patient.id).then((res) => {
        var data = res.docs[0];
        if (data) {
          // patch form
          var fileId = data.id;
          var patientFile = data.data() as PatientFile;
          patientFile.id = fileId;

          this.patientFileForm.patchValue(patientFile);
        }
      });
    }
  }

  private initForm(): void {
    this.patientFileForm = this.fb.group({
      id: [null],
      patientID: [this.patient.id, [Validators.required]],
      email: [
        this.patient.email,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      CNP: [
        '',
        [
          Validators.required,
          Validators.pattern(this.cnpPattern),
          Validators.minLength(13),
          Validators.maxLength(13)
        ]
      ],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      placeForWork: ['', [Validators.required]],
      medicalHistory: ['', [Validators.required]],
      allergies: ['', [Validators.required]],
      cardiologicalConsultations: ['', [Validators.required]],
    });

    this.recomForm = this.fb.group({
      tipActivitate: [''],
      durata: [''],
      frecventa: [''],
      indicatii: [''],
    });
  }

  isValidField(field: string): string {
    const validatedField = this.patientFileForm.get(field);
    return !validatedField.valid ? 'is-invalid' : '';
  }

  onSave() {
    var newPatientFile = this.patientFileForm.getRawValue() as PatientFile;
    this.patientService.onSavePatientFile(newPatientFile);
    alert('Fisa salvata');
    this.router.navigate(['patients']);
  }

  onSaveRecom() {
    var newRecom = this.recomForm.getRawValue() as PatientRecomandation;
    this.patientService.onSaveRecom(newRecom, this.patient.id);
    alert('Recomandare adaugata');
    this.router.navigate(['patients']);
  }

  onClickGraphicsButton() {
    this.router.navigate(['patients/graphics']);
  }

  onClickRaportsButton() {
    this.router.navigate(['patients/details']);
  }
}
