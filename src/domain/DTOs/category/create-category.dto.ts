

export class CreateCategoryDto {

    private constructor(
        public readonly name:String,
        public readonly available: boolean,
    ){}

    static create(object: {[key:string]:any}): [string?, CreateCategoryDto?] {

        const {name, available = false} = object;
        let availableBoolean = available;

        if(!name) return ['Missing name'];
        if(typeof available !== 'boolean'){
            availableBoolean = (available === 'true')
        }

        return [undefined, new CreateCategoryDto(name, availableBoolean)]
    }
}

