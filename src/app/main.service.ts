import { Injectable, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiurl = 'http://localhost:4000'
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http:HttpClient) { }
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, x-CSRF-TOKEN, Content-Type, x-Auth-Token',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-cache',
  });

//    header = new HttpHeaders({
//     'Content-Type':'application/json',
 
// });
  postData(fromData:any, url:any):Observable<any>{
    const headers = new HttpHeaders();
    return this.http
    .post<any>(this.apiurl+url,fromData,{headers})
    .pipe(
      catchError(this.handleError)
    )
  }
  login(fromData:any, url:any):Observable<any>{
    const headers = new HttpHeaders();
    return this.http
    .post<any>(this.apiurl+url,fromData,{headers})
    .pipe(map(res=>{
      console.log(res)
      localStorage.setItem('access_token', res.token);
      return res
    }),
      catchError(this.handleError)
    )
  }
  getData(formData:any, url:any ):Observable<any>{
    const headers = new HttpHeaders();
    console.log(url)
    return this.http
    .get<any>(this.apiurl+url, {headers} )
    .pipe(
      catchError(this.handleError)
    )
  }
  check( url:any ):Observable<any>{
    console.log(url)
    return this.http
    .get<any>(this.apiurl+url, {headers:this.header} )
    .pipe(
      catchError(this.handleError)
    )
  }

  uploadFIle( img : FormData, url : any ):Observable<any>{
    const headers = new HttpHeaders();
    return this.http
    .post<any>(this.apiurl+url, img, {headers} )
    .pipe(
      catchError(this.handleError)
    )
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getComments(url:any):Observable<any>{
    const headers = new HttpHeaders();
    return this.http
    .get<any>(this.apiurl+url,{headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  addComments(url:any, comments:any):Observable<any>{

    const headers = new HttpHeaders;

    return this.http
    .post<any>(this.apiurl+url,comments,{headers})
    .pipe(
      catchError(this.handleError)
    )

  }

  likesCount(url:any,like_counts:any):Observable<any>{
    const headers = new HttpHeaders;
    return this.http
    .patch<any>(this.apiurl+url, like_counts,{headers})
    .pipe((
      catchError(this.handleError)
    ))
  }
  public get 
  loggedIn(): boolean {
     if (isPlatformBrowser(this.platformId)) {
      if(localStorage.getItem('access_token')){
        return true;
      }
 
  }
    return false
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(errorMessage);
  }
}
