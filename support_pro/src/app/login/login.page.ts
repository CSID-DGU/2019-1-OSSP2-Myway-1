import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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

  constructor(
    public stor: Storage,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }
  async login() {
    const { username, password } = this;
    try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
        this.stor.set('id', username);
        this.alertCtrl.create({
          header:'',
          message:'로그인되었습니다',
          buttons:[{
            text:'확인',
            role:'cancel'
          }]
        }).then(alertEl=>{
          alertEl.present();
        });
        this.router.navigateByUrl('tabs/tab1');
      } catch (err) {
      this.alertCtrl.create({
        header: '',
        message: '빈곳을 확인해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
}


