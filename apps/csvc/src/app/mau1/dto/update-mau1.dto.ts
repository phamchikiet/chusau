import { PartialType } from '@nestjs/mapped-types';
import { CreateMau1Dto } from './create-mau1.dto';

export class UpdateMau1Dto extends PartialType(CreateMau1Dto) {}
