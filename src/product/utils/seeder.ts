import { Product, ProductSchema } from './../entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from "nestjs-seeder";
import { ProductSeeder } from "./product.seeder";
import { ConfigModule } from '@nestjs/config';

seeder({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vqq92.mongodb.net/nestjs_search`
        ),
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema }
        ]),
    ],
}).run([ProductSeeder]);