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
  private _flights!: Flight[];
  flights!: Flight[];
  airportselected: string = '';
  loader: boolean = true;

  constructor(
    private airportService: AirportService,
    private flightService: FlightService,
  ) {};

  map!: L.Map;
  markers: L.Layer[] = [];

  private addTiles(filter: string | null = null) {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 0,
        detectRetina: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    var iconPlane = L.icon({
      iconUrl: 'assets/plane3.png',
      iconSize: [25, 25],
    });

    this.airports.forEach((airport) => {
      const lat: number = airport?.latitude || 50
      const lon: number = airport?.longitude || -90;

      let iconSize: L.PointExpression | undefined = [20, 30];

      if (airport.icao === filter) iconSize = [25, 37.5];

      var iconLocal = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        iconSize: iconSize,
      });

      L.marker([lat, lon], {icon: iconLocal})
        .addTo(this.map)
        .bindPopup(`${airport.icao} - ${airport.name}`)
        .on("click", (e) => {
          this.flights.filter(
            (flight) => flight.from === airport.icao,
          )
          this.map.remove();
          this.initMap(airport.icao);
        });
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

  private initMap(filter: string | null = null): void {
    if (filter) {
      this.flights = this._flights.filter(
        (flight) => flight.from === filter || flight.to === filter
      );
    }

    this.map = L.map('map', {
      center: [50, -90],
      zoom: 4
    });

    this.addTiles(filter);
    this.loader = false;
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
        this._flights = this.flights;
        this.initMap();
      });
    });
  };

  resetMap(): void {
    this.map.remove();
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }
}
