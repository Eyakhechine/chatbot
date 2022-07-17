import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
apiUrl= 'http://127.0.0.1:5000/get?msg=';

  constructor(private  _http:HttpClient) {}

  getRep() {

return this._http.get(this.apiUrl);

  }
}
