import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  username: string = '';
  // tslint:disable-next-line:no-inferrable-types
  password: string = '';
  // tslint:disable-next-line:no-inferrable-types
  cpassword: string = '';
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  async register() {
    const { username, password, cpassword } = this;
    if (password !== cpassword) {
      return console.error('Passwords don\'t match');
    }
    try {
      const res =  this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      console.log(res);
  } catch (error) {
        console.dir(error);
    }
  }

}
