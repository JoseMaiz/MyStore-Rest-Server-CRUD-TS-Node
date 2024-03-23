import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JwtSeed =envs.JWT_SEED;

export class JwtAdapter {

    static async generateToken(payload:any, duration: string = '2h') {

        return new Promise((resolve) =>{
            jwt.sign(payload, JwtSeed,{expiresIn:duration},(err, token)=>{

                if (err) return resolve(null)

                return resolve(token)
            })
            

        })
    }

    static validateToken<T>(token: string):Promise<T|null> {

        return new Promise ((resolve)=>{

            jwt.verify(token, JwtSeed, (err,decoded) =>{

                if(err) return resolve(null);

                return resolve(decoded as T)
            });
        })
    }
}

