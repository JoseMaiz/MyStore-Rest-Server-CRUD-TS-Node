
import bcrypt from 'bcryptjs';

export class BcryptAdapter {

    static hash(password: string){
        const salt = bcrypt.genSaltSync();

        const hash = bcrypt.hashSync(password,salt);

        return hash;
    };

    static compare(password:string, hashed:string){

        return bcrypt.compareSync(password, hashed)
    };
}
