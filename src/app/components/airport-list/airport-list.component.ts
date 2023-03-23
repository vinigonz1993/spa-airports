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

  private _airports!: Airport[];
  private _flights!: Flight[];
  airports!: Airport[];
  flights!: Flight[];
  order: string = 'departsAt';
  selectedAirport!: Airport;
  loader: boolean = true;

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
      this._airports = this.airports;
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
      });
      this._flights = this.flights;
      this.loader = false;
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

  refreshData() {
    this.airports = this._airports;
    this.flights = this._flights;
  }

  filterAirports(event: any) {
    const name: string = event.target.value;
    if (name !== '') {
      this.airports = this._airports.filter(
        (x) => (x.name.toLowerCase()).includes(name.toLowerCase()),
      );
      const ids: string[] = this.airports.map((x) => x.icao);

      this.flights = this._flights.filter(
        (x) => ids.includes(x.from) || ids.includes(x.to),
      );
    }
    else this.refreshData();
  };
};
