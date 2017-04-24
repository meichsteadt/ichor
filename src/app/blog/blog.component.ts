import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;
  currentCategory: string = "all";

  constructor(private angularFire: AngularFire, private router: Router) {
    this.posts = angularFire.database.list('blog/posts');
    this.categories = angularFire.database.list('blog/categories')
  }

  goToPost(post) {
    this.router.navigate(['blog', post.$key])
  }

  ngOnInit() {
  }

  setCategory(category) {
    this.currentCategory = category;
  }

}
