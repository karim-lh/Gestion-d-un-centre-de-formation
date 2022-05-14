import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/sessionformation';

@Injectable({
  providedIn: 'root'
})
export class SessionsformationsService {

  constructor( private http : HttpClient ) { }
  getAll() {
    console.log(this.http.get(baseUrl));
    return this.http.get(baseUrl);
    
  }
  
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data) {
    console.log(data)
    return this.http.post(baseUrl, data);
  }
  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}

