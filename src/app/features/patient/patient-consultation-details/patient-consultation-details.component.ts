import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DiagnosticsService } from 'src/app/services/diagnostic.service';
import { PatientsService } from 'src/app/services/patients.service';
import { Diagnostic } from 'src/app/shared/models/diagnostics.interface';
import {
  Patient,
  PatientConsultation,
} from 'src/app/shared/models/patient.interface';
import { ViewMode } from 'src/app/shared/models/view-mode';

@Component({
  selector: 'app-patient-consultation-details',
  templateUrl: './patient-consultation-details.component.html',
  styleUrls: ['./patient-consultation-details.component.scss'],
})
export class PatientConsultationDetailsComponent implements OnInit {
  patient: Patient;
  consultation: PatientConsultation;
  allDiagnostics: Diagnostic[] = [];
  mode: ViewMode;
  form: FormGroup;
  navigationExtras: NavigationExtras = { state: { value: null } };

  constructor(
    private router: Router,
    private patientService: PatientsService,
    private diagService: DiagnosticsService,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras?.state?.value;
    this.consultation = navigation?.extras?.state?.consultation;
    this.mode = navigation?.extras?.state?.mode;

    if (this.patient) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.diagService.getAll().subscribe((res) => (this.allDiagnostics = res));

    if (
      typeof this.patient === 'undefined' ||
      typeof this.consultation === 'undefined'
    ) {
      this.router.navigate(['patients']);
    } else {
      if (this.mode == ViewMode.CREATE) {
        this.form.patchValue({
          patientID: this.patient.id,
        });
      } else {
        this.form.patchValue(this.consultation);
      }
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [null],
      patientID: [this.patient.id, [Validators.required]],
      reason: ['', [Validators.required]],
      diagnosis: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
    });
  }

  isValidField(field: string): string {
    const validatedField = this.form.get(field);
    return !validatedField.valid ? 'is-invalid' : '';
  }

  onSave() {
    var newConsult = this.form.getRawValue() as PatientConsultation;
    this.patientService.onSavePatientConsultation(newConsult);

    this.navigationExtras.state.value = this.patient;
    this.router.navigate(['patients/consultations'], this.navigationExtras);
  }
}
