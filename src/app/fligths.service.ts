import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './models/flight.model';

@Injectable({
    providedIn: 'root',
})
export class FlightService {
    baseUrl = 'http://xiapp.tradewindapps.com:9912/currentflights';

    constructor(private http: HttpClient) {};

    public get(): Observable<Flight[]> {
        return this.http.get<Flight[]>(
            this.baseUrl,
            {
                headers: {
                    contentType: 'appliucation/json',
                    'X-API-Token': '9265ee96af02fe95e132e33a447f8f08',
                },
            },
        )
    };
}
