import { Component, OnInit } from '@angular/core';
import { AirportService } from 'src/app/airports.service';
import { FlightService } from 'src/app/fligths.service';
import { Airport } from 'src/app/models/airport.model';
import { Flight } from 'src/app/models/flight.model';


@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

  airports!: Airport[];
  flights!: Flight[];
  order: string = 'departsAt';
  selectedAirport!: Airport;

  constructor(
    private airportService: AirportService,
    private flightService: FlightService,
  ) {};

  ngOnInit(): void {
    this.airportService.get().subscribe((airports) => {
      this.airports = airports.map((airport) => ({
        icao: airport.icao,
        latitude: airport.latitude,
        longitude: airport.longitude,
        name: airport.name,
      }));

    });

    this.flightService.get().subscribe((flights) => {
      this.flights = flights.map((flight) => ({
        arrivesAt: flight.arrivesAt,
        departsAt: flight.departsAt,
        flightNumber: flight.flightNumber,
        from: flight.from,
        latitude: flight.latitude,
        longitude: flight.longitude,
        to: flight.to,
      }));
      this.flights.sort((a, b) => {
        return a.departsAt > b.departsAt ? 1 : a.departsAt < b.departsAt ? -1 : 0;
      })
    });
  }

  getAirport(airport: Airport) {
    this.selectedAirport = airport;
  }

  orderBy(param: "departsAt" | "arrivesAt") {
    this.order = param;
    this.flights.sort((a, b) => {
      return a[param] > b[param] ? 1 : a[param] < b[param] ? -1 : 0;
    })
  }

}
