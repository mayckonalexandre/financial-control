import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { DeleteRecipe } from './delete.recipe';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { Revenue } from 'src/domain/entities/revenues';
import { Wallet } from 'src/domain/entities/wallet';

describe('RemoveRecipe', () => {
  let removeRecipe: DeleteRecipe;
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
        DeleteRecipe,
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
        { provide: LoggerService, useValue: loggerServiceMock },
      ],
    }).compile();

    removeRecipe = module.get<DeleteRecipe>(DeleteRecipe);
  });

  it('should remove the income value and update the portfolio value', async () => {
    const data = { id_revenue: 1, user_id: '1' };

    const revenue = {
      user_id: '1',
      id_revenue: 1,
      value: 500,
    };

    const wallet = {
      user_id: '1',
      value: 500,
    };

    queryRunnerMock.manager.findOne = jest
      .fn()
      .mockResolvedValueOnce(revenue)
      .mockResolvedValueOnce(wallet);

    await removeRecipe.execute(data.id_revenue, data.user_id);

    expect(queryRunnerMock.manager.update).toHaveBeenCalledTimes(2);
    expect(queryRunnerMock.manager.update).toHaveBeenCalledWith(
      Revenue,
      { id_revenue: revenue.id_revenue },
      { deleted: 1 },
    );
    expect(queryRunnerMock.manager.update).toHaveBeenCalledWith(
      Wallet,
      { user_id: wallet.user_id },
      { value: wallet.value - revenue.value },
    );
    expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
  });

  it('should throw an error if the revenue is not found', async () => {
    queryRunnerMock.manager.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(removeRecipe.execute(1, '1')).rejects.toThrow(
      'Error when removing recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when removing recipe',
      expect.any(Error),
    );
  });

  it('should throw an error if the wallet is not found', async () => {
    const revenue = {
      user_id: '1',
      id_revenue: 1,
      value: 500,
    };

    queryRunnerMock.manager.findOne = jest
      .fn()
      .mockResolvedValueOnce(revenue)
      .mockResolvedValueOnce(null);

    await expect(removeRecipe.execute(1, '1')).rejects.toThrow(
      'Error when removing recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when removing recipe',
      expect.any(Error),
    );
  });

  it('should rollback if there is an error during wallet update', async () => {
    const revenue = {
      user_id: '1',
      id_revenue: 1,
      value: 500,
    };

    const wallet = {
      user_id: '1',
      value: 500,
    };

    queryRunnerMock.manager.findOne = jest
      .fn()
      .mockResolvedValueOnce(revenue)
      .mockResolvedValueOnce(wallet);

    queryRunnerMock.manager.update = jest
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('Update failed'));

    await expect(removeRecipe.execute(1, '1')).rejects.toThrow(
      'Error when removing recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when removing recipe',
      expect.any(Error),
    );
  });

  it('should rollback if there is an error during revenue deletion', async () => {
    const revenue = {
      user_id: '1',
      id_revenue: 1,
      value: 500,
    };

    const wallet = {
      user_id: '1',
      value: 500,
    };

    queryRunnerMock.manager.findOne = jest
      .fn()
      .mockResolvedValueOnce(revenue)
      .mockResolvedValueOnce(wallet);

    queryRunnerMock.manager.update = jest
      .fn()
      .mockRejectedValueOnce(new Error('Deletion failed'));

    await expect(removeRecipe.execute(1, '1')).rejects.toThrow(
      'Error when removing recipe',
    );
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(loggerServiceMock.logError).toHaveBeenCalledWith(
      'Error when removing recipe',
      expect.any(Error),
    );
  });
});
