import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vqq92.mongodb.net/nestjs_search`
        ),
        ProductModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
