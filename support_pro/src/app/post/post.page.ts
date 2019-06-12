
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
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
  public userid: string;
public title:string;
item:any;

public likeState: string = 'unliked';
public iconName: string = 'heart-empty';

public scrapState: string = 'unscrap';
public starName: string = 'star-outline';




  constructor( 
    public plat: Platform,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router:Router) 
    { 
      // this.item = this.activatedRoute.snapshot.paramMap.get('title');
      // console.log(this.item);
      this.userid=this.activatedRoute.snapshot.paramMap.get('userid');
    this.title= this.activatedRoute.snapshot.paramMap.get('title');
    this.load();

}

    load(){
      this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
        data => {
        this.item = data;
        });  
    }
  
    consolePrint(){
     
    }
    toggleLikeState(){

      if(this.likeState == 'unliked'){
        this.likeState = 'liked';
        this.iconName = 'heart';
      } else {
        this.likeState = 'unliked';
        this.iconName = 'heart-empty';
      }
  
    }

    toggleScrapState(){

      if(this.scrapState == 'unscrap'){
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

