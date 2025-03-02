import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostdashComponent } from './shared/component/postdash/postdash.component';
import { PostformComponent } from './shared/component/postform/postform.component';
import { PostComponent } from './shared/component/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostdashComponent,
  },
  {
    path: 'posts/addpost',
    component: PostformComponent,
  },
  {
    path: 'posts/:postId',
    component: PostComponent,
  },
  {
    path: 'posts/:postId/edit',
    component: PostformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
