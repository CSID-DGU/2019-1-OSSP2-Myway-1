import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { storage } from 'firebase';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { defineBase, query } from '@angular/core/src/render3';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  public userid: string;
public hashtag: string;
public query: string;
temp = [];
items = [];
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router: Router
  ) {
    this.hashtag = this.activatedRoute.snapshot.paramMap.get('tag');
    this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
    // this.loadList();
  }
ionViewWillEnter() {
  this.loadList();
}
loadList() {
  let i = -1;
  let index = 0;
  while (i < 10) {
    i++;
    this.db.list('regisTxt/', ref => ref.orderByChild('tag/' + i).equalTo(this.hashtag)).valueChanges().subscribe(
     data => {
       this.temp = data;
       // tslint:disable-next-line:prefer-for-of
       for ( let j = 0 ; j < this.temp.length ; j++) {
        console.log(this.temp[j]);
        this.items[index++] = this.temp[j];
      }
       console.log(this.items);
     });
   }
}

getPost(item: any) {
  window.location.href = 'post/' + item.title + '/' + this.userid;
}
  ngOnInit() {
  }

}
