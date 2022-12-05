import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ){}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string): Promise<ProductEntity> {
        return await this.productRepository.findOneById(id);
    }

    async createProduct(product: ProductEntity): Promise<ProductEntity> {
        return await this.productRepository.save(product);
    }

    async updateProduct(id: string, productEntity: ProductEntity): Promise<ProductEntity> {
        const product = await this.findOne(id)
        if (product) {
            const {name, description, price, isAvailable} = productEntity

            product.name = name
            product.description = description
            product.price = price
            product.isAvailable = isAvailable
            product.save()

            return product
        }
    }

    async destroyProduct(id: string) {
        const product = await this.findOne(id)
        return await this.productRepository.remove(product)
    }
}
