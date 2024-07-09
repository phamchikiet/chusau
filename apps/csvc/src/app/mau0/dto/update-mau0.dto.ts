import { PartialType } from '@nestjs/swagger';
import { CreateMau0Dto } from './create-mau0.dto';

export class UpdateMau0Dto extends PartialType(CreateMau0Dto) {}
