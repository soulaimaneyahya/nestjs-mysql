import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/categories/category.entity/category.entity'
import { ProductEntity } from 'src/products/product.entity/product.entity'

export const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs-products',
    entities: [ProductEntity, CategoryEntity],
    synchronize: true,
}
