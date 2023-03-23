import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from './models/airport.model';
import { BASE_URL, HEADERS, RESOURCES } from './requestConfig';

@Injectable({
    providedIn: 'root',
})
export class AirportService {
    constructor(private http: HttpClient) {};

    public get(): Observable<Airport[]> {
        return this.http.get<Airport[]>(
            `${BASE_URL}/${RESOURCES.airports}`,
            {
                headers: HEADERS,
            },
        )
    };
}
