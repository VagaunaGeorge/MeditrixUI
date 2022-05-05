import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'doctors',
    loadChildren: () =>
      import('./features/doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./features/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
