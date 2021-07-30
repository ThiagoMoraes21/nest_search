import { ProductService } from './product.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProductSearchOptions, ProductSortOptions } from './interfaces/product.interface';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll(@Req() req: Request) {
        const { sort } = req.query;
        let options: ProductSearchOptions = {};
        if(sort) options['sort'] = sort as ProductSortOptions;
        return this.productService.findAll(options);
    }

    @Get('filter')
    async search(@Req() req: Request) {
        const { search = '', sort, page = 1, limit = 9 } = req.query;
        
        const options: ProductSearchOptions = {
            sort: sort as ProductSortOptions,
            limit: Number(limit),
            page: Number(page)
        }

        const data = await this.productService.find(
            search as string,
            options
        );

        const total = await this.productService.count(search);

        return {
            data, 
            total,
            page: Number(page),
            lastPage: Math.ceil(total / Number(limit))
        }
    }
}
