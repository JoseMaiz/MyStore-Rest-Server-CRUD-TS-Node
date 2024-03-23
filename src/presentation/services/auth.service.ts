import { BcryptAdapter, JwtAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/DTOs/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/DTOs/auth/register-user.dto';
import { EmailService } from './email.service';


export class AuthService {

    //* DI
    constructor(

        private readonly emailService:EmailService
    ){}

    public async registerUser(registerUserDto:RegisterUserDto) {

        const existUser = await UserModel.findOne({email:  registerUserDto.email});

        if(existUser) throw CustomError.badRequest('Email already exist');

        try {

            const user = new UserModel(registerUserDto);
            
            // *Encrytar the password
            user.password = BcryptAdapter.hash(registerUserDto.password)
            await user.save();
            
            // *General a JWT for hold the user authentication
            const token = await JwtAdapter.generateToken({id: user.id});

            if(!token) throw CustomError.internalServer('Error while creating JWT')    
            
            // * Confirm mail
            this.sendEmailValidationLink(user.email);

            const {password,...userEntity} = UserEntity.fromObject(user)

            return {
                user:userEntity,
                token,
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    };

    public async loginUser(loginrUserDto:LoginUserDto){

        const user = await UserModel.findOne({email:  loginrUserDto.email});

        if(!user) throw CustomError.notFound('User not exist');
        // hash match
        
        const matchPassword = BcryptAdapter.compare(loginrUserDto.password, user.password)
        
        if(!matchPassword) throw CustomError.badRequest('Email or password wrong');

        const {password,...userEntity} = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({id: user.id, email: user.email});

        if(!token) throw CustomError.internalServer('Error while creating JWT')
        
        return {
            user: userEntity,
            token
        }
    }

    private async sendEmailValidationLink(email: string) {

        const token = await JwtAdapter.generateToken({email});
        if(!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const option = {
            to:email,
            subject:'Validate your email',
            htmlBody:html,
        }

        const isSent = await this.emailService.sendEmail(option);

        if (!isSent) throw CustomError.internalServer('Error sending email');


    }

    public async validateEmail(token:string) {

        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        const {email} = payload as {email:string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email});
        if(!user) throw CustomError.internalServer('Email not exist');
        
        user.emailValited = true;
        await user.save();

        return true;
    }
}

