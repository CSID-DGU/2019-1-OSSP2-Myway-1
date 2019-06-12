import { Component } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';
import {AlertController } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  contentImg;
  download;
  pictureRef;
  picname;
  imageURI;
  // tslint:disable-next-line: variable-name
  public hash_1: any;
// tslint:disable-next-line: variable-name
  public tmp_hash_1: number;
  tmpimgurl: any;
  showItemKEy = '';
  check = false;         // 수업별 게시글 수 카운트
  checkMajor = false;    // 전공별 게시글 수 카운트
  checkHashtag = false; // 해시태그별 게시글 수 카운트
  contentCount = false; // 전체 게시글 수 카운트
  tagCount=false; // 해시태그 개수 카운트
  new=true; // 새로운 해시태크인지 체크
  public hashCnt: any;
  public tmp_hashCnt:number;
  public Userid: string;
  public tmpCnt: any;
  public tmpH:number;
  // tslint:disable-next-line:no-inferrable-types
  titleInput: string = '' ; profInput: string = ''; sdateInput: string = ''; edateInput: string = '';
   // tslint:disable-next-line:no-inferrable-types
   conInput: string = ''; hashtag: string = ''; classInput: string = ''; majorInput: string = '';
   // tslint:disable-next-line:no-inferrable-types
   gitadd: string = '';
    regisTxt = {
      user: '',
      title: '',
      major: '',
      classN: '',
      prof: '',
      sdate: '',
      edate: '',
      content: '',
      tag: '',
      img: '',
      git: ''
  };
  constructor(
    public stor: Storage,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public st: AngularFireStorage,
    private camera: Camera
    ) {
    this.stor.get('id').then((val) => { // 로그인한 user id 받아옴
      this.Userid = val;
    });
  }
    pickPicture() {
      // tslint:disable-next-line:prefer-const
      let options = {
        quality: 100,
        targetWidth: 500,
        targetHeight: 500,
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };
      this.camera.getPicture(options).then((imageURI) => {
        // tslint:disable-next-line:prefer-const
        let newName = `${new Date().getTime()}.png`;
        this.imageURI = imageURI;
        this.picname = newName;
        // this.st.ref(`${newName}`).put(imageURI)
        // .then((savedPicture) => {

        // });
        this.st.ref(`picture/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'});
      }, (err) => {
        console.log('err:' + JSON.stringify(err));
      });
    }
    isReadonly() {
      return true;
    }
    register() {
      if (this.titleInput === '' || this.majorInput === '' || this.classInput === '' || this.profInput === '' ||
         this.sdateInput === '' || this.edateInput === '' || this.conInput === '' || this.hashtag === '' ) {
          this.alertCtrl.create({
            header: '',
            message: '내용을 전부 입력해주세요',
            buttons: [{
              text: '확인',
              role: 'cancel'
            }]
          }).then(alertEI => {
            alertEI.present();
          });
      } else {
        this.sdateInput = this.sdateInput.substring(0, 10);
        this.edateInput = this.edateInput.substring(0, 10);
        this.regisTxt.user = this.Userid;
        this.regisTxt.title = this.titleInput;
        this.regisTxt.major = this.majorInput;
        this.regisTxt.classN = this.classInput;
        this.regisTxt.prof = this.profInput;
        this.regisTxt.sdate = this.sdateInput;
        this.regisTxt.edate = this.edateInput;
        this.regisTxt.content = this.conInput;
        this.regisTxt.tag = this.hashtag;
        this.regisTxt.img = this.picname;
        this.regisTxt.git = this.gitadd;
        alert('글이 등록되었습니다.');

        /* 전체 게시글 카운트 */
        this.db.object(`contentCount/`).valueChanges().subscribe(val => {
          while ( this.contentCount === false) {
          this.hash_1 = val;
          this.tmp_hash_1 = this.hash_1;
          console.log(val, this.tmp_hash_1, this.hash_1);
          // 전체 게시글 저장
          this.db.object(`regisTxt/${this.tmp_hash_1}`).set(this.regisTxt);
          this.showImage();
          this.tmp_hash_1 += 1;
          console.log('전체 게시글?' + this.classInput, this.tmp_hash_1);
          // 전체 게시글 수 저장
          this.db.object(`contentCount/`).set(this.tmp_hash_1);
          this.contentCount = true;
            }
          return 0;
     });
        this.contentCount = false;

       // this.db.list('regisTxt').push(this.regisTxt);

        /* 수업별 게시글 카운트*/
        this.db.object(`classList/${this.classInput}/`).valueChanges().subscribe(val => {
          while ( this.check === false) {
        this.hash_1 = val;
        this.tmp_hash_1 = this.hash_1;
        console.log(val, this.tmp_hash_1, this.hash_1);
        this.tmp_hash_1 += 1;
        console.log(this.classInput, this.tmp_hash_1);
        this.db.object(`classList/${this.classInput}/`).set(this.tmp_hash_1);
        this.check = true;
          }
          return 0;
   });
        this.check = false;

        /*전공별 게시글 카운트*/
        this.db.object(`majorList/${this.majorInput}/`).valueChanges().subscribe(val => {
          while ( this.checkMajor === false) {
        this.hash_1 = val;
        this.tmp_hash_1 = this.hash_1;
        console.log(val, this.tmp_hash_1, this.hash_1);
        this.tmp_hash_1 += 1;
        console.log(this.classInput, this.tmp_hash_1);
        this.db.object(`majorList/${this.majorInput}/`).set(this.tmp_hash_1);
        this.checkMajor = true;
          }
          return 0;
   });
        this.checkMajor = false;

         /*해시태그별 게시글 카운트*/
        //this.db.object(`hashtagList/${this.hashtag}/`).valueChanges().subscribe(val => {
        //while ( this.checkHashtag === false) {
        //this.hash_1 = val;
        //this.tmp_hash_1 = this.hash_1;
        //console.log(val, this.tmp_hash_1, this.hash_1);
        //this.tmp_hash_1 += 1;
        //console.log(this.classInput, this.tmp_hash_1);
        //this.db.object(`hashtagList/${this.hashtag}/`).set(this.tmp_hash_1);
        //this.checkHashtag = true;
        //  }
        //return 0;
        //});
       // this.checkHashtag = false;
       var i=0;
       var realI;
       this.new=true;
       this.db.object(`hashTagCnt/`).valueChanges().subscribe(val=>{
         while(this.tagCount===false){
           this.hashCnt=val;
           this.tmp_hashCnt=this.hashCnt;
           while(i!==val){
             console.log(i);
             this.db.object(`hashtagList/${i}/`).valueChanges().subscribe(val=>{
               console.log(val);
               if(this.hashtag===val){
                 this.new=false;
                 realI=i;               
               }
             });
             i++;
           }
           if(this.new===true){
             console.log("new");
             this.tmp_hashCnt+=1;
             this.db.object(`hashTagCnt/`).set(this.tmp_hashCnt);
             this.db.object(`hashtagList/${this.tmp_hashCnt}/${this.hashtag}/`).set(1);
             this.tagCount=true;
           }
           else{
             console.log("old");
             this.db.object(`hashtagList/${realI}/${this.hashtag}/`).valueChanges().subscribe(val=>{
               this.tmpCnt=val;
               this.tmpH=this.tmpCnt;
               this.tmpH=this.tmpH+1;
               this.db.object(`hashtagList/${realI}/${this.hashtag}/`).set(this.tmpH);
             });
             this.tagCount=true;
           }
         }
       });
       this.tagCount=false;

      } // else
    }
    /* 방금 저장한 이미지 url 불러오나 확인*/
    /*picname에 값이 들어가야 되기 때문에 위처럼 확인함*/
      showImage() {
// tslint:disable-next-line: prefer-const
      let storageRef = firebase.storage().ref();
// tslint:disable-next-line: prefer-const
      let imageRef = storageRef.child(`picture/${this.picname}`);
      console.log(imageRef.getDownloadURL());
      this.contentCount = false;
      imageRef.getDownloadURL()
      .then((imageURI) => {
        console.log(imageURI);
        this.tmpimgurl = imageURI;
        console.log('tmpImgurl은' + this.tmpimgurl);

        this.db.object(`contentCount/`).valueChanges().subscribe(val => {
          while ( this.contentCount === false) {
          console.log('들어옴');
          this.hash_1 = val;  // 전체 게시글 수 저장
          this.tmp_hash_1 = this.hash_1;
          this.tmp_hash_1 = this.tmp_hash_1 - 1;
          this.db.object(`regisTxt/${this.tmp_hash_1}/img`).set(this.tmpimgurl);
          // 게시글 저장
         // this.db.object(`contentCount/`).set(this.tmp_hash_1);
          this.contentCount = true;
            }
          return 0;
     });
        this.contentCount = false;
       // this.regisTxt.img = imageURI;
        // console.log(this.regisTxt.img);
      });
    }
}
