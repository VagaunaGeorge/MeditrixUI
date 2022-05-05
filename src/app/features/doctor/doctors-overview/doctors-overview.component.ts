import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-doctors-overview',
  templateUrl: './doctors-overview.component.html',
  styleUrls: ['./doctors-overview.component.scss'],
})
export class DoctorsOverviewComponent implements OnInit {
  doctors$ = this.doctorsSvc.doctors;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(private router: Router, private doctorsSvc: DoctorsService) {}

  ngOnInit(): void {}

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['doctors/edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['doctors/details'], this.navigationExtras);
  }

  async onGoToDelete(empId: string): Promise<void> {
    try {
      await this.doctorsSvc.onDeleteDoctors(empId);
      alert('Stergere cu succes!');
    } catch (err) {
      console.log(err);
    }
  }
}
