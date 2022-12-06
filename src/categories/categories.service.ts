import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./category.entity/category.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ){
    }

    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: string): Promise<CategoryEntity> {
        return await this.categoryRepository.findOneById(id);
    }

    async createCategory(categoryEntity: CategoryEntity): Promise<CategoryEntity> {
        categoryEntity.slug = this.slugify(categoryEntity.name);
        return await this.categoryRepository.save(categoryEntity);
    }

    async updateCategory(id: string, categoryEntity: CategoryEntity): Promise<CategoryEntity> {
        const category = await this.findOne(id)
        if (category) {
            const {name, description} = categoryEntity

            category.name = name
            category.slug = this.slugify(name)
            category.description = description
            category.save()

            return category
        }
    }

    async destroyCategory(id: string) {
        const deleteResponse = await this.categoryRepository.softDelete(id);
        if (deleteResponse.affected) {
            return deleteResponse
        }
    }

    async restoreCategory(id: string) {
        await this.categoryRepository.restore(id);
        return this.findOne(id)
    }

    slugify(name: string): string {
        const slug = name
        .toLowerCase().trim()
        .replace(' ', '-')

        return slug
    }
}
