import { Component, OnInit }  from '@angular/core';
import { Http, Response, Headers, RequestOptions }     from '@angular/http';
import { mailChimp } from '../api-keys';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    // this.addEmail('matteichsteadt@gmail.com').subscribe(a => console.log(a));
  }

  addEmail(email: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true });
    let options = new RequestOptions({ headers: headers });
    let url = "https://test:" + mailChimp.apiKey + "@" + mailChimp.zone + ".api.mailchimp.com/3.0/lists/" + mailChimp.listId + "/members";
    console.log(url);
    let body = { "email_address": email, "status": "subscribed" }
    return this.http.post(url, body, options).map(this.extractData).catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('hey!')
    console.log(body);
    return  body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
