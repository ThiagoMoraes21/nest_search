import { Product, ProductDocument } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) { }

    async find(options: Record<string, unknown>): Promise<ProductDocument[]> {
        return this.productModel.find(options).exec();
    }

}
