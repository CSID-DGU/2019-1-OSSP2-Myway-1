import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  titleInput ; profInput; sdateInput; edateInput; conInput;
  classInput; majorInput;
  data={
    title:'',
    major:'',
    classN:'',
    prof:'',
    sdate:'',
    edate:'',
    content:''
  }
  constructor(public db:AngularFireDatabase){}
    register(){
      this.data.title=this.titleInput;
      this.data.major=this.majorInput;
      this.data.classN=this.classInput;
      this.data.prof=this.profInput;
      this.data.sdate=this.sdateInput;
      this.data.edate=this.edateInput;
      this.data.content=this.conInput;
      alert(this.titleInput);
      this.db.list('data').push(this.data);
    }
}
