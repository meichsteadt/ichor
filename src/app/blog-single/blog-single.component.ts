import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BlogPost } from '../blog.model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {
  blogId: string;
  blogPost: FirebaseObjectObservable<any>;
  postCategories: FirebaseListObservable<any[]>;
  blogContent: string;
  style: string = "<style>markdown h1, markdown h2, markdown h3 { text-align: center}</style>"
  constructor(private route: ActivatedRoute, private location: Location, private angularFire: AngularFire) {

   }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.blogId = urlParameters['id'];
    });
    this.blogPost = this.angularFire.database.object('/blog/posts/' + this.blogId);
    this.postCategories = this.angularFire.database.list('/blog/posts/' + this.blogId + '/categories');
    this.angularFire.database.object('/blog/posts/' + this.blogId).subscribe(post => this.blogContent = post.content + this.style)
  }

}
