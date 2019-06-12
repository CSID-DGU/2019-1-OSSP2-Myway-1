
import { Component } from '@angular/core';
import { NavController , AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchQuery: string;
  public userid: string;
  data: Observable<any>;
  items: any;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router: Router
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
    this.db.list('regisTxt/').valueChanges().subscribe(
      data => {
        this.items = data;
      }
    );
  }
  // tag누르면 다음페이지로 이동
  loadList(item: any) {
    // this.stor.set('hashtag',items.tag);
    // this.navCtrl.navigateForward('/post-list');
    this.router.navigate(['post-list', item.tag, this.userid]);
  }

}

