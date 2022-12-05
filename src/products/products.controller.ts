import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ProductEntity } from "./product.entity/product.entity";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    async fetchAll(@Res() response) {
        const products = await this.productsService.findAll();
        return response.status(HttpStatus.OK).json({
            products
        })
    }

    @Post()
    async createProduct(@Res() response, @Body()productEntity: ProductEntity) {
        const product = await this.productsService.createProduct(productEntity);
        return response.status(HttpStatus.CREATED).json({
            product
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const product = await this.productsService.findOne(id);
        if (product) {
            return response.status(HttpStatus.OK).json({
                product
            })   
        } else {
            return response.status(HttpStatus.NOT_FOUND).json({
                "message": "not found"
            })
        }
    }

    @Put('/:id')
    async updateProduct(@Res() response, @Param('id') id, @Body()productEntity: ProductEntity) {
        const product = await this.productsService.updateProduct(id, productEntity)
        if (product) {
            return response.status(HttpStatus.CREATED).json({
                product
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }

    @Delete('/:id')
    async destroyProduct(@Res() response, @Param('id') id) {
        if (await this.productsService.destroyProduct(id)) {
            return response.status(HttpStatus.OK).json({
                "message": "Product Deleted"
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }
}
