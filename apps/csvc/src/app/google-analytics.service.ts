// google-analytics.service.ts
import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';

@Injectable()
export class GoogleAnalyticsService {
    private readonly analyticsDataClient: BetaAnalyticsDataClient;

    constructor() {
        const credentials = {
            client_email: 'rausachtrangia@inspiring-bonus-128710.iam.gserviceaccount.com',
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHL4P+7A0y/XHE\nVN62guG/ttpN7zefQomxcJlD2wWW0kgu2qOXG3NXp2MJyIhyB2en+M1KmZ54nQso\nXWSST0D6ghq9/rsRC1rl1qpWNfrBYf4S66BhLNRdGTL4xtA0dc7jdGx6wy1KeK4y\nuNYbl6P2ObfpLnBkdi9xnI15NgNMWWgkFMJDzG5Lk5N+GXiHdjt8Dxqc7vAnHoYx\nFCzTaLuqAoOMh3tr1Eafju7E0wBAO1G5RABjM4TkCC/uJ5ecj40ECt8RMOvNWVHi\nnynTP5eOF/BjJzaJURp+YmWfDKDTzYi5e9QxirV6Qj9n7pOehhMxVphuRTGY2ZTF\n8NTvd3plAgMBAAECggEAPFyZZyT4wQWONv2zOmMCb5tFn82JMSG0YYnqYGZc1L5n\n8o7+eVnvw9XtjPbw5oF4963N5LgWDp4k1fgrdK1A10mbOg2aeglTZAiAOT0Ffxon\nqWsvgJNZzdbHnB1/1g4HguVyxGcmcAWPYL6j39u96+3E3ozcsY0hRpA3TU7BhB6g\nm1zn4FUpGr98brTw6Ce40pdtkVj1APFB5/7tVCtSnYzvflZGP8ZpO9ttOhOUdY/D\nSIPTuM327oz3BxtM7Ln6Lo1J4zyO9v5cPZTEw+1/8pleyswWTF0Koa1cSuSlHr2r\nHvczirGVk/JSPVKEARKiuXg5aLbZKdqq1E13XBeplwKBgQD35OZWRjr9t8+z2rrD\nFO0ZsAIpLb/LmjWuI4fvHJEX46rtL0eMtuwLjJRlgodaNKwnWWWv2UXE7g4A6bP/\nth1gbrWStqvcllchehmzXc26i5SsR+fooRTBI4wZT30YaENXH/4L5MhTb50pOfgQ\n1/qhUhZaHEWerOzZjQs+FgUNewKBgQDNsuGHzCKF3bae1OhR6QmRPTonA5xx1UoZ\nqm00VeiFmD2gY5uB936NgGsYoH2xdrrBNw0VI/D9FafSlTuyJMhoqAfHdVTa4zuc\nUSBEG7b3vFr3lvxJ2PTyChagJLpzHVH09RBDYwz/yAtE28YKY56LN/3/ULMX3Y+k\n/naMDAHhnwKBgGf5OiM1kciZMCTfuTXZsRj1GfLrnWZoZ9uCS6Ge+bxrYWXaTshW\ncOrnK9bnyJ2tOgfHFz+Kghj3QChh3X2DhQ7NYJsIw0ziQelorR7uWTvFD7ay8jJA\nXdQkdL6o+G8kTBpe8M9MRjm4ttJz3fgynozLQVTKRukm3rDg17ZSxgvBAoGAdEps\nPLTI07ur8hHWIfDIqubdiI7/FFAMK4RxZsQmx9hxBsspcIm2b1MpuOuLBBhmrrNr\n3wbJyJtEnMYn0KgA8UIF29rWlUUgP1iSEE9G2roPB6jBixJwMKJJdlItYsUxv3YI\nssA96iFzVYOWa+s0B+so2v4JsjVdb185MCXdrmsCgYEA5nam686Ufd684keeRTuG\nLSYCVLAgcQS9BTIev6hBna7G5n9mHJUb4CfrTfqy4Omg7Cje2jHI/Oh8I84qv+xp\nUfyoh+PK941CUvt1GvF+AHvi/oot9OCFoKBEFx/Y1iUsbbvma7KGSlb8NhEIhZN/\nWN85olshbsCqh077BE7Y5ew=\n-----END PRIVATE KEY-----\n",
          };
      
          const auth = new google.auth.GoogleAuth({
            credentials: credentials, // Use credentials object
            scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
          });
        this.analyticsDataClient = new BetaAnalyticsDataClient({ auth });
    }

    async getReport() {
        const [response] = await this.analyticsDataClient.runReport({
            property: `properties/436474169`, // Replace with your property ID
            dateRanges: [
                {
                    startDate: '7daysAgo',
                    endDate: 'today',
                },
            ],
            dimensions: [
                { name: 'city' },
            ],
            metrics: [
                { name: 'activeUsers' },
            ],
        });

        return response;
    }
}
