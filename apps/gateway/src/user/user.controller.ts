import { UserCommandTransporter, UserEventTransporter, UserQueryTransporter } from '@common/user';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'nestjs-object-id';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UserModel } from './models';

@Controller('user')
@ApiTags('User')
export class UserController {
  public constructor(
    private readonly userQueryTransporter: UserQueryTransporter,
    private readonly userCommandTransporter: UserCommandTransporter,
    private readonly userEventTransporter: UserEventTransporter,
  ) {}

  @ApiOperation({ summary: 'Get users' })
  @ApiOkResponse({ type: UserModel, isArray: true })
  @Get()
  public findMany(): Promise<UserModel[]> {
    return this.userQueryTransporter.findMany();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserModel })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<UserModel> {
    return this.userQueryTransporter.findOne({ id });
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserModel })
  @Post()
  public create(@Body() data: CreateUserDto): Promise<UserModel> {
    return this.userCommandTransporter.create(data);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserModel })
  @Patch(':id')
  public updateOne(@Param('id', ParseObjectIdPipe) id: string, @Body() data: UpdateUserDto): Promise<UserModel> {
    return this.userCommandTransporter.updateOne({ id, ...data });
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  public async deleteOne(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.userCommandTransporter.deleteOne({ id });
    await this.userEventTransporter.userDeleted({ userId: id });
  }
}
