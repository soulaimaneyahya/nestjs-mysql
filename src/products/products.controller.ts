import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from 'path';
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

    productImage(@UploadedFile() image: Express.Multer.File) {
        console.log(image);
        return 'image uploaded';
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './images',
            filename: (req, image, callback) => {
              const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(image.originalname);
              const filename = `${uniqueSuffix}${ext}`;
              callback(null, filename);
            },
          }),
        }),
    )
    async createProduct(@Res() response, @Body()productEntity: ProductEntity, @UploadedFile() image: Express.Multer.File) {
        const product = await this.productsService.createProduct(productEntity, image.path);
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
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './images',
            filename: (req, image, callback) => {
              const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(image.originalname);
              const filename = `${uniqueSuffix}${ext}`;
              callback(null, filename);
            },
          }),
        }),
    )
    async updateProduct(@Res() response, @Param('id') id, @Body()productEntity: ProductEntity, @UploadedFile() image: Express.Multer.File) {
        const product = await this.productsService.updateProduct(id, productEntity, image.path)
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

    @Post('/:id')
    async restoreProduct(@Res() response, @Param('id') id) {
        const product = await this.productsService.restoreProduct(id)
        if (product) {
            return response.status(HttpStatus.OK).json({
                product
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message": "something wrong !"
            })
        }
    }
}
