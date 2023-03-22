import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from './models/airport.model';

@Injectable({
    providedIn: 'root',
})
export class AirportService {
    baseUrl = 'http://xiapp.tradewindapps.com:9912/airports';

    constructor(private http: HttpClient) {};

    public get(): Observable<Airport[]> {
        return this.http.get<Airport[]>(
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
