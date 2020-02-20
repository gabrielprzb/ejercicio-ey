import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
//Grab everything with import 'rxjs/Rx';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class PeopleService {

    people: any[] = [];

    constructor(private http: HttpClient) {

    }

    getPerson(id: string) { //regresa la persona en el arreglo de personas por id
        return this.people.find(person => person._id == id)
    }

    updatePerson(id: string, data: any) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/people/' + id, data, {headers})
            .pipe(
                catchError(this.handleError));
    }

    newPerson(data: any) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/people/', data, {headers})
            .pipe(
                catchError(this.handleError));
    }

    deletePerson(id: string) {
        return this.http.delete('http://localhost:3000/api/people/' + id)
            .pipe(
                catchError(this.handleError));
    }

    searchPersonByEmail(searchInput: string) {
        return this.http.get('http://localhost:3000/api/people/search?searchInput=' + searchInput)
                        .pipe(   
                        catchError(this.handleError));
    }

    private handleError(error) {
        console.error('server error:', error);
        let errorMessage = 'Something went wrong';
        if (error instanceof HttpErrorResponse) {
            // client-side error
            errorMessage = `Something went wrong`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }


}


