import { Component, OnInit, Input, Inject } from '@angular/core';
import { BlogPost } from '../blog.model';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogPosts: FirebaseListObservable<any[]>;
  images: FirebaseListObservable<any[]>;
  blankPost: BlogPost = new BlogPost('','','',['']);
  currentPost: BlogPost = this.blankPost;
  currentAction: string = 'new';
  currentImage;
  currentFile;
  firebaseRef;

  constructor(private angularFire: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.blogPosts = angularFire.database.list('blog/posts');
    this.images = angularFire.database.list('images/blog');
    this.firebaseRef = firebaseApp.storage().ref();
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.currentFile = files[0];
  }

  setPost(post) {
    this.currentPost = post;
    this.currentImage = post.image;
  }

  setAction(action){
    this.currentAction = action;
  }

  setImage(image) {
    this.currentImage = image.url;
  }

  resetPost() {
    this.blankPost = new BlogPost('','','',['']);
    this.currentPost = this.blankPost;
  }


  ngOnInit() {

  }

  getPostByID(id: string) {
    return this.angularFire.database.object('/blog/posts/' + id)
  }

  newPost(post) {
    this.blogPosts.push(post);
    this.currentAction = 'new';
    this.resetPost();
  }

  updatePost(postToUpdate) {
    var postInFirebase = this.getPostByID(postToUpdate.$key);
      postInFirebase.update({
      title: postToUpdate.title,
      content: postToUpdate.content,
      image: postToUpdate.image,
      description: postToUpdate.description
    })
  }

  deletePost(postToDelete) {
    var postInFirebase = this.getPostByID(postToDelete.$key);
    if(confirm("Are you sure you want to delete this post?")) {
      postInFirebase.remove();
      this.resetPost();
    }
  }

  activePost(post) {
    if(post === this.currentPost) {
      return true;
    }
    else {
      return false;
    }
  }

  activeImage(image) {
    if(image.url === this.currentImage) {
      return true;
    }
    else {
      return false;
    }
  }

  uploadFile() {
    let url;
    if(this.currentFile) {
      let name = this.currentFile.name;
      this.firebaseRef.child('images/blog' + name).put(this.currentFile)
      .then(a => this.firebaseRef.child('images/blog' + name).getDownloadURL()
        .then(url => this.angularFire.database.list('images/blog').push({ url: url, name: name}))
      )
    }
  }

  selectImage() {
    this.currentPost.image = this.currentImage;
  }

}
