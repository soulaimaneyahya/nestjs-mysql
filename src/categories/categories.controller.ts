import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryEntity } from "./category.entity/category.entity";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async fetchAll(@Res() response) {
        const categories = await this.categoriesService.findAll();
        return response.status(HttpStatus.OK).json({
            categories
        })
    }

    @Post()
    async createCategory(@Res() response, @Body()categoryEntity: CategoryEntity) {
        const category = await this.categoriesService.createCategory(categoryEntity);
        return response.status(HttpStatus.CREATED).json({
            category
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const category = await this.categoriesService.findOne(id);
        if (category) {
            return response.status(HttpStatus.OK).json({
                category
            })   
        } else {
            return response.status(HttpStatus.NOT_FOUND).json({
                "message": "not found"
            })
        }
    }

    @Put('/:id')
    async updateCategory(@Res() response, @Param('id') id, @Body()categoryEntity: CategoryEntity) {
        const category = await this.categoriesService.updateCategory(id, categoryEntity)
        if (category) {
            return response.status(HttpStatus.CREATED).json({
                category
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }

    @Delete('/:id')
    async destroyCategory(@Res() response, @Param('id') id) {
        if (await this.categoriesService.destroyCategory(id)) {
            return response.status(HttpStatus.OK).json({
                "message": "category Deleted"
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }

    @Post('/:id')
    async restoreCategory(@Res() response, @Param('id') id) {
        const category = await this.categoriesService.restoreCategory(id)
        if (category) {
            return response.status(HttpStatus.OK).json({
                category
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }
}
