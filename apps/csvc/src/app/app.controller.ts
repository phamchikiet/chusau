import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAnalyticsService } from './google-analytics.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleAnalyticsService: GoogleAnalyticsService,
  ) {}

  @Get('hello')
  getData() {
    return this.appService.getData();
  }
  @Get('report')
  async getReport() {
      const response = await this.googleAnalyticsService.getReport();
      return response;
  }
}
