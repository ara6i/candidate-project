import { CssBaseline, Paper, Typography } from '@mui/material'
import RecipeList from './recipe-list/recipe-list'
import SearchBar from './components/search/search'
import PaginationComponent from './components/pagination/pagination'
import { nextLinkAtom} from 'atoms/pagination'
import { useAtom } from 'jotai'
import TemporaryDrawer from './components/drawer/drawer'

export function App() {
  const [nextLink] = useAtom(nextLinkAtom)

  return (
    <>
      <CssBaseline />
      <Paper elevation={5} sx={{ m: 5, p: 5 }}>
        <Typography variant="h2" sx={{ pb: 2 }}>
          Hyphen Candidate Project
        </Typography>
        <SearchBar />
        <RecipeList />
        {nextLink && (
          <PaginationComponent
          />
        )}
        <TemporaryDrawer />
      </Paper>
    </>
  )
}

export default App
