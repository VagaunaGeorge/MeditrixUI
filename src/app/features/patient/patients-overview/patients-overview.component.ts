import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminGuard } from 'src/app/core/guard/admin-guard.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/shared/models/patient.interface';
import { ViewMode } from 'src/app/shared/models/view-mode';

@Component({
  selector: 'app-patients-overview',
  templateUrl: './patients-overview.component.html',
  styleUrls: ['./patients-overview.component.scss'],
})
export class PatientsOverviewComponent implements OnInit {
  patients = [];
  doctors$ = this.doctorsSvc.doctors;
  showPasswordColumn = false;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
      mode: null,
    },
  };

  constructor(
    private router: Router,
    private patientsSvc: PatientsService,
    private doctorsSvc: DoctorsService,
    private adminGuard: AdminGuard
  ) {
    this.showPasswordColumn = this.adminGuard.checkIfAdmin();
  }

  ngOnInit(): void {
    this.patientsSvc.getPatients().subscribe((res) => (this.patients = res));
  }

  getDoctorEmail(doctorsList, doctorId) {
    console.log(doctorId);
    if (doctorsList) return doctorsList.find((d) => d.id == doctorId)?.email;
  }

  onGoToAddFile(item: any): void {
    this.navigationExtras.state.value = item;
    this.navigationExtras.state.mode = ViewMode.CREATE;
    this.router.navigate(['patients/file/add'], this.navigationExtras);
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['patients/edit'], this.navigationExtras);
  }

  onGoToConsultations(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['patients/consultations'], this.navigationExtras);
  }

  async onGoToDelete(empId: string): Promise<void> {
    try {
      await this.patientsSvc.onDeletePatients(empId);
      alert('Stergere cu succes!');
    } catch (err) {
      console.log(err);
    }
  }
}
