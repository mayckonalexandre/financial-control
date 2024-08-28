import { Test, TestingModule } from '@nestjs/testing';
import { AddRecipe } from './add.recipe';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { Revenue } from 'src/domain/entities/revenues';
import { Wallet } from 'src/domain/entities/wallet';
import { NewRevenue } from './types';

describe('AddRecipe', () => {
  let addRecipe: AddRecipe;
  let dataSourceMock: Partial<DataSource>;
  let queryRunnerMock: Partial<QueryRunner>;
  let loggerServiceMock: Partial<LoggerService>;

  beforeEach(async () => {
    queryRunnerMock = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
      } as unknown as EntityManager,
    };

    dataSourceMock = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
    };

    loggerServiceMock = {
      logError: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddRecipe,
        { provide: DataSource, useValue: dataSourceMock },
        { provide: LoggerService, useValue: loggerServiceMock },
      ],
    }).compile();

    addRecipe = module.get<AddRecipe>(AddRecipe);
  });

  it('should add a recipe and update the wallet value', async () => {
    // Arrange
    const newRevenue: NewRevenue = {
      category_id: 1,
      origin_id: 1,
      description: 'Test Revenue',
      value: 100,
      user_id: '1',
    };

    const savedRevenue = { ...newRevenue, id: 1 };

    const wallet = {
      user_id: '1',
      value: 500,
    };

    queryRunnerMock.manager.save = jest.fn().mockResolvedValue(savedRevenue);
    queryRunnerMock.manager.findOne = jest.fn().mockResolvedValue(wallet);
    queryRunnerMock.manager.update = jest
      .fn()
      .mockResolvedValue({ affected: 1 });

    // Act
    const result = await addRecipe.execute(newRevenue);

    // Assert
    expect(queryRunnerMock.connect).toHaveBeenCalled();
    expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
    expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(
      Revenue,
      newRevenue,
    );
    expect(queryRunnerMock.manager.findOne).toHaveBeenCalledWith(Wallet, {
      where: { user_id: newRevenue.user_id },
      lock: { mode: 'pessimistic_write' },
    });
    expect(queryRunnerMock.manager.update).toHaveBeenCalledWith(
      Wallet,
      { user_id: newRevenue.user_id },
      { value: wallet.value + newRevenue.value },
    );
    expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
    expect(result).toEqual(savedRevenue);
  });

  it('should rollback transaction and log error if wallet not found', async () => {
    // Arrange
    const newRevenue: NewRevenue = {
      category_id: 1,
      origin_id: 1,
      description: 'Test Revenue',
      value: 100,
      user_id: '1',
    };

    queryRunnerMock.manager.save = jest.fn().mockResolvedValue(newRevenue);
    queryRunnerMock.manager.findOne = jest.fn().mockResolvedValue(null); // Simula carteira não encontrada

    // Act & Assert
    await expect(addRecipe.execute(newRevenue)).rejects.toThrowError(
      'Error when adding recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when adding recipe',
      expect.any(Error),
    );
  });

  it('should rollback transaction and log error if save fails', async () => {
    // Arrange
    const newRevenue: NewRevenue = {
      category_id: 1,
      origin_id: 1,
      description: 'Test Revenue',
      value: 100,
      user_id: '1',
    };

    queryRunnerMock.manager.save = jest
      .fn()
      .mockRejectedValue(new Error('Save failed'));

    // Act & Assert
    await expect(addRecipe.execute(newRevenue)).rejects.toThrowError(
      'Error when adding recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when adding recipe',
      expect.any(Error),
    );
  });
});
