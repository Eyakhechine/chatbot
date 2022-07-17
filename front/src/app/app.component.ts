import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import {ChatService} from "./chat.service";
import {map} from "rxjs";
import { VoiceRecognitionService } from '../service/voice-recognition.service'
declare const annyang: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [VoiceRecognitionService]
})
export class AppComponent {

  title = "chat";
  ROOT_URL = 'http://127.0.0.1:5000/get';
  textInput: string = '';
  soundInput: string = '';
  textOutput: string = '';
  textOutputs: string ='';

  constructor(private http: HttpClient, public service: VoiceRecognitionService) {
    this.service.init()
  }

  getReponses = async () => {
    let params = new HttpParams().set('msg', this.textInput);

    await this.http.get(this.ROOT_URL, {params: params}).subscribe(res => {

      this.textOutput = JSON.stringify(res).slice(1, -1);
      return res;
    });
  }


  ngOnInit(): void {
  }

  startService() {
    this.service.start()
  }

  async stopService() {
    this.service.stop()

    let params = new HttpParams().set('msg', this.service.text);

    await this.http.get(this.ROOT_URL, {params: params}).subscribe(res => {

      this.textOutputs = JSON.stringify(res).slice(1, -1);
      return res;

    });

  }
}
