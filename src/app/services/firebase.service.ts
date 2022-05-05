import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  isMedic = false;
  isPatient = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore
  ) {}

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;

        var user = JSON.parse(JSON.stringify(res.user));
        user.id = res.user.uid;
        localStorage.setItem('user', JSON.stringify(user));

        this.angularFirestore
          .collection('medici')
          .ref.where('email', '==', email)
          .get()
          .then((dbUser) => {
            var isMedic = !!dbUser.docs[0]?.data();

            this.isMedic = isMedic;
            this.isPatient = !isMedic;

            user['doctor'] = isMedic;
            user['patient'] = !isMedic; // if it's not doctor then it's patient

            localStorage.setItem('user', JSON.stringify(user));
          });
      });
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('created');
        // this.isLoggedIn = true;
        // localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  getCurrentUser(): any {
    if (localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  logout() {
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    this.isMedic = false;
    this.isPatient = false;
    localStorage.removeItem('user');
  }
}
