export interface Recipe{
  id: string;
  username: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient{
  name: string;
  quantity: number;
  unit: string;
}
