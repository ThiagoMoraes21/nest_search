import { ProductService } from './product.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController { 

    constructor(private readonly productService: ProductService) {}

    @Get('frontend')
    async frontend() {
        return this.productService.find({});
    }
}
