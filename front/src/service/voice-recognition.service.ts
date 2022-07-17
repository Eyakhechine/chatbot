import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

 recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  // @ts-ignore
  tempWords;

ROOT_URL ='http://127.0.0.1:5000/get';
textInput: string = '';
soundInput: string = '';
textOutput : string ='';
  constructor(private  http:HttpClient) { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
 // @ts-ignore
      // @ts-ignore
    this.recognition.addEventListener('result', (e) => {

      const transcript = Array.from(e.results)
         // @ts-ignore

        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;

    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();

     // @ts-ignore
      // @ts-ignore
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();

      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();

  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';

  }
    getSoundReponses = async()=> {
    let params = new HttpParams().set('msg', this.text);
let response : string = ""

      await this.http.get(this.ROOT_URL, {params: params}).subscribe(res => {

      response = JSON.stringify(res).slice(1,-1);
      console.log(response)

    });
return response
  }
}
