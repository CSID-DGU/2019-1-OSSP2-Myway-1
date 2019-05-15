import { Component } from '@angular/core';
import { NavController , AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public userid: string;
  data: Observable<any>;
  items:any;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db:AngularFireDatabase
    ) {
      this.getData();
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      this.plat.ready().then(() => {
        this.stor.get('id').then((val) => {
          this.userid = val;
        });
      });

    }
  getData(){
    this.db.list('regisTxt/').valueChanges().subscribe(
      data => {
        console.log(data)
        this.items = data
      }
    )
  }
  loadList(){
    this.navCtrl.navigateForward('/post-list');
  }

}
