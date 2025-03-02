import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postId!: string;
  postObj!: Ipost;
  constructor(
    private _postServce: PostsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.postId = this._route.snapshot.params['postId'];
    if (this.postId) {
      this._postServce.fetchpost(this.postId).subscribe((res) => {
        this.postObj = { ...res, postId: this.postId };
      });
    }
  }

  onRemove() {
    let getconfirm = confirm(`are you sure you want to remove this post`);
    if (getconfirm) {
      this._postServce.removepost(this.postObj).subscribe((_res) => {
        this._snackbar.opensnackbar(
          `the post ${this.postObj.title} is removed suceesfully`
        );
        this._router.navigate(['posts']);
      });
    }
  }
}
