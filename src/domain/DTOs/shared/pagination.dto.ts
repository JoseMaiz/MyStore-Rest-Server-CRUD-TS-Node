

export class PaginationDto {

    private constructor(

        public readonly page: number,
        public readonly limit: number,
    ){}

    static create(page: number = 1,limit: number = 1):[string?,PaginationDto?]{

        if(isNaN(page)||isNaN(limit)) return ['Page and limit must be numbers']
        if(page<= 0) return ['Page be greater than 0']
        if(limit<= 0) return ['Limit be greater than 0']

        return [undefined,new PaginationDto(page,limit)]
    }
}

