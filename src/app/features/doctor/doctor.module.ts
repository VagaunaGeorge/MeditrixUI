import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorsOverviewComponent } from './doctors-overview/doctors-overview.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';



@NgModule({
  declarations: [
    DoctorsOverviewComponent,
    DoctorAddComponent,
    DoctorDetailsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule
  ]
})
export class DoctorModule { }
