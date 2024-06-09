import { FolderCommandTransporter, FolderQueryTransporter } from '@common/folder';
import { UserQueryTransporter } from '@common/user';
import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'nestjs-object-id';

import { CreateFolderDto, UpdateFolderDto } from './dto';
import { FolderModel } from './models';

@Controller('folder')
@ApiTags('Folder')
export class FolderController {
  public constructor(
    private readonly folderQueryTransporter: FolderQueryTransporter,
    private readonly folderCommandTransporter: FolderCommandTransporter,
    private readonly userQueryTransporter: UserQueryTransporter,
  ) {}

  private readonly logger = new Logger(FolderController.name);

  @ApiOperation({ summary: 'Get folders' })
  @ApiOkResponse({ type: FolderModel, isArray: true })
  @Get()
  public findMany(): Promise<FolderModel[]> {
    return this.folderQueryTransporter.findMany();
  }

  @ApiOperation({ summary: 'Get folder by id' })
  @ApiOkResponse({ type: FolderModel })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<FolderModel> {
    return this.folderQueryTransporter.findOne({ id });
  }

  @ApiOperation({ summary: 'Create folder' })
  @ApiBody({ type: CreateFolderDto })
  @ApiCreatedResponse({ type: FolderModel })
  @Post()
  public async create(@Body() data: CreateFolderDto): Promise<FolderModel> {
    const userExists = await this.userQueryTransporter.exists({ id: data.userId });

    if (!userExists) {
      this.logger.error(`Cannot create folder for non-existing user #${data.userId}!`);
      throw new NotFoundException('Cannot create folder for non-existing user!');
    }

    return this.folderCommandTransporter.create({ ...data });
  }

  @ApiOperation({ summary: 'Update folder by id' })
  @ApiBody({ type: UpdateFolderDto })
  @ApiOkResponse({ type: FolderModel })
  @Patch(':id')
  public updateOne(@Param('id', ParseObjectIdPipe) id: string, @Body() data: UpdateFolderDto): Promise<FolderModel> {
    return this.folderCommandTransporter.updateOne({ id, ...data });
  }

  @ApiOperation({ summary: 'Delete folder by id' })
  @Delete(':id')
  public deleteOne(@Param('id', ParseObjectIdPipe) id: string): void {
    this.folderCommandTransporter.deleteOne({ id });
  }
}
