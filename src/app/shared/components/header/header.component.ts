import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminGuard } from 'src/app/core/guard/admin-guard.service';
import { DoctorGuard } from 'src/app/core/guard/doctor-guard.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>();
  @Input() currentSignedIn: string = null;

  constructor(
    public firebaseService: FirebaseService,
    public adminGuard: AdminGuard,
    public doctorGuard: DoctorGuard
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.firebaseService.logout();
    this.isLogout.emit();
  }

}
