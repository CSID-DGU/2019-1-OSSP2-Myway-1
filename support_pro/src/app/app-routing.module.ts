import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/tab1/:userid', loadChildren: './tab1/tab1.module#Tab1PageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'post-list/:tag', loadChildren: './post-list/post-list.module#PostListPageModule' },
  { path: 'chat-view/:you', loadChildren: './chat-view/chat-view.module#ChatViewPageModule' },
  { path: 'post/:title', loadChildren: './post/post.module#PostPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
