import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  readonly API_URL = "http://localhost:8081"
  readonly ENDPOINT_QUESTIONS = "/getQuestion"
  readonly ENDPOINT_CREATE_QUESTION = "/addQuestion";


  constructor(private httpClient:HttpClient) { 
  }
  getQuestions(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_QUESTIONS)
  }
  createQuestion(questionData: any) {
    return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CREATE_QUESTION, questionData);
  }
  
}
