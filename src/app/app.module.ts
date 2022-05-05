import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponentComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    AngularFireModule.initializeApp({
      // apiKey: 'AIzaSyDTfReXNAk1IufcewLCEK7ZtgmBPRervvo',
      // authDomain: 'proba-addusers.firebaseapp.com',
      // projectId: 'proba-addusers',
      //storageBucket: 'proba-addusers.appspot.com',
      //  messagingSenderId: '575108439734',
      //  appId: '1:575108439734:web:2215328d8c616dc8741017'

      apiKey: 'AIzaSyCXoe4KKU4p2F7I_w5hWix8yJ0ZVDn56Vs',
      authDomain: 'proiectmaster-42b16.firebaseapp.com',
      databaseURL:
        'https://proiectmaster-42b16-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'proiectmaster-42b16',
      storageBucket: 'proiectmaster-42b16.appspot.com',
      messagingSenderId: '195034960485',
      appId: '1:195034960485:web:d83193c1c3a9acd5e6ec8c',
    }),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
