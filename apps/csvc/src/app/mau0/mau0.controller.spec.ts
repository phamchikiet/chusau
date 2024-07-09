import { Test, TestingModule } from '@nestjs/testing';
import { Mau0Controller } from './mau0.controller';
import { Mau0Service } from './mau0.service';

describe('Mau0Controller', () => {
  let controller: Mau0Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Mau0Controller],
      providers: [Mau0Service],
    }).compile();

    controller = module.get<Mau0Controller>(Mau0Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
