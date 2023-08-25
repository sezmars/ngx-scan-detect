import {
    enableProdMode,
} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withInMemoryScrolling,
} from '@angular/router';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {APP_ROUTES} from './app/app.routing.module';

if (environment.production) {
    enableProdMode();
}

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
    withInMemoryScrolling(scrollConfig);

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter([...APP_ROUTES], inMemoryScrollingFeature)
    ]
}).then();
