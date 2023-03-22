import {
  Component, OnInit
} from '@angular/core';
import * as L from 'leaflet';
import { Airport } from 'src/app/models/airport.model';
import { AirportService } from 'src/app/airports.service';
import { FlightService } from 'src/app/fligths.service';
import { Flight } from 'src/app/models/flight.model';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  private airports!: Airport[];
  private flights!: Flight[];

  constructor(
    private airportService: AirportService,
    private flightService: FlightService,
  ) {};

  map!: L.Map;
  markers: L.Layer[] = [];

  private addTiles() {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 0,
        detectRetina: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    var iconLocal = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      iconSize: [20, 30],
    });

    var iconPlane = L.icon({
      iconUrl: 'assets/plane3.png',
      iconSize: [25, 25],
    });

    this.airports.forEach((airport) => {
      const lat: number = airport?.latitude || 50
      const lon: number = airport?.longitude || -90;
      L.marker([lat, lon], {icon: iconLocal})
        .addTo(this.map)
        .bindPopup(`${airport.icao} - ${airport.name}`);

      });

    this.flights.forEach((flight) => {
      const lat: number = flight?.latitude || 50
      const lon: number = flight?.longitude || -90;
      L.marker([lat, lon], {icon: iconPlane})
        .addTo(this.map)
        .bindPopup(`
          <strong>Flight #: ${flight.flightNumber}</strong>
          <br/>
          <small>
            From: ${flight.from}
          </small>
          <br/>
          <small>
            To: ${flight.to}
          </small>
          <hr/>
          Departure: ${flight.departsAt}
          <br/>
          Arrives at: ${flight.departsAt}
        `);

      });
    tiles.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [50, -90],
      zoom: 5
    });

    this.addTiles();

  }

  getData() {
    this.airportService.get().subscribe((airports) => {
      this.airports = airports.map((airport) => ({
        icao: airport.icao,
        latitude: airport.latitude,
        longitude: airport.longitude,
        name: airport.name,
      }));

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
        this.initMap();
      });
    });
  };

  ngOnInit(): void {
    this.getData();
  }
}
