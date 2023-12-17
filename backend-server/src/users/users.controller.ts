import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './service/auth.service';
import { AuthMiddleware } from './middleware/user.middleware';
import { DataService } from './service/data.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly dataService:DataService
  ) {}

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error! User not created',
        err,
      });
    }
  }

  @UseGuards(AuthMiddleware)
  @Post(':id/purchase')
  async purchaseGame(
    @Res() response,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    try {
      const games: string[] = data.games;
      const allUser = await this.usersService.purchase(id, games);
      return response.status(HttpStatus.OK).json({
        message: 'games added successfully',
        data: allUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in fetching',
        error,
      });
    }
  }

  @Post('/signin')
  async signin(@Res() response, @Body() data: any) {
    try {
      const Id = data.publicID;
      const payload = await this.authService.signIn(Id);

      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: payload,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in fetching',
        error,
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const allUser = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: allUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in fetching',
        error,
      });
    }
  }

  @Get('gamesdata')
  async dataFetch(
    @Res() response,
    
  ) {
    try {
      const updateUser = await this.dataService.fetchData();
      return response.status(HttpStatus.CREATED).json({
        message: 'fetched Successfully',
        data: updateUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in updating',
        error,
      });
    }
  }

  @Get('findId/:id')
  async findwithID(@Res() response, @Param('id') id: string) {
    try {
      const findUser = await this.usersService.findByUserID(id);
      if (findUser != null) {
        return response.status(HttpStatus.OK).json({
          message: 'Found successfully',
          data: findUser,
        });
      } else {
        throw NotFoundException;
      }
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in fetching',
        error,
      });
    }
  }
  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const findUser = await this.usersService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Found successfully',
        data: findUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in fetching',
        error,
      });
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updateUser = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Updated Successfully',
        data: updateUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in updating',
        error,
      });
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deleteUser = await this.usersService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Deleted Successfully',
        data: deleteUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in deleting',
        error,
      });
    }
  }

 
}
