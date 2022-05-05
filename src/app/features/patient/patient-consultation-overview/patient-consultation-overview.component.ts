import { Component, OnInit } from '@angular/core';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
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
  selector: 'app-patient-consultation-overview',
  templateUrl: './patient-consultation-overview.component.html',
  styleUrls: ['./patient-consultation-overview.component.scss'],
})
export class PatientConsultationOverviewComponent implements OnInit {
  patient: Patient;
  consultations: PatientConsultation[] = [];
  allDiagnostics: Diagnostic[] = [];

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
      consultation: null,
      mode: null,
    },
  };

  constructor(
    private router: Router,
    private patientService: PatientsService,
    private diagService: DiagnosticsService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    this.diagService.getAll().subscribe((res) => (this.allDiagnostics = res));

    if (typeof this.patient === 'undefined') {
      this.router.navigate(['patients']);
    } else {
      this.patientService
        .getPatientConsulatations(this.patient.id)
        .then((res) => {
          for (var i = res.docs.length - 1; i >= 0; i--) {
            this.addToList(res.docs[i]);
          }
        });
    }
  }

  getDiagText(cod: string) {
    var denumire = this.allDiagnostics.find((opt) => opt.cod == cod)?.denumire;
    return `${cod} - ${denumire}`;
  }

  addToList(consultationList: QueryDocumentSnapshot<PatientConsultation>) {
    var consultationID = consultationList.id;
    var consultation = consultationList.data() as PatientConsultation;
    consultation.id = consultationID;
    this.consultations.push(consultation);
  }

  onGoToCreate(): void {
    this.navigationExtras.state.value = this.patient;
    this.navigationExtras.state.mode = ViewMode.CREATE;
    this.router.navigate(['patients/consultations/add'], this.navigationExtras);
  }

  onGoToDetails(item: any): void {
    this.navigationExtras.state.consultation = item;
    this.navigationExtras.state.value = this.patient;
    this.navigationExtras.state.mode = ViewMode.EDIT;
    this.router.navigate(
      ['patients/consultations/details'],
      this.navigationExtras
    );
  }
}
