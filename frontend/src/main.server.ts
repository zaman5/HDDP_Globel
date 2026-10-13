import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Used only at build time to prerender public pages to static HTML (see routes.txt).
// The context carries the server platform; without it Angular falls back to the browser platform.
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
