import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomInt } from "crypto";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Factory(faker => faker.commerce.productName())
    @Prop()
    title: string;

    @Factory(faker => faker.lorem.sentences(10))
    @Prop()
    description: string;

    @Factory(faker => faker.image.imageUrl())
    @Prop()
    image: string;

    @Factory(faker => randomInt(10, 1000))
    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
