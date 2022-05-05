import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PatientsService } from 'src/app/services/patients.service';
import {
  Patient,
  PatientFile,
  PatientAlarm,
  PatientRecomandation,
} from 'src/app/shared/models/patient.interface';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient;
  patientFileForm: FormGroup;
  alarmsList: PatientAlarm[] = [];
  recomandationsList: PatientRecomandation[] = [];
  patientFile: PatientFile;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private router: Router,
    private patientSvc: PatientsService,
    private firebaseSvc: FirebaseService
  ) {}

  ngOnInit(): void {
    var user = this.firebaseSvc.getCurrentUser();
    console.log(user);
    //this.patientSvc.getPatientAlarms(user.id).then((alarms) => {
    this.patientSvc
      .getPatientAlarms('16gFfA9pfMe8HP5KD6qPiQLLKTk1')
      .then((alarms) => {
        this.alarmsList = alarms.docs.map((x) => x.data() as PatientAlarm);
      });

    this.patientSvc
      .getPatientRecomandations('16gFfA9pfMe8HP5KD6qPiQLLKTk1')
      .then((recomandations) => {
        this.recomandationsList = recomandations.docs.map(
          (x) => x.data() as PatientRecomandation
        );
      });

    this.patientSvc
      .getPatientFile('16gFfA9pfMe8HP5KD6qPiQLLKTk1')
      .then((res) => {
        var data = res.docs[0];
        if (data) {
          this.patientFile = data.data() as PatientFile;
        }
      });
  }
}
