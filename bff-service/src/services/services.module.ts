import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CartsService } from './carts.service';

@Module({
    imports: [HttpModule],
    providers: [CartsService],
    exports: [CartsService]
})
export class ServicesModule {}
