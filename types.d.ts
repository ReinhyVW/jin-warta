export interface TransactionData {
  id?: number;
  date: string;
  created_at?: string;
  transaction_type: number;
  world_order: number;
  congregation_expenses: number;
  extra_description1: string;
  extra_amount1: number;
  extra_description2: string;
  extra_amount2: number;
  extra_description3: string;
  extra_amount3: number;
  total: number;
  filled_by: string;
  verified_by: string;
}
