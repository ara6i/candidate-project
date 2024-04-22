export interface Hits {
  count: number
  from: number
  to: number
  hits: Hit[]
  _links?: {
    self?: {
      href: string | undefined
    }
    next?: {
      href: string | undefined
    }
  }
}

export interface Hit {
  recipe: Recipe
}

export interface Recipe {
  label: string
  calories: number
  cautions: string[]
  cuisineType: string[]
  dietLabels: string[]
  dishType: string[]
  healthLabels: string[]
  image: string
  ingredientLines: string[]
  mealType: string[]
  source: string
  totalWeight: number
  uri: string
  url: string
  yield: number
}
