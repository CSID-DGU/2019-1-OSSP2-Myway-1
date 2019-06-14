import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
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
  size:number; // 총 채팅내용 개수
  index:number; // 채팅 내용이 몇번째 컨텐츠인지
  tmp1:string; // uid1과 uid2를 string으로 저장하기 위함
  tmp2:string;
  number:number; // 채팅방 번호 찾기 위한 변수
  tmpEmail:string;
  tmpYou:string;
  currentU:string;
  chatnum:number; // 몇번째 채팅내용인지 찾기 위한 변수

  constructor(
    public af:AngularFireAuth,
    public fs:AngularFirestore, 
    public stor:Storage,
    public ac:ActivatedRoute,
    public atrCtrl:AlertController,
    public navCtrl:NavController,
    public router: Router,
    public db:AngularFireDatabase
    ) { 
    this.Email=this.af.auth.currentUser.email;
    this.chatRef=this.fs.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();
    let you=this.ac.snapshot.paramMap.get('you');
    this.you=you;
    this.currentU=this.af.auth.currentUser.email;
  }

  ngOnInit() {
  }

  /*send(){
    if(this.text!=''){
      this.fs.collection('chats').add({
        Email:this.af.auth.currentUser.email,
        You:this.you,
        Message:this.text,
        Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
    }
  }*/
  send(){
    if(this.text!=''){
      const db=firebase.firestore();
      db.collection('chats').get().then(snapshot=>{
        this.size=snapshot.size;
        console.log("chatting : "+this.size);
        if(this.size===0){
          this.index=0;
          this.fs.collection('ChatSize').doc('index').set({
            index:this.index
          });
          this.fs.collection('chats').doc((this.index).toString()).set({
            Email:this.currentU,
            You:this.you,
            Message:this.text,
            Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            num:this.index
          });
          this.text='';
          console.log("size0일 떄 : "+this.index);
        }
        else{
          db.collection('ChatSize').get().then(snapshot=>{
            snapshot.forEach(doc=>{
              let getSize=doc.data().index;
              this.index=getSize;
              this.index=this.index+1;
              this.fs.collection('ChatSize').doc('index').set({
                index:this.index
              });
              this.fs.collection('chats').doc((this.index).toString()).set({
                Email:this.currentU,
                You:this.you,
                Message:this.text,
                Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                num:this.index
              });
              this.text='';
              console.log("size 0아닐떄: "+this.index);
            });
          });
        }
      });
    }
  }
  async alertDelete(){
    const alert = await this.atrCtrl.create({
      header:'확인!',
      message: '채팅방이 삭제되었습니다.',
      buttons:[
        {
          text:'Okay',
          role:'cancel',
          handler:(blah)=>{
            console.log('채팅방 삭제');
            window.location.href = '/tabs/tab1';
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteList(){ // 채팅 목록 삭제

    const al = await this.atrCtrl.create({
      header:'확인!',
      message: '채팅방을 삭제하시겠습니까?',
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          cssClass:'secondary',
          handler:(blah)=>{
            console.log("삭제 안함");
          }
        },
        {
          text:'Okay',
          handler:()=>{
            console.log('채팅방 삭제');
            const db=firebase.firestore();
            const collection=db.collection('chatting');
            const collection2=db.collection('chats');
            collection.get().then(snapshot=>{
              snapshot.forEach(doc=>{
                let get1=doc.data().uid1;
                let get2=doc.data().uid2;
                let getIndex=doc.data().num;
                this.tmp1=get1;
                this.tmp2=get2;
                this.number=getIndex;
                if((this.tmp1===this.you && this.tmp2===this.currentU) || (this.tmp2===this.you && this.tmp1===this.currentU)){
                  db.collection("chatting").doc((this.number).toString()).delete();
                  console.log("Delete list");
                  collection2.get().then(snapshot=>{
                    snapshot.forEach(doc=>{
                      let getEmail=doc.data().Email;
                      let getYou=doc.data().You;
                      let getCIdx=doc.data().num;
                      this.tmpEmail=getEmail;
                      this.tmpYou=getYou;
                      this.chatnum=getCIdx;
                      if((this.tmpEmail===this.currentU && this.tmpYou===this.you)|| (this.tmpEmail===this.you && this.tmpYou===this.currentU)){
                        console.log(doc.data().Message);
                        db.collection("chats").doc((this.chatnum).toString()).delete();
                        console.log("Delete contents");
                      }
                    });
                  });
                }
                this.alertDelete();
              });
            });
          }
        }
      ]
    });
    await al.present();
  }
}
