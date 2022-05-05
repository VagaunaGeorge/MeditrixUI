import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { Doctor } from 'src/app/shared/models/doctor.interface';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(private router: Router, private doctorsSvc: DoctorsService) {
    const navigation = this.router.getCurrentNavigation();
    this.doctor = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.doctor === 'undefined') {
      this.router.navigate(['doctors']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.doctor;
    this.router.navigate(['doctors/edit'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void> {
    try {
      await this.doctorsSvc.onDeleteDoctors(this.doctor?.id);
      alert('Stergere cu succes!');
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['doctors']);
  }
}
