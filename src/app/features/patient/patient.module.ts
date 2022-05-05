import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientsOverviewComponent } from './patients-overview/patients-overview.component';
import { PatientFileComponent } from './patient-file/patient-file.component';
import { PatientConsultationOverviewComponent } from './patient-consultation-overview/patient-consultation-overview.component';
import { PatientConsultationDetailsComponent } from './patient-consultation-details/patient-consultation-details.component';
import { PatientDetailsComponent } from './patient-details/patient-details.components';
import { GraphicComponent } from '../graphics/graphics.component';

@NgModule({
  declarations: [
    PatientAddComponent,
    PatientsOverviewComponent,
    PatientFileComponent,
    PatientConsultationOverviewComponent,
    PatientConsultationDetailsComponent,
    PatientDetailsComponent,
    GraphicComponent,
  ],
  imports: [CommonModule, PatientRoutingModule, ReactiveFormsModule],
})
export class PatientModule {}
