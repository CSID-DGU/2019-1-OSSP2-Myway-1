
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],


  animations: [
    trigger('heart', [
        state('unliked', style({
            color: '#F6CECE',
            opacity: '1',
            transform: 'scale(1)'
        })),
        state('liked', style({
            color: '#e74c3c',
            opacity: '1',
            transform: 'scale(1.1)'
        })),
        transition('unliked <=> liked', animate('100ms ease-out'))
    ]),

    trigger('star', [
      state('unscrap', style({
          color: '#F2F5A9',
          opacity: '1',
          transform: 'scale(1)'
      })),
      state('scrap', style({
          color: '#FFFF00',
          opacity: '1',
          transform: 'scale(1.1)'
      })),
      transition('unscrap <=> scrap', animate('100ms ease-out'))
  ])
  ]

})
export class PostPage implements OnInit {
  public title: string;
  item: any;
  Email: string;
  chattingRef: any;
  public userid: string;

public likeState: string = 'unliked';
    constructor(
      public plat: Platform,
      public activatedRoute: ActivatedRoute,
      public navCtrl: NavController,
      public db: AngularFireDatabase,
      public atrCtrl: AlertController,
      public fs: AngularFirestore,
      public af: AngularFireAuth,
      public router: Router) {
        // this.item = this.activatedRoute.snapshot.paramMap.get('title');
        // console.log(this.item);
      this.title = this.activatedRoute.snapshot.paramMap.get('title');
      this.load();
      }
public iconName: string = 'heart-empty';
public scrapState: string = 'unscrap';
public starName: string = 'star-outline';
    load() {
      this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
        data => {
        this.item = data;
        });
    }
    async gotoChat(you: string) {
      const alert = await this.atrCtrl.create({
          header: 'Confirm!',
          message: '<strong>' + you + '</strong>' + '와 채팅하시겠습니까??',
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
                this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
                this.fs.collection('chatting').add({
                  uid1: this.af.auth.currentUser.email,
                  uid2: you,
                  Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                this.router.navigate(['chat-view', you]);
              }
            }
          ]
        });
      await alert.present();
    }
    toggleLikeState() {
      if (this.likeState === 'unliked') {
        this.likeState = 'liked';
        this.iconName = 'heart';
      } else {
        this.likeState = 'unliked';
        this.iconName = 'heart-empty';
      }
    }

    toggleScrapState() {
      if (this.scrapState === 'unscrap') {
        this.scrapState = 'scrap';
        this.starName = 'star';
      } else {
        this.scrapState = 'unscrap';
        this.starName = 'star-outline';
      }
    }
  ngOnInit() {
  }

}

