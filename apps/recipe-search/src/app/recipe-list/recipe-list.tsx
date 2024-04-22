import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { Hits, Recipe } from '../models'
import RecipeItem from '../recipe-item/recipe-item'
import { useAtom } from 'jotai'
import { searchAtom } from 'atoms/searchAtom'
import { nextLinkAtom, prevLinkAtom } from 'atoms/pagination'
import SkeletonGrid from '../components/skeleton/skeleton'
import { urlAtom } from 'atoms/url'

export interface RecipeListProps {
  searchTerm?: string | null
}

export function RecipeList(props: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true) // Manage loading state
  const [searchTerm] = useAtom(searchAtom)
  const [nextLink, setNextLink] = useAtom(nextLinkAtom)
  console.log(nextLink, 'nextLink')

  const [prevLink, setPrevLink] = useAtom(prevLinkAtom)
  const [link] = useAtom(urlAtom)

  useEffect(() => {
    const getApiResponse = async <T,>(): Promise<T> => {
      try {
        const url = link // link with credentials key moved to atoms folder , and some filters added by default instead of search value for q param
        const api_url = url
        const response = await fetch(api_url)
        const data = (await response.json()) as Promise<T>
        return data
      } catch (error) {
        console.error('Error fetching recipes:', error)
        throw error
      }
    }

    const fetchRecipes = async () => {
      try {
        setLoading(true) // Set loading state to true before making the request
        const response = await getApiResponse<Hits>()
        setRecipes(response.hits ? response.hits.map((h) => h.recipe) : [])
        setNextLink(
          response._links?.next?.href ? response._links?.next?.href : ''
        )
        setPrevLink(
          response._links?.self?.href ? response._links?.self?.href : ''
        )
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false) // Set loading state to false after the request completes
      }
    }

    fetchRecipes()
  }, [link])

  if (loading) {
    return <SkeletonGrid />
  }
  if (!loading && recipes.length <= 0) {
    return (
      <Typography textAlign={'center'} variant="h6">
        No recipes found
      </Typography>
    )
  }

  return (
    <Grid container spacing={4}>
      {recipes?.map((r) => (
        <Grid item sm={3} key={r.uri}>
          <RecipeItem recipe={r} />
        </Grid>
      ))}
    </Grid>
  )
}

export default RecipeList
