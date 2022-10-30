export interface CategoryResponse {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  general: boolean;
  householdId: string;
}