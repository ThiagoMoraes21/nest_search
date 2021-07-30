import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductQuery, ProductSearchOptions } from './interfaces/product.interface';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository
    ) { }

    public async find(
        fields: ProductQuery,
        options?: ProductSearchOptions):
        Promise<Product[]> {
        return this.productRepository.find(fields, options);
    }

    public async findAll(options: ProductSearchOptions): Promise<Product[]> {
        return this.productRepository.findAll(options);
    }

    public count(query: ProductQuery): Promise<number> {
        return this.productRepository.count(query);
    }

}
