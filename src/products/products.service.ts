import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ){
    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string): Promise<ProductEntity> {
        return await this.productRepository.findOneById(id);
    }

    async createProduct(productEntity: ProductEntity, image): Promise<ProductEntity> {
        productEntity.slug = this.slugify(productEntity.name);
        productEntity.image = image
        return await this.productRepository.save(productEntity);
    }

    async updateProduct(id: string, productEntity: ProductEntity, image): Promise<ProductEntity> {
        const product = await this.findOne(id)
        if (product) {
            const {name, description, price, isAvailable} = productEntity

            product.name = name
            product.slug = this.slugify(name)
            product.description = description
            product.price = price
            product.isAvailable = isAvailable
            product.image = image
            product.save()

            return product
        }
    }

    async destroyProduct(id: string) {
        const deleteResponse = await this.productRepository.softDelete(id);
        if (deleteResponse.affected) {
            return deleteResponse
        }
    }

    async restoreProduct(id: string) {
        await this.productRepository.restore(id);
        return this.findOne(id)
    }

    slugify(name: string): string {
        const slug = name
        .toLowerCase().trim()
        .replace(' ', '-')

        return slug
    }
}
