import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './auth/auth.service';
import { provideServiceWorker } from '@angular/service-worker';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    AuthService
    // importProvidersFrom(
    //   NotifierModule.withConfig({
    //   position: {
    //     horizontal: {
    //       position: 'right',
    //       distance: 12,
    //     },
    //     vertical: {
    //       position: 'top',
    //       distance: 12,
    //       gap: 10,
    //     },
    //   },
    //   theme: 'material',
    //   behaviour: {
    //     autoHide: 5000,
    //     onClick: 'hide',
    //     onMouseover: 'pauseAutoHide',
    //     showDismissButton: true,
    //     stacking: 4,
    //   },
    //   animations: {
    //     enabled: true,
    //     show: {
    //       preset: 'slide',
    //       speed: 300,
    //       easing: 'ease',
    //     },
    //     hide: {
    //       preset: 'fade',
    //       speed: 300,
    //       easing: 'ease',
    //       offset: 50,
    //     },
    //     shift: {
    //       speed: 300,
    //       easing: 'ease',
    //     },
    //     overlap: 150,
    //   },
    // }),),
    ,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
]
};
