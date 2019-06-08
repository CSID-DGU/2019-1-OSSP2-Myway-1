import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  
  chattingRef:any;
  Email:string;

  constructor(public fs:AngularFirestore,public af:AngularFireAuth, public nav:NavController ){

    this.Email=this.af.auth.currentUser.email;
    /*this.fs.collection('chatting').add({ // 대화한 상대목록  저장
      you: "yoo@naver.com",
      me:this.Email,
      Timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    //this.uid=localStorage.getItem('userid');
    */
    this.chattingRef=this.fs.collection('chatting',ref=>ref.orderBy('Timestamp')).valueChanges();

    //this.nav.navigateForward('/chat-view');
  }
  select(){
    this.nav.navigateRoot('/chat-view');
  }
}
