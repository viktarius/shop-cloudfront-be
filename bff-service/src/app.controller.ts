import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get(':service')
    requestRedirectHandler(@Param('service') service: string, @Query() query: any) {
        try {
            return this.appService.getRequestHandler(service, query)
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status || 500)
        }
    }
}
