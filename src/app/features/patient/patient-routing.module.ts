import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from 'src/app/core/guard/doctor-guard.service';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientConsultationDetailsComponent } from './patient-consultation-details/patient-consultation-details.component';
import { PatientConsultationOverviewComponent } from './patient-consultation-overview/patient-consultation-overview.component';
import { PatientFileComponent } from './patient-file/patient-file.component';
import { PatientsOverviewComponent } from './patients-overview/patients-overview.component';
import { PatientDetailsComponent } from './patient-details/patient-details.components';
import { GraphicComponent } from '../graphics/graphics.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DoctorGuard],
    component: PatientsOverviewComponent,
  },
  {
    path: 'new',
    canActivate: [DoctorGuard],
    component: PatientAddComponent,
  },
  {
    path: 'edit',
    canActivate: [DoctorGuard],
    component: PatientAddComponent,
  },
  {
    path: 'file/add',
    canActivate: [DoctorGuard],
    component: PatientFileComponent,
  },
  {
    path: 'file/view',
    canActivate: [DoctorGuard],
    component: PatientFileComponent,
  },
  {
    path: 'consultations',
    canActivate: [DoctorGuard],
    component: PatientConsultationOverviewComponent,
  },
  {
    path: 'consultations/add',
    canActivate: [DoctorGuard],
    component: PatientConsultationDetailsComponent,
  },
  {
    path: 'consultations/details',
    component: PatientConsultationDetailsComponent,
  },
  {
    path: 'details',
    component: PatientDetailsComponent,
  },
  {
    path: 'graphics',
    component: GraphicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
