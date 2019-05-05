import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  username: string = '';
  // tslint:disable-next-line:no-inferrable-types
  password: string = '';

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this;
    try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
        console.log('login succeed');
      } catch (err) {
      console.dir(err);
      console.log('Check id or password');
      if (err.code === 'auth/user-not-found') {
        console.log('User not found');
      }
    }
  }
}
