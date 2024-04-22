// SearchBar.js

import React from 'react'
import {
  TextField,
  IconButton,
  Box,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Search, FilterList } from '@mui/icons-material'
import { SearchBarProps } from './types'
import useSearchBar from './useSearchBar'
import { useAtom } from 'jotai'
import { toggleDrawerAtom } from 'atoms/drawer'

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    handleInputChange,
    handleApplyAndSearch, // Include handleApplyAndSearch from useSearchBar
    inputValue,
  } = useSearchBar(props)
  const [openDrawer, setOpenDrawer] = useAtom(toggleDrawerAtom)

  return (
    <Box display="flex" alignItems="center" width="100%" flexDirection={'row'}>
      <TextField
        id="search"
        type="search"
        label="Search"
        placeholder="Type here to search..."
        value={inputValue}
        onChange={handleInputChange}
        fullWidth={!isMobile}
        InputProps={{
          endAdornment: isMobile ? (
            <InputAdornment position="end">
              <IconButton onClick={handleApplyAndSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton onClick={handleApplyAndSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mr: isMobile ? 0 : 1,
          mb: isMobile ? 1 : 0,
          my: 10,
          width: '100%',
        }}
      />

      <IconButton onClick={() => setOpenDrawer(true)}>
        <FilterList />
      </IconButton>
    </Box>
  )
}

export default SearchBar
