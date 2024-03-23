import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from '../../domain';

export class CategoryService {

    // *DI

    constructor(){}

    async createCategory(createCategoryDto:CreateCategoryDto, user:UserEntity){

        const categoryExist = await CategoryModel.findOne({name:createCategoryDto.name});

        if(categoryExist) throw CustomError.badRequest('Category already exists');

        try {

            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            })

            await category.save();

            return {
                id:category.id,
                name:category.name,
                available: category.available,
            }
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getCategory(paginationDto:PaginationDto){
        
        const {page, limit} = paginationDto

        try {
            
            // const total = await CategoryModel.countDocuments();
            // const categoriesFound = await CategoryModel.find() 
            //     .skip(page - 1)
            //     .limit(limit)

            const [total, categoriesFound] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                .skip(page-1)
                .limit(limit)
            ])

            const categories = categoriesFound.map((category)=>{
    
                return{
                    id:category.id,
                    name:category.name,
                    available:category.available,
                }
    
            })
            return {
                page,
                limit,
                total,
                next: `http://localhost:8080/api/categories?page=${page+1}&limit=${limit}`,
                prev: (page-1 > 0) ?`http://localhost:8080/api/categories?page=${page-1}&limit=${limit}`:null,
                categories,
            }
            
        } catch (error) {
            throw CustomError.internalServer('Internal server error')
        }



        // []
    }
}

