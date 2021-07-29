import { ProductService } from './product.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get('frontend')
    async findAll() {
        return this.productService.find();
    }

    @Get('backend')
    async search(@Req() req: Request) {
        const { search, sort } = req.query;
        let options = {};
        let find = {}

        if (search) {
            find['$or'] = [
                { title: new RegExp(search.toString(), 'i') },
                { description: new RegExp(search.toString(), 'i') },
            ]
        }

        if (sort) {
            options['$sort'] = {
                price: sort
            }
        }

        console.log(find);
        console.log(options);

        return this.productService.find(find, options);
    }
}
