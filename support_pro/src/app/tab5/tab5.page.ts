import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  public userid: string=null;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public router: Router,
    public atrCtrl: AlertController
    ) {
     // this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      this.stor.get('id').then((val) => {
        this.userid = val;
      });
    }
  
  async atrLout(){
    const alert = await this.atrCtrl.create({
      header: '확인',
      message: '로그아웃되었습니다',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {
            console.log('logout');
          }
        }
      ]
    });
    await alert.present();
  }
  logout() {
    console.log("logout");
    this.userid = null;
    this.stor.set('id', null);
    firebase.auth().signOut().then(function(){ // 채팅 못하도록 함
      console.log("Sign-out successful");
    });
    this.atrLout();
    window.location.href = '/tabs/tab5';
  }
  toText(){
    this.router.navigateByUrl('/my-text');
  }
  toLike(){
    this.router.navigateByUrl('/my-like');
  }
  toScrap(){
    this.router.navigateByUrl('/my-scrap');
  }
}
