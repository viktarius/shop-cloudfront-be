import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartsService } from './services/carts.service';
import { IRequestHandler } from './services/request-handler.interface';
import { EService } from './services/services.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private readonly cartsService: CartsService) {}

    private readonly API_MAPPER: Record<EService, IRequestHandler> = {
        [EService.CARTS]: this.cartsService
    }

    public getRequestHandler(service: string, query: string): Observable<any> | never {
        if (this.API_MAPPER[service]) {
            return this.API_MAPPER[service].getRequestHandler(query);
        }
        throw new HttpException('Invalid service', HttpStatus.BAD_REQUEST);
    }

    public postRequestHandler(service: string, body: any) {
        if(this.API_MAPPER[service]){
            return this.API_MAPPER[service].postRequestHandler(body);
        }
        throw new HttpException('Invalid service', HttpStatus.BAD_REQUEST);
    }

    public deleteRequestHandler(service: string, query: string): Observable<any> | never {
        if (this.API_MAPPER[service]) {
            return this.API_MAPPER[service].deleteRequestHandler(query);
        }
        throw new HttpException('Invalid service', HttpStatus.BAD_REQUEST);
    }

    getHello(): string {
        return 'Hello World!';
    }
}
