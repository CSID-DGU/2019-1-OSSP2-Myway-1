import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { viewAttached } from '@angular/core/src/render3/instructions';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  chattingRef: any;
  Email: string;
  you: string;
  constructor(
    public fs: AngularFirestore,
    public af: AngularFireAuth,
    public nav: NavController,
    public router: Router,
    public stor: Storage,
    public atrCtrl: AlertController
    ) {
      // this.Email=this.af.auth.currentUser.email,
      this.stor.get('id').then((val) => {
        this.Email = val;
      });
      this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
  }
  ionViewWillEnter() {
    this.stor.get('id').then((val) => {
      this.Email = val;
    });
  }
  openChat(you: string) {
    this.you = you;
    this.router.navigate(['chat-view', this.you]);

  }
}
