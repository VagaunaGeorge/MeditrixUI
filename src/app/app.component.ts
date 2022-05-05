import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud';
  isSignedIn = false;
  currentSignedIn = null;
  // isAdmin = false;
  // isDoctor = false;
  // private doctorsCollection: AngularFirestoreCollection<Doctor>;

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) {
    // this.doctorsCollection = afs.collection<Doctor>('medici');
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
      this.currentSignedIn = JSON.parse(localStorage.getItem('user'))['email'];
    }
    else {
      this.isSignedIn = false;
      this.currentSignedIn = null;
    }
  }

  // async onSignUp(email: string, password: string){
  //   // await this.firebaseService.signUp(email, password);
  //   // // if (this.firebaseService.isLoggedIn) {
  //   // //   // this.isSignedIn = true;
  //   // // }
  // }

  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.currentSignedIn = email;
    }
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.currentSignedIn = email;
    }
  }
  // async onSignin(email: string, password: string){
  //   await this.firebaseService.signIn(email, password);
  //   if (this.firebaseService.isLoggedIn) {
  //     if (email === 'admin@yahoo.com') {
  //       this.isSignedIn = true;
  //       this.isAdmin = true;
  //     }
  //     } else if (email === 'ale@yahoo.com') {
  //       this.isSignedIn = true;
  //       this.isAdmin = false;
  //       const db = firebase.firestore();
  //       db.collection('medici').where('email', '==', 'ale@yahoo.com').get().then(snap => {
  //       snap.forEach(doc => {
  //         console.log(doc.data());
  //       });
  //     });
  //     }
  //   }

  handleLogout() {
    this.isSignedIn = false;
    this.currentSignedIn = null;

    // reload to destroy all components on logout 
    this.router.navigate(['']);
    location.reload();
  }
}
