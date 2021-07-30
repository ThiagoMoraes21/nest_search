import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import { ProductQuery, ProductSearchOptions } from '../interfaces/product.interface';

@Injectable()
export class ProductRepository {

    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ) { }

    public async findAll(options?: ProductSearchOptions): Promise<ProductDocument[]> {
        const queryOptions = this.getOptions(options);
        return this.productModel.find({}, null, queryOptions).exec();
    }

    public async find(search: ProductQuery, options?: ProductSearchOptions):
    Promise<ProductDocument[]> {
        const queryOptions = this.getOptions(options);
        const query = this.getQuery(search);
        return this.productModel
            .find(query, null, queryOptions)
            .exec();
    }

    public count(query): Promise<number> {
        const finalQuery = this.getQuery(query);
        return this.productModel.count(finalQuery).exec();
    }

    private getOptions(options: ProductSearchOptions) {
        const { page, limit, sort } = options;
        let queryOptions = {}
        
        if(page && limit) 
            queryOptions['skip'] = (Number(page) - 1) * Number(limit);
        
        if(limit) 
            queryOptions['limit'] = Number(limit);
        
        if (sort) queryOptions['sort'] = {
            price: sort
        }
        
        return queryOptions;
    }

    private getQuery(search: ProductQuery) {
        if(typeof search === 'object') return {};
        return {
            '$or': [
                { title: new RegExp(search.toString(), 'i') },
                { description: new RegExp(search.toString(), 'i') },
            ]
        }
    }
}