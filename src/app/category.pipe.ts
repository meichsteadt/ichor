import {Pipe, PipeTransform} from '@angular/core';
import { BlogPost } from './blog.model';

@Pipe({
  name: 'category',
  pure: false
})

export class CategoryPipe implements PipeTransform {
  transform(posts: BlogPost[], category){
    if(posts){
      let arr = [];
      for(let i=0; i < posts.length; i++) {
        if(category === "all") {
          return posts
        }
        else if(posts[i].categories.includes(category)) {
          arr.push(posts[i]);
        }
      }
      return arr;
    }
  }
}
