import { Component } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';
import {AlertController } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  contentImg;
  download;
  pictureRef;
<<<<<<< HEAD
  // tslint:disable-next-line:max-line-length
  picname: string = 'https://firebasestorage.googleapis.com/v0/b/supportingbot.appspot.com/o/userimg%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png?alt=media&token=f9e09289-ae6f-4368-858c-74c46ae5242b';
=======
  picname:string='';
>>>>>>> ce90b117ee300682fe556223224d13710b21c2be
  imageURI;
  hcount = 0; // 해시태그 여러개 입력한 경우를 위한 카운트
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
  public hashCnt: any;
  // tslint:disable-next-line:variable-name
  public tmp_hashCnt: number;
  public Userid: string;
  public tmpCnt: any;
  public tmpH: number;
  public tmp: number;
  like: number;
  // tslint:disable-next-line:no-inferrable-types
  titleInput: string = '' ; profInput: string = ''; sdateInput: string = ''; edateInput: string = '';
   // tslint:disable-next-line:no-inferrable-types
   conInput: string = ''; hashtag = []; classInput: string = ''; majorInput: string = '';
   con1:string=''; con2:string=''; con3:string=''; con4:string='';
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
      con1: '',
      con2:'',
      con3:'',
      con4:'',
      tag: [],
      img: '',
      git: '',
      like: 0
  };
  constructor(
    public stor: Storage,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public st: AngularFireStorage,
    public router: Router,
    private camera: Camera
    ) {
    this.stor.get('id').then((val) => { // 로그인한 user id 받아옴
      this.Userid = val;
    });
  }
  ionViewWillEnter() {
    this.stor.get('id').then((val) => {
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
        console.log(imageURI);
        // 이미지 미리보기
        document.getElementById('imgboard').setAttribute('src', 'data:image/jpeg;base64,' + imageURI);
        this.imageURI = imageURI;
        this.picname = newName;
        console.log(this.picname);
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
      if (!this.Userid) {
        this.alertCtrl.create({
          header: '',
          message: '로그인 후 이용해주세요',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEI => {
          alertEI.present();
        });
        return 0;
      }
      if (this.hashtag.length > 10) {
        this.alertCtrl.create({
          header: '',
          message: '해시태그는 열개까지 가능합니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEI => {
          alertEI.present();
        });
        return 0;
      }
      if (this.titleInput === '' || this.majorInput === '' || this.classInput === '' || this.profInput === '' ||
<<<<<<< HEAD
         this.sdateInput === '' || this.edateInput === '' || this.conInput === '' || this.hashtag === [] ) {
=======
         this.sdateInput === '' || this.edateInput === '' || this.con1 === '' ||this.con2 === '' ||this.con3 === '' ||this.con4 === '' || this.hashtag === []) {
>>>>>>> ce90b117ee300682fe556223224d13710b21c2be
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
          return 0;
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
        //this.regisTxt.content = this.conInput.replace('\n', '<br>');
        this.regisTxt.con1=this.con1.replace('\n','<br>');
        this.regisTxt.con2=this.con2;
        this.regisTxt.con3=this.con3.replace('\n','<br>');
        this.regisTxt.con4=this.con4;
        this.regisTxt.tag = this.hashtag;
        this.regisTxt.img = this.picname;
        this.regisTxt.git = this.gitadd;
        this.regisTxt.like = 0;
        alert('글이 등록되었습니다.');

        /* 전체 게시글 카운트 */
        this.db.object(`contentCount/`).valueChanges().subscribe(val => {
          while ( this.contentCount === false) {
          this.hash_1 = val;
          this.tmp_hash_1 = this.hash_1;
          console.log(val, this.tmp_hash_1, this.hash_1);
          // 전체 게시글 저장
          this.db.object(`regisTxt/${this.tmp_hash_1}`).set(this.regisTxt);
<<<<<<< HEAD
          // tslint:disable-next-line:max-line-length
          if (this.regisTxt.img !== 'https://firebasestorage.googleapis.com/v0/b/supportingbot.appspot.com/o/userimg%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png?alt=media&token=f9e09289-ae6f-4368-858c-74c46ae5242b') {
          this.showImage();
          }
=======
          if(this.regisTxt.img!='')
            this.showImage();
>>>>>>> ce90b117ee300682fe556223224d13710b21c2be
          this.tmp_hash_1 += 1;
          console.log('전체 게시글?' + this.classInput, this.tmp_hash_1);
          // 전체 게시글 수 저장
          this.db.object(`contentCount/`).set(this.tmp_hash_1);
          this.contentCount = true;
            }
          return 0;
     });
        this.contentCount = false;

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

        /*해시태그별 카운트*/
        firebase.database().ref().once('value').then((snapshot) => {
          // tslint:disable-next-line: prefer-const
          let c = snapshot.child('hashCount').val();  // 전체 해시태그 수
          console.log('해시태그 길이' + this.hashtag.length);
          while (this.hcount < this.hashtag.length) {
                    console.log('전체 해시태그 수는', c);
                    this.tmp_hash_1 = c;
                    this.checkHashtag = false;
          // tslint:disable-next-line: align
                    for ( let i = 0; i < this.tmp_hash_1; i++ ) {
                      console.log('지금 i는!!', i);
          // tslint:disable-next-line: prefer-const
                      let tmpLikeCount1 = snapshot.child(`hashtagList/${i}/${this.hashtag[this.hcount]}`).val();
                      console.log('그냥 읽어온 hashtag수', tmpLikeCount1);
                      // 이미 있던 해시태그라면?
                      if ( tmpLikeCount1 !== null) {
                        this.tmp = tmpLikeCount1; // 해시태그 수
                        this.tmp = this.tmp + 1;
                        this.db.object(`hashtagList/${i}/${this.hashtag[this.hcount]}`).set(this.tmp);
                        this.checkHashtag = true;
                        this.hcount = this.hcount + 1; // 글당 해시태그 수
                      }
                  }
                    if ( this.checkHashtag === false) {
                    this.tmp = c;
                    this.db.object(`hashtagList/${this.tmp}/${this.hashtag[this.hcount]}`).set(1); // 해시태그 저장
                    this.tmp = this.tmp + 1; // 전체 해시태그 수 올려주고
                    this.db.object('hashCount').set(this.tmp); // 전체 해시태그 수 저장
                    this.hcount = this.hcount + 1; // 글당 해시태그 수
                    c = c + 1;
                  }
                }
          this.hcount = 0;
              });
        //this.router.navigate(['post', this.titleInput, this.Userid]);
        this.router.navigateByUrl('/tabs/tab1');
      } // else
    }
    /* 방금 저장한 이미지 url 불러오나 확인*/
    /*picname에 값이 들어가야 되기 때문에 위처럼 확인함*/
      showImage() {
// tslint:disable-next-line: prefer-const
      let storageRef = firebase.storage().ref();
// tslint:disable-next-line: prefer-const
      let imageRef = storageRef.child(`picture/${this.picname}`);
      // console.log(imageRef.getDownloadURL());
      this.contentCount = false;
      imageRef.getDownloadURL()
      .then((imageURI) => {
        // console.log(imageURI);
        this.tmpimgurl = imageURI;
        // console.log('tmpImgurl은' + this.tmpimgurl);

        this.db.object(`contentCount/`).valueChanges().subscribe(val => {
          while ( this.contentCount === false) {
          // console.log('들어옴');
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
