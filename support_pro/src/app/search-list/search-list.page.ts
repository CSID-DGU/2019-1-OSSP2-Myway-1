import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {Storage} from '@ionic/storage';

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.page.html',
  styleUrls: ['./search-list.page.scss'],
})
export class SearchListPage implements OnInit {
search:string;
items=[];
  constructor(  public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router: Router
  ) {
    this.search=this.activatedRoute.snapshot.paramMap.get('title');
    this.db.list('regisTxt/', ref => ref.orderByChild('classN').equalTo(this.search)).valueChanges().subscribe(
      data => {
        
        
        
 this.items=data;
      });



  }

  getPost(item){
    this.router.navigate(['post', item.title]);
  }

  ngOnInit() {
  }

}
