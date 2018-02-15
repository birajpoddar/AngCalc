import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// https://github.com/ajbrown/angular-loggly-logger
import { logglyLogger } from 'angular-loggly-logger';

// https://github.com/kenperkins/winston-papertrail
import { winston } from 'winston';
import { Papertrail } from 'winston-papertrail';
import { Logger } from 'winston';
import { transports } from 'winston';

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
  providers: [Papertrail, logglyLogger],
  bootstrap: [AppComponent]
})
export class AppModule { }

// let log = new logglyLogger();

// log.config( '012b53fc-1cf6-427c-b329-5d5f588540e1', true );

// log.sendMessage({ message: 'first log' });

const winstonPapertrail = new Papertrail({ host: 'logs6.papertrailapp.com', port: 22117 });

const logger = new Logger({ transports: [winstonPapertrail] });

winstonPapertrail.on('error', function(err) {
  // Handle, report, or silently ignore connection errors and failures
  console.log(err.message);
});

winstonPapertrail.on('connect', function() {
  logger.error('Connected');
});

logger.error('this is my message');
