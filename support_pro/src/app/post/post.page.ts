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
import {FavoriteService} from './../../favorite.service';


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
  check = false; // 채팅 목록
  size: number; // 채팅 목록 수
  getSize: any;
  getuid1: string;
  getuid2: string;
  index: number;
  first = true; // 처음 추가되는 채팅목록인지
// tslint:disable-next-line: variable-name
  tmp_hash_1: number;
  tmp: string;
  public tmpC: string;
// tslint:disable-next-line:no-inferrable-types
public likeState: string = 'unliked';
public iconName: string = 'heart-empty';
public scrapState: string = 'unscrap';
public starName: string = 'star-outline';

isFavorite=false;
isScrapped = false;

    constructor(
      public plat: Platform,
      public activatedRoute: ActivatedRoute,
      public navCtrl: NavController,
      public db: AngularFireDatabase,
      public atrCtrl: AlertController,
      public fs: AngularFirestore,
      public af: AngularFireAuth,
      public router: Router,
      public favoriteProvider:FavoriteService
      ) {
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      var strArray = this.userid.split('@');
      this.userid = strArray[0];
      this.title = this.activatedRoute.snapshot.paramMap.get('title');
      this.load();

      this.favoriteProvider.isFavorite(this.title).then(isFav=>{
        this.isFavorite=isFav;
      })

      this.favoriteProvider.isScrapped(this.title).then(isScrap=>{
        this.isScrapped=isScrap;
      })

      }
     
    load() {
      this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
        data => {
        this.item = data;
        let text = this.item[0].content;
        this.tmpC = text.replace(/(<br>|<br\/>|<br\/>)/g, '\n');
        console.log(this.tmpC);
      });
    }

    favoritePost() {
      this.favoriteProvider.favoritePost(this.title).then(() => {
        this.isFavorite = true;
      });
      /*각 게시글 별 좋아요 수 계산 (더하기)*/
      firebase.database().ref().once('value').then((snapshot) => {
        // tslint:disable-next-line: prefer-const
                  let c = snapshot.child('contentCount').val();  //전체 게시글 수
                  this.tmp_hash_1 = c;
        // tslint:disable-next-line: align
                  for ( let i = 0; i < this.tmp_hash_1; i++ ) {
        // tslint:disable-next-line: prefer-const
                    let tmpLikeCount1 = snapshot.child(`regisTxt/${i}/title`).val();
                    this.tmp = tmpLikeCount1;
                    if ( this.title === this.tmp ) {
        // tslint:disable-next-line: no-var-keyword
                         var likeCount = snapshot.child(`regisTxt/${i}/like`).val(); // 좋아요 수
                         likeCount = likeCount + 1;
                         this.db.object(`regisTxt/${i}/like`).set(likeCount);
                       }
                }
                });
    }
    unfavoritePost() {
      this.favoriteProvider.unfavoritePost(this.title).then(() => {
        this.isFavorite = false;
      });
       /*각 게시글 별 좋아요 수 계산(빼기)*/
       firebase.database().ref().once('value').then((snapshot) => {
        // tslint:disable-next-line: prefer-const
                  let c = snapshot.child('contentCount').val();  // 전체 게시글 수
                  this.tmp_hash_1 = c;
        // tslint:disable-next-line: align
                  for ( let i = 0; i < this.tmp_hash_1; i++ ) {
        // tslint:disable-next-line: prefer-const
                    let tmpLikeCount1 = snapshot.child(`regisTxt/${i}/title`).val();
                    this.tmp = tmpLikeCount1;
                    if ( this.title === this.tmp) {
        // tslint:disable-next-line: no-var-keyword
                         var likeCount = snapshot.child(`regisTxt/${i}/like`).val(); // 좋아요 수
                         if ( likeCount !== 0) {
                         likeCount = likeCount - 1;
                         this.db.object(`regisTxt/${i}/like`).set(likeCount);
                         }
                       }
                }
            });

    }

    scrapPost() {
      this.favoriteProvider.scrapPost(this.title).then(()=>{
        this.isScrapped = true;
      });
    }
    unscrapPost() {
      this.favoriteProvider.unscrapPost(this.title).then(()=>{
        this.isScrapped = false;
      });
    }

    async chat2Me() {
      const alert2 = await this.atrCtrl.create({
        header: '경고!',
        message: '본인이 작성한 게시글입니다',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            handler: (blah) => {
              console.log('나랑 채팅');
            }
          }
        ]
      });
      await alert2.present();
    }
    async gotoChat(you: string) {
      this.check = false;
      const alert = await this.atrCtrl.create({
          header: '확인!',
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

                var tmp1 = this.af.auth.currentUser.email;
                var tmp2 = you;

                if ( tmp1 === tmp2 ) {
                  this.chat2Me();
                }
                else {
                  this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
                  const db = firebase.firestore();
                  const collection = db.collection('chatting');

                  collection.get().then(snapshot => {
                    snapshot.forEach(doc => {
                      let get1 = doc.data().uid1;
                      let get2 = doc.data().uid2;
                      this.getuid1 = get1;
                      this.getuid2 = get2;
                      if ((tmp1 == this.getuid1 && tmp2 == this.getuid2) || (tmp1 == this.getuid2 && tmp2 == this.getuid1)) {
                        this.check = true;
                      }
                    });
                    if (this.check === false)
                    {
                      this.size = snapshot.size;
                      if (this.size === 0) { // 채팅 목록이 한개도 없음
                        this.index = 0;
                        this.fs.collection('ListSize').doc('index').set({
                          index: this.index
                        });
                        this.fs.collection('chatting').doc((this.index).toString()).set({
                          uid1: this.af.auth.currentUser.email,
                          uid2: you,
                          Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          num: this.index
                        });
                      }
                      else { // 채팅 목록이 1개이상 존재할 때
                        db.collection('ListSize').get().then( snapshot => {
                          snapshot.forEach(doc=>{
                            this.getSize=doc.data().index;
                            this.index=this.getSize;
                            this.index=this.index+1;
                            this.fs.collection('chatting').doc((this.index).toString()).set({
                              uid1:this.af.auth.currentUser.email,
                              uid2:you,
                              Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                              num: this.index
                            });
                            this.fs.collection('ListSize').doc('index').set({
                              index:this.index
                            });
                          });
                        });
                      }
                      console.log("new chatting list");
                    }
                  });
                  this.router.navigate(['chat-view',you]);
                  }
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
        this.db.object(`userInfo/${this.userid}/like`).set(this.item);
      } else {
        this.scrapState = 'unscrap';
        this.starName = 'star-outline';
      }
    }
  ngOnInit() {
  }

}
