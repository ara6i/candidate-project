import {
  REACT_APP_EDAMAM_APP_ID,
  REACT_APP_EDAMAM_APP_KEY,
} from '../app/constant/index'
import { atom, useAtom } from 'jotai'

export const urlAtom = atom(
  `https://api.edamam.com/api/recipes/v2?type=public&app_id=${REACT_APP_EDAMAM_APP_ID}&app_key=${REACT_APP_EDAMAM_APP_KEY}&calories=0-3000`
)
export const baseUrlAtom = atom(
  `https://api.edamam.com/api/recipes/v2?type=public&app_id=${REACT_APP_EDAMAM_APP_ID}&app_key=${REACT_APP_EDAMAM_APP_KEY}`
)
