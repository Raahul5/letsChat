import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly subject = new Subject<string>

  $data = this.subject.asObservable()
  private readonly apiurl = 'http://localhost:8080'
  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object, private readonly http: HttpClient) { }
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, x-CSRF-TOKEN, Content-Type, x-Auth-Token',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-cache',
  });

  getSomeData(url: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  postData(fromData: any, url: any): Observable<any> {

    const headers = new HttpHeaders();
    return this.http
      .post<any>(this.apiurl + url, fromData, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }
  login(fromData: any, url: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http
      .post<any>(this.apiurl + url, fromData, { headers })
      .pipe(map(res => {
        return res
      }),
        catchError(this.handleError)
      )
  }

  getUserId(): string | null {

    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) return null;

      try {
        const decoded: JWTPayload = jwtDecode(token);
        return decoded.sub || null;
      } catch (e) {
        console.error('Invalid token', e);
        return null;
      }
    }
    return null;
  }

  getUserDetails(url: any, id: any): Observable<any> {
    console.log(id + "  From Service")
    const headers = new HttpHeaders();
    const params = new HttpParams().set('userid', id);
    return this.http
      .get<any>(this.apiurl + "/api" + url, { headers, params })
      .pipe(
        catchError(this.handleError)
      )
  }

  fetchAllPost(url: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http
      .get<any>(this.apiurl + url, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }


  getData(formData: any, url: any): Observable<any> {
    const headers = new HttpHeaders();
    console.log(url)
    return this.http
      .get<any>(this.apiurl + url, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }
  check(url: any): Observable<any> {
    console.log(url)
    return this.http
      .get<any>(this.apiurl + url, { headers: this.header })
      .pipe(
        catchError(this.handleError)
      )
  }

  uploadFIle(img: FormData, url: any): Observable<any> {
    console.log(img)
    const headers = new HttpHeaders();
    return this.http
      .post<any>(this.apiurl + url, img, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }



  addComments(url: any, comments: any): Observable<any> {

    const headers = new HttpHeaders;

    return this.http
      .post<any>(this.apiurl + url, comments, { headers })
      .pipe(
        catchError(this.handleError)
      )

  }

  likesCount(url: any, like_counts: any): Observable<any> {
    const headers = new HttpHeaders;
    return this.http
      .patch<any>(this.apiurl + url, like_counts, { headers })
      .pipe((
        catchError(this.handleError)
      ))
  }


  public get loggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }
  private handleError(error: HttpErrorResponse): Observable<any> {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else if (error.status === 409) {
      return of({ status: false, message: error.error ?? 'User already exists' });
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);

  }
}

interface JWTPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
