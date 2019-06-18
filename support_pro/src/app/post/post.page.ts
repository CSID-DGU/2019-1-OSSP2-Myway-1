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
  public tmpC2:string;
// tslint:disable-next-line:no-inferrable-types
public likeState: string = 'unliked';
public iconName: string = 'heart-empty';
public scrapState: string = 'unscrap';
public starName: string = 'star-outline';

isFavorite = false;
isScrapped = false;
contentnum: number;
out: boolean;
tempcontentNum: number;
    constructor(
      public plat: Platform,
      public activatedRoute: ActivatedRoute,
      public navCtrl: NavController,
      public db: AngularFireDatabase,
      public atrCtrl: AlertController,
      public fs: AngularFirestore,
      public af: AngularFireAuth,
      public router: Router,
      public favoriteProvider: FavoriteService
      ) {
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      var strArray = this.userid.split('@');
      this.userid = strArray[0];
      this.title = this.activatedRoute.snapshot.paramMap.get('title');
      this.load();

      this.favoriteProvider.isFavorite(this.title).then(isFav => {
        this.isFavorite = isFav;
      });

      this.favoriteProvider.isScrapped(this.title).then(isScrap => {
        this.isScrapped = isScrap;
      });

      }
    load() {
      this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
        data => {
        this.item = data;
        console.log(this.item[0]);
        let text = this.item[0].con1;
        console.log(text);
        let text2=this.item[0].con3;
        console.log(text2);
        this.tmpC = text.replace(/(<br>|<br\/>|<br\/>)/g, '\n');
        this.tmpC2 = text2.replace(/(<br>|<br\/>|<br\/>)/g, '\n');
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
        // tslint:disable-next-line: prefer-const
            let k = snapshot.child(`userInfo/${this.userid}/liketotal`).val(); // 각 유저의 전체 좋아요 수
            if (k === null) { k = 0; }
            this.contentnum = k;
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
                  this.db.object(`userInfo/${this.userid}/like/${this.contentnum}`).set(i);   // 좋아요 누른 게시글 인덱스 저장
                  this.db.object(`userInfo/${this.userid}/liketotal`).set(this.contentnum + 1);

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
          // tslint:disable-next-line: prefer-const
            let k = snapshot.child(`userInfo/${this.userid}/liketotal`).val(); // 각 유저의 전체 좋아요 수
            this.contentnum = k;
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
                  this.out = true;
                  for (let j = 0; j < this.contentnum; j++) { // 유저 내 좋아요 삭제
                  // tslint:disable-next-line: prefer-const
                      let check = snapshot.child(`userInfo/${this.userid}/like/${j}`).val();
                      this.tempcontentNum = check;
                      if ( this.tempcontentNum === i) {
                          this.db.object(`userInfo/${this.userid}/like/${j}`).set(null); // 좋아요 취소한 게시글 인덱스 삭제
                          this.db.object(`userInfo/${this.userid}/liketotal`).set(k - 1);
                          break;
                           }
                      }
                  }
              if (this.out === true) {
                  break;
                }
              }
            this.out = false;
        });

    }

    scrapPost() {
      this.favoriteProvider.scrapPost(this.title).then(()=>{
        this.isScrapped = true;
      });
        /*각 게시글 별 스크랩 수 계산 (더하기)*/
        firebase.database().ref().once('value').then((snapshot) => {
          // tslint:disable-next-line: prefer-const
              let c = snapshot.child('contentCount').val();  //전체 게시글 수
              this.tmp_hash_1 = c;
          // tslint:disable-next-line: prefer-const
              let k = snapshot.child(`userInfo/${this.userid}/scraptotal`).val(); // 각 유저의 전체 스크랩 수
              if (k === null) { k = 0; }
              this.contentnum = k;
          // tslint:disable-next-line: align
              for ( let i = 0; i < this.tmp_hash_1; i++ ) {
          // tslint:disable-next-line: prefer-const
                let tmpLikeCount1 = snapshot.child(`regisTxt/${i}/title`).val();
                this.tmp = tmpLikeCount1;
                if ( this.title === this.tmp ) {
                    this.db.object(`userInfo/${this.userid}/scrap/${this.contentnum}`).set(i);   // 스크랩 누른 게시글 인덱스 저장
                    this.db.object(`userInfo/${this.userid}/scraptotal`).set(this.contentnum + 1);
                   }
                }
          });
    }
    unscrapPost() {
      this.favoriteProvider.unscrapPost(this.title).then(()=>{
        this.isScrapped = false;
      });
        /*각 게시글 별 스크랩 수 계산(빼기)*/
        firebase.database().ref().once('value').then((snapshot) => {
          // tslint:disable-next-line: prefer-const
              let c = snapshot.child('contentCount').val();  // 전체 게시글 수
              this.tmp_hash_1 = c;
            // tslint:disable-next-line: prefer-const
              let k = snapshot.child(`userInfo/${this.userid}/scraptotal`).val(); // 각 유저의 전체 스크랩 수
              if (k === null) { k = 0; }
              this.contentnum = k;
          // tslint:disable-next-line: align
              for ( let i = 0; i < this.tmp_hash_1; i++ ) {
          // tslint:disable-next-line: prefer-const
                let tmpLikeCount1 = snapshot.child(`regisTxt/${i}/title`).val();
                this.tmp = tmpLikeCount1;
                if ( this.title === this.tmp) { // 타이틀이 같다면
                    for (let j = 0; j < this.contentnum; j++) { // 유저 내 좋아요 삭제
                    // tslint:disable-next-line: prefer-const
                        let check = snapshot.child(`userInfo/${this.userid}/scrap/${j}`).val();
                        this.tempcontentNum = check;
                        if ( this.tempcontentNum === i) {
                            this.db.object(`userInfo/${this.userid}/scrap/${j}`).set(null); // 좋아요 취소한 게시글 인덱스 삭제
                            if (k !== 0) {
                            this.db.object(`userInfo/${this.userid}/scraptotal`).set(k - 1);
                            }
                            break;
                             }
                        }
                    }
                }
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
                } else {
                  this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
                  const db = firebase.firestore();
                  const collection = db.collection('chatting');

                  collection.get().then(snapshot => {
                    snapshot.forEach(doc => {
                      let get1 = doc.data().uid1;
                      let get2 = doc.data().uid2;
                      this.getuid1 = get1;
                      this.getuid2 = get2;
                      if ((tmp1 === this.getuid1 && tmp2 === this.getuid2) || (tmp1 === this.getuid2 && tmp2 === this.getuid1)) {
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
                      } else { // 채팅 목록이 1개이상 존재할 때
                        db.collection('ListSize').get().then( snapshot => {
                          snapshot.forEach(doc => {
                            this.getSize = doc.data().index;
                            this.index = this.getSize;
                            this.index = this.index + 1;
                            this.fs.collection('chatting').doc((this.index).toString()).set({
                              uid1: this.af.auth.currentUser.email,
                              uid2: you,
                              Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                              num: this.index
                            });
                            this.fs.collection('ListSize').doc('index').set({
                              index: this.index
                            });
                          });
                        });
                      }
                      console.log('new chatting list');
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
      } else {
        this.scrapState = 'unscrap';
        this.starName = 'star-outline';
      }
    }
  ngOnInit() {
  }

}
