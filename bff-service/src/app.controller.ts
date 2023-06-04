import { Body, Controller, Delete, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get(':service')
    requestRedirectGetHandler(@Param('service') service: string, @Query() query: any) {
        try {
            return this.appService.getRequestHandler(service, query)
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status || 500)
        }
    }

    @Post(':service')
    requestRedirectPostHandler(@Param('service') service: string, @Body() body: any) {
        try {
            return this.appService.postRequestHandler(service, body)
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status || 500)
        }
    }


    @Delete(':service')
    requestRedirectDeleteHandler(@Param('service') service: string, @Query() query: any) {
        try {
            return this.appService.deleteRequestHandler(service, query)
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status || 500)
        }
    }
}
