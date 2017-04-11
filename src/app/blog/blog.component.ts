import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  posts: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private router: Router) {
    this.posts = angularFire.database.list('blog/posts');
    this.categories = angularFire.database.list('blog/categories')
  }

  goToPost(post) {
    this.router.navigate(['blog', post.$key])
  }

}
