import { Injectable } from '@nestjs/common';

@Injectable()
export class CartsCacheService {
    private cache: Record<string, any> = {};

    public save(data: any, params: string = 'all') {
        this.cache[`${ params }`] = data;
        setTimeout(() => {
            delete this.cache[`${ params }`];
        }, 120000)
    }

    public getCache(params: string = 'all') {
        return this.cache[`${ params }`];
    }
}
