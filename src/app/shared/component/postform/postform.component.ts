import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../models/post';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss'],
})
export class PostformComponent implements OnInit {
  postForm!: FormGroup;
  isinEditMode: boolean = false;
  postId!: string;
  editpostObj!: Ipost;
  constructor(
    private _route: ActivatedRoute,
    private _postService: PostsService,
    private _router: Router,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.editmode();
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
    });
  }

  editmode() {
    this.postId = this._route.snapshot.params['postId'];
    if (this.postId) {
      this.isinEditMode = true;
      this._postService.fetchpost(this.postId).subscribe((res) => {
        this.editpostObj = res;
        this.postForm.patchValue(res);
      });
    } else {
      this.isinEditMode = false;
    }
  }

  onAddpost() {
    if (this.postForm.valid) {
      let newPost = this.postForm.value;
      this._postService.createpost(newPost).subscribe((_res) => {
        this._snackbar.opensnackbar(
          `the post ${newPost.title} is added suceesfully`
        );
        this._router.navigate(['posts']);
      });
    }
  }

  onUpdate() {
    let newupdatedpost = { ...this.postForm.value, postId: this.postId };
    this._postService.updatepost(newupdatedpost).subscribe((_res) => {
      this._snackbar.opensnackbar(
        `the post ${newupdatedpost.title} is Updated suceesfully`
      );
      this._router.navigate(['posts']);
    });
  }
}
