import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CartsService } from './carts.service';
import { CartsCacheService } from './carts-cache.service';

@Module({
    imports: [HttpModule],
    providers: [CartsService, CartsCacheService],
    exports: [CartsService]
})
export class ServicesModule {}
