import {DepositStatement, NormalStatement, PreStatement} from './domain'

declare type AnyStatement = PreStatement | NormalStatement | DepositStatement

interface StatementsService {
  fetchMonthStatements(year: number, month: number, day?: number, keyword?: string): Promise<AnyStatement[]> // month start by 1
}
