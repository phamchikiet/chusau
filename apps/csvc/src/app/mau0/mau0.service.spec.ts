import { Test, TestingModule } from '@nestjs/testing';
import { Mau0Service } from './mau0.service';

describe('Mau0Service', () => {
  let service: Mau0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mau0Service],
    }).compile();

    service = module.get<Mau0Service>(Mau0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
