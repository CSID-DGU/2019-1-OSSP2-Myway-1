import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
public title:string;
item:any;
  constructor( 
    public plat: Platform,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
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
  

  ngOnInit() {
  }

}
