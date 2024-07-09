import { PartialType } from '@nestjs/mapped-types';
import { CreateMau3Dto } from './create-mau3.dto';

export class UpdateMau3Dto extends PartialType(CreateMau3Dto) {}
