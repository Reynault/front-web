export interface Recipe{
  id: string;
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
