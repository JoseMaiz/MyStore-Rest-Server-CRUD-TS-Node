import { Response, Request } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from '../services/category.service';


export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}

    private handleErrror (error:unknown, res:Response) {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.error(`${error}`);
        return res.status(500).json({error:'Internal Server error'})
    }

    createCategory = (req:Request, res:Response)=>{
        const [error,createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.categoryService.createCategory(createCategoryDto!, req.body.user)
            .then(category => res.status(201).json(category))
            .catch(error => this.handleErrror(error, res))
        
    }

    getCategory = (req:Request, res:Response)=>{

        const {page = 1, limit = 5} = req.query;
        const [error,paginationDto] = PaginationDto.create(+page,+limit);
        if(error) return res.status(400).json({error})

        this.categoryService.getCategory(paginationDto!)
            .then(categories => res.json(categories))
            .catch(error => this.handleErrror(error, res))

    }

}

