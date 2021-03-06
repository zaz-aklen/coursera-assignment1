import { Injectable } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/Leaders';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/Operators';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,private processHTTPMsgService:ProcessHTTPMsgService) { }
  getLeader():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL+'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedleader():Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map(leader=>leader[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
