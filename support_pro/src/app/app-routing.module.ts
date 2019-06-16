import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/tab1/:userid', loadChildren: './tab1/tab1.module#Tab1PageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'post-list/:tag/:userid', loadChildren: './post-list/post-list.module#PostListPageModule' },
  { path: 'chat-view/:you', loadChildren: './chat-view/chat-view.module#ChatViewPageModule' },
  { path: 'post/:title/:userid', loadChildren: './post/post.module#PostPageModule' },
  { path: 'my-text', loadChildren: './my-text/my-text.module#MyTextPageModule' },
  { path: 'my-like', loadChildren: './my-like/my-like.module#MyLikePageModule' },
  { path: 'my-scrap', loadChildren: './my-scrap/my-scrap.module#MyScrapPageModule' },
  { path: 'search-view', loadChildren: './search-view/search-view.module#SearchViewPageModule' },
  { path: 'search-list/:title', loadChildren: './search-list/search-list.module#SearchListPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}