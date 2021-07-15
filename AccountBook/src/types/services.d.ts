import {DepositStatement, NormalStatement, PreStatement} from './domain'

declare type AnyStatement = PreStatement | NormalStatement | DepositStatement

interface StatementsService {
  fetchMonthStatements(size: number, page: number, keyword?: string): Promise<AnyStatement[]> // page start by 1
}
