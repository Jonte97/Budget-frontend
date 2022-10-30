export interface OutComeResponse {
  outcomes: Outcome[];
}
export interface Outcome {
  amount: number;
  categoryId: string;
  id: string;
  monthId: string;
  name: string;
  reoccouring: boolean;
}
