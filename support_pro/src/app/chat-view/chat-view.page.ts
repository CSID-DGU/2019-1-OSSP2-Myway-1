import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit {

  text:string;
  chatRef:any;
  me:string;
  you:string;
  Email:string;
  constructor(public af:AngularFireAuth,public fs:AngularFirestore, public stor:Storage) { 
    this.stor.get('me').then((val)=>{
      this.me=val
    });
    this.stor.get('you').then((val)=>{
      this.you=val
    });
    this.Email=this.af.auth.currentUser.email;
    this.chatRef=this.fs.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();
  }

  ngOnInit() {
  }

  send(){
    if(this.text!=''){
      this.fs.collection('chats').add({
        Email:this.af.auth.currentUser.email,
        You:this.you,
        Message:this.text,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
    }
  }

}
