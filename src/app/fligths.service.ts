import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './models/flight.model';
import { BASE_URL, HEADERS, RESOURCES } from './requestConfig';

@Injectable({
    providedIn: 'root',
})
export class FlightService {
    constructor(private http: HttpClient) {};

    public get(): Observable<Flight[]> {
        return this.http.get<Flight[]>(
            `${BASE_URL}/${RESOURCES.currentflights}`,
            {
                headers: HEADERS
            },
        )
    };
}
