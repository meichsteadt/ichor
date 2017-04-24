import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions }     from '@angular/http';
import { mailChimp } from '../api-keys';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.css']
})
export class MessagerComponent {

  constructor(private http: Http) { }


  submit(name: string, company: string, phone: string, email: string, referal: string, message: string) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true });
    let options = new RequestOptions({ headers: headers });
    let url = "http://localhost:3000/mailgun"
    let body = {
                  "name": btoa(name),
                  "email": btoa(email),
                  "message": btoa(message),
                  "key": btoa(mailChimp.serverKey),
                  "password": btoa(mailChimp.serverPassword)
                }
    this.http.post(url, body, options).subscribe(response => console.log(this.extractData(response)))
  }

  private extractData(res: Response) {
    let body = res.json();
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
