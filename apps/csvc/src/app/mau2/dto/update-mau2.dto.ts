import { PartialType } from '@nestjs/mapped-types';
import { CreateMau2Dto } from './create-mau2.dto';

export class UpdateMau2Dto extends PartialType(CreateMau2Dto) {}
