import { ProductModel } from '../../data';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';

export class ProductService {

    // *DI

    constructor(){}

    async createProduct(createProductDto:CreateProductDto){

        const productExist = await ProductModel.findOne({name:createProductDto.name});

        if(productExist) throw CustomError.badRequest('Product already exists');

        try {

            const product = new ProductModel(createProductDto)

            await product.save();

            return product;
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProduct(paginationDto:PaginationDto){
        
        const {page, limit} = paginationDto

        try {
            
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                .skip(page-1)
                .limit(limit)
                .populate('user')
                .populate('category')
            ])

            return {
                page,
                limit,
                total,
                next: `http://localhost:8080/api/products?page=${page+1}&limit=${limit}`,
                prev: (page-1 > 0) ?`http://localhost:8080/api/products?page=${page-1}&limit=${limit}`:null,
                products,
            }
            
        } catch (error) {
            throw CustomError.internalServer('Internal server error')
        }



        // []
    }
}

