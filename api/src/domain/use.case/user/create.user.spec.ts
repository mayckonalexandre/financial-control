import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from 'src/repositories/user.repository';
import { BcryptService } from 'src/util/bcrypt';

import { CreateUser } from 'src/domain/use.case/user/create.user';
import { NewUser } from 'src/domain/use.case/user/types';

describe('CreateUser', () => {
  let createUser: CreateUser;
  let userRepository: UserRepository;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUser,
        {
          provide: UserRepository,
          useValue: {
            getByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: BcryptService,
          useValue: {
            generateHash: jest.fn(),
          },
        },
      ],
    }).compile();

    createUser = module.get<CreateUser>(CreateUser);
    userRepository = module.get<UserRepository>(UserRepository);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('deve criar um usuário com sucesso', async () => {
    (userRepository.getByEmail as jest.Mock).mockResolvedValue(null);

    const hashedPassword = 'hashedPassword';
    (bcryptService.generateHash as jest.Mock).mockResolvedValue(hashedPassword);

    const newUser = { id: 1, email: 'test@test.com', password: hashedPassword };
    (userRepository.create as jest.Mock).mockResolvedValue(newUser);

    const data: NewUser = {
      nome: 'teste',
      email: 'test@test.com',
      password: 'password',
    };

    const result = await createUser.execute(data);

    expect(result).toEqual(newUser);
    expect(userRepository.getByEmail).toHaveBeenCalledWith(data.email);
    expect(bcryptService.generateHash).toHaveBeenCalledWith(data.password);
    expect(userRepository.create).toHaveBeenCalledWith({
      ...data,
      password: hashedPassword,
    });
  });

  it('deve lançar um erro se o e-mail já estiver registrado', async () => {
    const existingUser = {
      id: 1,
      email: 'test@test.com',
      password: 'hashedPassword',
    };

    (userRepository.getByEmail as jest.Mock).mockResolvedValue(existingUser);

    const data: NewUser = {
      nome: 'teste',
      email: 'test@test.com',
      password: 'password',
    };

    await expect(createUser.execute(data)).rejects.toThrowError(
      'Este e-mail já está registrado. Tente outro e-mail ou recupere a senha.',
    );
  });
});
