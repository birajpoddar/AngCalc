import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { logglyLogger } from 'angular-loggly-logger';

import { winston } from 'winston';
import { Papertrail } from 'winston-papertrail';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Papertrail],
  bootstrap: [AppComponent]
})
export class AppModule { }

logglyLogger.config( '012b53fc-1cf6-427c-b329-5d5f588540e1', true );

logglyLogger.sendMessage({ message: 'first log' });

const winstonPapertrail: any = new winston.transports.Papertrail({ host: 'logs6.papertrailapp.com', port: 22117 });

winstonPapertrail.on('error', function(err) {
  // Handle, report, or silently ignore connection errors and failures
});

const logger: any = new winston.Logger({ transports: [winstonPapertrail] });

logger.error('this is my message');
