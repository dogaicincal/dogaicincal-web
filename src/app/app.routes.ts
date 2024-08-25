import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { CityComponent } from './pages/city/city.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'project/:code', component: ProjectComponent },
    { path: 'artists', component: ArtistsComponent },
    { path: 'artist/:code/:index', component: ArtistComponent },
    { path: 'cities', component: CitiesComponent },
    { path: 'city/:index', component: CityComponent },
    { path: 'countries', component: CountriesComponent },
    { path: 'country/:index', component: CountryComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];