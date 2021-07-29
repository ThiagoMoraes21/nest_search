import { Product, ProductSchema } from './../entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from "nestjs-seeder";
import { ProductSeeder } from "./product.seeder";


seeder({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://thiago:passw0rd@cluster0.vqq92.mongodb.net/nestjs_search`
        ),
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema }
        ]),
    ],
}).run([ProductSeeder]);