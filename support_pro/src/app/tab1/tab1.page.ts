
import { Component } from '@angular/core';
import { NavController , AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchQuery: string;
  public userid: string;
  data: Observable<any>;
  items = [];
  posttags = [];
  postnum = {};
  imgurls = {};
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router: Router,
    public atrCtrl:AlertController
    ) {
      this.getData();
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      this.plat.ready().then(() => {
        this.stor.get('id').then((val) => {
          this.userid = val;
        });
      });
    }
    // tag별로 보여주는거
  getData() {
    firebase.database().ref().once('value').then((snapshot) => {
     const c = snapshot.child('hashCount').val();
     for (let j = 0; j < c; j++) {
     const temp = snapshot.child('hashtagList/' + j + '/').val();
     this.posttags[j] = (JSON.stringify(temp).split('"'))[1];
     this.postnum[this.posttags[j]] = ((JSON.stringify(temp).split(':'))[1]).split('}')[0];
     let i = 0;
     while (i < 10) {
     this.db.list('regisTxt/', ref => ref.orderByChild('tag/' + i).equalTo(this.posttags[j])).valueChanges().subscribe(
      data => {
        this.items = data;
        this.imgurls[this.posttags[j]] = this.items[0].img;
        console.log(this.imgurls[this.posttags[j]]);
      });
     i++;
     if (this.imgurls[this.posttags[j]]) {
       break;
     }
    }
  }
    });
  }
  async havetoLgin(){
    const alert = await this.atrCtrl.create({
      header: '경고!!',
      message: '로그인 후 사용가능합니다.',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {
            console.log('move');
            this.router.navigateByUrl('tabs/tab5');
          }
        }
      ]
    });
    await alert.present();
  }
  // tag누르면 다음페이지로 이동
  loadList(item: any) {
    // this.stor.set('hashtag',items.tag);
    // this.navCtrl.navigateForward('/post-list');
    if(this.userid===null){
      this.havetoLgin();
    }
    else
      this.router.navigate(['post-list', item, this.userid]);
  }

}

