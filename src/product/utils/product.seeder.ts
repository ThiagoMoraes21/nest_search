import { ProductDocument } from '../entities/product.entity';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Product } from "../entities/product.entity";

export class ProductSeeder implements Seeder {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) { }

    seed(): Promise<any> {
        const products = DataFactory.createForClass(Product).generate(50);
        return this.productModel.insertMany(products);
    }

    drop(): Promise<any> {
        return this.productModel.deleteMany({}) as any;    
    }
}