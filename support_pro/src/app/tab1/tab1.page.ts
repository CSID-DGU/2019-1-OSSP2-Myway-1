import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public userid: string;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController
    ) {
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      this.plat.ready().then(() => {
        this.stor.get('id').then((val) => {
          this.userid = val;
        });
      });
    }
  logout() {
    this.userid = null;
    this.stor.set('id', null);
  }
  navigateToPageLogin() {
    this.navCtrl.navigateForward('LoginPage');
  }
  navigateToPageSignUp() {
    this.navCtrl.navigateForward('RegisterPage');
  }
}
