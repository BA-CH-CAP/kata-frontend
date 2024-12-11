import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  urlBackend = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getResult(numVal: number) {
    let param = new HttpParams().set("num", numVal);

    return this.http.get(this.urlBackend+'/api/transform?', {params: param, responseType: 'text'});
  }

}
