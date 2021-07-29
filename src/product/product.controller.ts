import { ProductService } from './product.service';
import { Controller, Get, Req } from '@nestjs/common';
import { query, Request } from 'express';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll(@Req() req: Request) {
        const { sort } = req.query;
        const options = {
            sort: {
                price: sort
            }
        }
        return this.productService.find(null, options);
    }

    @Get('filter')
    async search(@Req() req: Request) {
        const {
            search,
            sort,
            page = 1,
            limit = 9
        } = req.query;

        let find = {}
        let options = {
            skip: (Number(page) - 1) * Number(limit),
            limit: Number(limit)
        };

        if (search) {
            find['$or'] = [
                { title: new RegExp(search.toString(), 'i') },
                { description: new RegExp(search.toString(), 'i') },
            ]
        }

        if (sort) {
            options['sort'] = {
                price: sort
            }
        }

        const data = await this.productService.find(find, options);
        const total = await this.productService.count(find);

        return {
            data, 
            total,
            page: Number(page),
            lastPage: Math.ceil(total / Number(limit))
        }
    }
}
