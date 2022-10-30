export interface GetMonthResponse {
  months: Month[];
}
export interface Month {
  id: string;
  name: string;
  income: number;
  outcome: number;
}