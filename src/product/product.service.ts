import { Product, ProductDocument } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type Query = Record<string, unknown>;

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) { }

    async find(fields: Query = {}, options?: Query): Promise<ProductDocument[]> {
        return this.productModel
            .find(fields, null, options)
            .exec();
    }

    count(options): Promise<number> {
        return this.productModel.count(options).exec();
    }

}
