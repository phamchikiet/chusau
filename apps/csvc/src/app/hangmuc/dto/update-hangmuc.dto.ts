import { PartialType } from '@nestjs/mapped-types';
import { CreateHangmucDto } from './create-hangmuc.dto';

export class UpdateHangmucDto extends PartialType(CreateHangmucDto) {}
