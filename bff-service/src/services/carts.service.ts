import { Injectable } from '@nestjs/common';
import { IRequestHandler } from './request-handler.interface';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class CartsService implements IRequestHandler {
    private readonly url = 'http://viktarius-cart-api-dev.us-east-1.elasticbeanstalk.com/api/v3/carts';

    constructor(private readonly httpService: HttpService) {}

    public getRequestHandler(params: any): Observable<any> {
        console.log(params);
        if (params?.id) {
            return this.httpService.get(`${ this.url }/${ params.id }`).pipe(map(res => res.data));
        } else {
            return this.httpService.get(this.url).pipe(map(res => res.data));
        }
    }

    public postRequestHandler(params: any, body: any): Observable<any> {
        return of({})
    }
}
