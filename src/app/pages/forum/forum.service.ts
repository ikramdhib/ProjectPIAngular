import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historique } from './Historique';
import { Page } from './Page';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  readonly API_URL = "http://localhost:8081"
  readonly ENDPOINT_QUESTIONS = "/getQuestion"
  readonly ENDPOINT_CREATE_QUESTION = "/addQuestion";
  readonly ENDPOINT_QUESTION_BY_ID = "/getQuestionById";
  readonly ENDPOINT_CREATE_ANSWER = "/addReponse";
  readonly ENDPOINT_GET_ANSWER = "/getResponsesForQuestion"; 
  readonly ENDPOINT_IMAGES = "/images";
  readonly ENDPOINT_DELETE_RESPONSE="/deleteReponse"

  readonly ENDPOINT_Favoris = "/findMostAnsweredQuestionByUser"
  readonly ENDPOINT_NB_REPONSE = "/nombreReponseByQuestion"
  readonly ENDPOINT_UPDATE_REPONSE = "/updateReponse"
  readonly ENDPOINT_GET_HISTORIQUE = "/getHistoriqueByUser"
  readonly ENDPOINT_DELETE_HISTORIQUE = "/deleteHistorique"
  readonly ENDPOINT_GET_TAGS = "/getAllTags"
 
  
  constructor(private httpClient:HttpClient) { 
  }
  getQuestions(page: number, size: number){
    return this.httpClient.get<Page<Question>>(`${this.API_URL}/getQuestion?page=${page}&size=${size}`);
  }
  createQuestion(questionData: any , id:any) {
    return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CREATE_QUESTION+`/${id}`, questionData);
  }
  getQuestionById(id: string) {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_QUESTION_BY_ID + `/${id}`);
  }
  postAnswer(answerData: any , id:any) {
    return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CREATE_ANSWER+`/${id}`, answerData);
  }
  getResponseForQuestion(questionId: string){
    return this.httpClient.get<any>(this.API_URL+this.ENDPOINT_GET_ANSWER+ `/${questionId}`);
  }
  getImageUrl(imageName: string): string {
    // Cette URL pointe maintenant vers le serveur Spring Boot
    return `http://localhost:8081/images/${imageName}`;
  }
  deleteResponse(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${this.ENDPOINT_DELETE_RESPONSE}/${id}`);
  }

  getListFavoris(userId: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${this.ENDPOINT_Favoris}/${userId}`);
  }
  getNbReponse(questionId: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${this.ENDPOINT_NB_REPONSE}/${questionId}`)
  }

  updateResponse(reponseId: string, content: string): Observable<any> {
    return this.httpClient.put(`${this.API_URL}${this.ENDPOINT_UPDATE_REPONSE}/${reponseId}`, { content });
    
  }
  getHistoriqueByUser(userId : string): Observable<any>{
    return this.httpClient.get(`${this.API_URL}${this.ENDPOINT_GET_HISTORIQUE}/${userId}`)
  }
  deleteHistorique(historiqueId: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${this.ENDPOINT_DELETE_HISTORIQUE}/${historiqueId}`);
  }
  getTags(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${this.ENDPOINT_GET_TAGS}`)
  }
 

 
}