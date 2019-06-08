import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit {

  text:string;
  chatRef:any;
  uid:string;

  constructor(public af:AngularFireAuth,public fs:AngularFirestore) { 
    this.uid=localStorage.getItem('userid');
    this.chatRef=this.fs.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();
  }

  ngOnInit() {
  }

  send(){
    if(this.text!=''){
      this.fs.collection('chats').add({
        Email:this.af.auth.currentUser.email,
        Message:this.text,
        UserID:this.af.auth.currentUser.uid,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
    }
  }

}
