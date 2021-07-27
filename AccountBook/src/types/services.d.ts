import {DepositStatement, NormalStatement, PreStatement, TagGroup} from './domain'

declare type AnyStatement = PreStatement | NormalStatement | DepositStatement

interface StatementsService {
  fetchStatementTags(): Promise<TagGroup[]>
  fetchMonthStatements(size: number, page: number, keyword?: string): Promise<AnyStatement[]> // page start by 1
}
