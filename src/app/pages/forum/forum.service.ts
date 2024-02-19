import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  readonly API_URL = "http://localhost:8081"
  readonly ENDPOINT_QUESTIONS = "/getQuestion"
  readonly ENDPOINT_CREATE_QUESTION = "/addQuestion";
  readonly ENDPOINT_QUESTION_BY_ID = "/getQuestionById";
  readonly ENDPOINT_CREATE_ANSWER = "/addCommentaire";
  readonly ENDPOINT_GET_ANSWER = "/getResponsesForQuestion"; 
  readonly ENDPOINT_IMAGES = "/images";
  
  constructor(private httpClient:HttpClient) { 
  }
  getQuestions(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_QUESTIONS)
  }
  createQuestion(questionData: any) {
    return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CREATE_QUESTION, questionData);
  }
  getQuestionById(id: string) {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_QUESTION_BY_ID + `/${id}`);
  }
  postAnswer(answerData: any) {
    return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CREATE_ANSWER, answerData);
  }
  getResponseForQuestion(questionId: string){
    return this.httpClient.get<any>(this.API_URL+this.ENDPOINT_GET_ANSWER+ `/${questionId}`);
  }
  getImageUrl(imageName: string): string {
    // Cette URL pointe maintenant vers le serveur Spring Boot
    return `http://localhost:8081/images/${imageName}`;
  }
  
 
}
