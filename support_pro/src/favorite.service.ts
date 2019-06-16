import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { post } from 'selenium-webdriver/http';

const STORAGE_KEY = 'favoritePosts'; 

const STORAGE_KEY2 = 'scrapPosts';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
userid="una";
  constructor(
    public storage:Storage,
    public db: AngularFireDatabase,
    ) {   }

  isFavorite(postId){
    return this.getAllFavoritePost().then(result=>{
      return result && result.indexOf(postId)!==-1;
    });
  }

  favoritePost(postId){
    return this.getAllFavoritePost().then(result=>{
      if (result){
        result.push(postId);
        return this.storage.set(STORAGE_KEY,result);

      }else {

        this.db.list('userInfo/${this.userid}/like').push(postId);
        return this.storage.set(STORAGE_KEY,[postId]);
      }
    });




  }
unfavoritePost(postId){
  return this.getAllFavoritePost().then(result=>{
    if(result){
      var index=result.indexOf(postId);
      result.splice(index,1);
      return this.storage.set(STORAGE_KEY,result);
    }
  });
}


  getAllFavoritePost(){
    return this.storage.get(STORAGE_KEY);
  }






  isScrapped(postId){
    return this.getAllScrapPost().then(result=>{
      return result && result.indexOf(postId)!==-1;
    });
  }

  scrapPost(postId){
    return this.getAllScrapPost().then(result=>{
      if (result){
        result.push(postId);
        return this.storage.set(STORAGE_KEY2,result);

      }else {
        return this.storage.set(STORAGE_KEY2,[postId]);
      }
    });
  }
unscrapPost(postId){
  return this.getAllScrapPost().then(result=>{
    if(result){
      var index=result.indexOf(postId);
      result.splice(index,1);
      return this.storage.set(STORAGE_KEY2,result);
    }
  });
}


  getAllScrapPost(){
    return this.storage.get(STORAGE_KEY2);
  }


}
