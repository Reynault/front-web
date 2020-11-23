export interface Recipe{
  title: string;
  description: string;
  ingredients: Ingredient[];
  step: string[];
}

export interface Ingredient{
  name: string;
  quantity: number;
  unit: string;
}
