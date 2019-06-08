import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  
  chattingRef:any;
  uid:string;

  constructor(public fs:AngularFirestore,public af:AngularFireAuth, public nav:NavController ){

    this.fs.collection('chatting').add({
      uid1: "yoo@naver.com",
      uid2:"hoj2887@naver.com"
    })
    this.uid=localStorage.getItem('useid');
    this.chattingRef=this.fs.collection('useid',ref=>ref.orderBy('Timestamp')).valueChanges();

    //this.nav.navigateForward('/chat-view');
  }
  select(){
    this.nav.navigateRoot('/chat-view');
  }
}
