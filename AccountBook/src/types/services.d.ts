import {DepositStatement, NormalStatement, PreStatement} from './domain'

declare type AnyStatement = PreStatement | NormalStatement | DepositStatement

interface StatementsOfMonthDTO {
  year: number
  month: number
  statements: StatementsOfDayDTO[]
}

interface StatementsOfDayDTO {
  day: number
  statements: AnyStatement[]
}

interface StatementsService {
  fetchMonthStatements(year: number, month: number, day?: number, keyword?: string): Promise<StatementsOfMonthDTO>
}