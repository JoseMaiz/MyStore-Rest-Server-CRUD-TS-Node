import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: string,
        public readonly description: string,
        public readonly user: string, //*Only user ID
        public readonly category: string, //*Only category ID
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {

        const {
            name,
            available,
            price,
            description,
            user,
            category,
        } = object;
        
        let availableBoolean = available;
        
        if(!name) return ['Missing name'];

        if(!user) return ['Missing user'];
        if(!Validators.isMongoID(user)) return ['Invalid user ID'];
        
        if(!category) return ['Missing category'];
        if(!Validators.isMongoID(category)) return ['Invalid category ID'];

        if(typeof available !== 'boolean'){
            availableBoolean = (available === 'true')
        }


        return [
            undefined, 
            new CreateProductDto(
                name,
                availableBoolean,
                price,
                description,
                user,
                category,
            ),
        ]
    }
}

