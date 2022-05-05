import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin-guard.service';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorsOverviewComponent } from './doctors-overview/doctors-overview.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: DoctorsOverviewComponent
  },
  {
    path: 'new',
    canActivate: [AdminGuard],
    component: DoctorAddComponent
  },
  {
    path: 'edit',
    canActivate: [AdminGuard],
    component: DoctorAddComponent
  },
  {
    path: 'details',
    canActivate: [AdminGuard],
    component: DoctorDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
