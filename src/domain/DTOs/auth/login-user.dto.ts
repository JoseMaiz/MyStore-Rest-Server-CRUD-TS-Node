import { regularExps } from "../../../config";


export class LoginUserDto {

    private constructor(
        public email:string,
        public password:string,
    ){}

    static create (object: {[key:string]:any}): [string?, LoginUserDto?]{

        const {email, password} = object;

        if(!email || !password) return ['Email or password wrong']
        if(!regularExps.email.test(email)) return ['Email is not valid']

        return [undefined, new LoginUserDto(email,password)]
    }
}

