import { HttpStatus, Injectable, NestMiddleware, Next, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "../service/jwt.service"
import { UsersService } from '../service/users.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService:JwtService,private userService:UsersService){}
  use(@Req() req,@Res() res,@Next() next) {
    
    const token = req.headers.token;
    try {
        
      const payload =this.jwtService.verifyToken(token);
      
      
      
      console.log("Payload ",payload);
      console.log("ID ",req.params.id)
      if(payload.id==req.params.id){
        res.payload = payload;
      next();
      }
      else{
        console.log("checkpoint 3");
        throw new UnauthorizedException("User is not admin");
      }
       // Continue to the next middleware or route handler
    } catch (error) {
      // Handle token verification errors
      console.log("checkpoint 4");
      res.status(HttpStatus.BAD_GATEWAY).json({
        message:'Unauthorized Service',
        error,
    }) // Or you can throw an exception
    }
    
  }
}