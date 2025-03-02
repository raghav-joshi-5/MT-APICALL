import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  BASE_URL: string = `${environment.BASE_URL}`;
  POST_URL: string = `${this.BASE_URL}/posts.json`;

  constructor(private _http: HttpClient) {}

  fetchallposts(): Observable<Ipost[]> {
    return this._http.get<Ipost[]>(this.POST_URL).pipe(
      map((obj) => {
        let postArr = [];
        for (const key in obj) {
          postArr.push({ ...obj[key], postId: key });
        }
        return postArr;
      })
    );
  }

  fetchpost(postId: string): Observable<Ipost> {
    let SINGLE_POST_URL: string = `${this.BASE_URL}/posts/${postId}.json`;
    return this._http.get<Ipost>(SINGLE_POST_URL);
  }

  createpost(postObj: Ipost): Observable<{ name: string }> {
    return this._http.post<{ name: string }>(this.POST_URL, postObj);
  }

  updatepost(postObj: Ipost): Observable<Ipost> {
    let UPDATE_URL: string = `${this.BASE_URL}/posts/${postObj.postId}.json`;
    return this._http.patch<Ipost>(UPDATE_URL, postObj);
  }

  removepost(postObj: Ipost): Observable<null> {
    let REMOVE_URL: string = `${this.BASE_URL}/posts/${postObj.postId}.json`;
    return this._http.delete<null>(REMOVE_URL);
  }
}
