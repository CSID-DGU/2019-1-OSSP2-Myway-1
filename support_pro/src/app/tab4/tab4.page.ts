import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  
  chattingRef:any;
  Email:string;

  constructor(public fs:AngularFirestore,public af:AngularFireAuth, public nav:NavController, public stor:Storage ){

    this.Email=this.af.auth.currentUser.email,
    this.chattingRef=this.fs.collection('chatting',ref=>ref.orderBy('Timestamp')).valueChanges();
  }
  openChat(){
    this.stor.set('me', this.Email);
    this.stor.set('you',"yoo@naver.com");
    this.nav.navigateRoot('/chat-view');
  }
}
