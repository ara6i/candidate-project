import { CssBaseline, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import RecipeList from './recipe-list/recipe-list'
import SearchBar from './components/search/search'
import PaginationComponent from './components/pagination/pagination'
import { nextLinkAtom, prevLinkAtom } from 'atoms/pagination'
import { useAtom } from 'jotai'
import TemporaryDrawer from './components/drawer/drawer'

export function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [nextLink] = useAtom(nextLinkAtom)
  const [prevLink] = useAtom(prevLinkAtom)

  const totalPages = 2

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <>
      <CssBaseline />
      <Paper elevation={5} sx={{ m: 5, p: 5 }}>
        <Typography variant="h2" sx={{ pb: 2 }}>
          Hyphen Candidate Project
        </Typography>
        <SearchBar />
        {/* Pass the handleInputChange function to SearchBar */}
        {/* Pass the searchTerm as a prop to RecipeList */}
        <RecipeList />
        {nextLink && (
          <PaginationComponent
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            nextPageLink={nextLink}
            prevPageLink={prevLink}
          />
        )}
        <TemporaryDrawer />
      </Paper>
    </>
  )
}

export default App
