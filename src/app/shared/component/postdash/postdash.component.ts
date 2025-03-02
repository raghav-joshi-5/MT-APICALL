import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../models/post';

@Component({
  selector: 'app-postdash',
  templateUrl: './postdash.component.html',
  styleUrls: ['./postdash.component.scss'],
})
export class PostdashComponent implements OnInit {
  postArr: Array<Ipost> = [];
  constructor(private _postService: PostsService) {}

  ngOnInit(): void {
    this._postService.fetchallposts().subscribe((res) => {
      this.postArr = res;
      console.log(this.postArr);
    });
  }
}
