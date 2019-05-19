import { Component, OnInit } from '@angular/core';
import{Storage} from '@ionic/storage';
import { storage } from 'firebase';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
public hashtag:string;
items:any;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db:AngularFireDatabase
  ) { 
    this.hashtag = this.activatedRoute.snapshot.paramMap.get('userid');
      this.plat.ready().then(() => {
        this.stor.get('hashtag').then((val) => {
          this.hashtag = val;
        });
      });
  }

  getData(){
    this.db.list('regisTxt').valueChanges().subscribe(
      data => {
        console.log(data)
        this.items=data
        
        // if(this.items.tag==this.hashtag){
          
        // }
      }
    )
  }
  ngOnInit() {
  }

}
