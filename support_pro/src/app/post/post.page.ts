import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public title:string;
  item:any;
  Email:string;
  chattingRef:any;

    constructor( 
      public plat: Platform,
      public activatedRoute: ActivatedRoute,
      public navCtrl: NavController,
      public db: AngularFireDatabase,
      public atrCtrl:AlertController,
      public fs:AngularFirestore,
      public af:AngularFireAuth,
      public router:Router) 
      { 
        // this.item = this.activatedRoute.snapshot.paramMap.get('title');
        // console.log(this.item);
      this.title= this.activatedRoute.snapshot.paramMap.get('title');
      this.load();

      }

    load(){
      this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
        data => {
        this.item = data;
        });  
    }
  
    async gotoChat(you : string){
      const alert = await this.atrCtrl.create({
          header: 'Confirm!',
          message: '<strong>'+you+'</strong>'+'와 채팅하시겠습니까??',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
                this.chattingRef=this.fs.collection('chatting',ref=>ref.orderBy('Timestamp')).valueChanges();
  
                this.fs.collection('chatting').add({
                  uid1:this.af.auth.currentUser.email,
                  uid2:you,
                  Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                })
                this.router.navigate(['chat-view',you]);
              }
            }
          ]
        });
        await alert.present();
    }

  ngOnInit() {
  }

}
