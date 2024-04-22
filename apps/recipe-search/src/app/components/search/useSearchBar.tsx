// useSearchBar.js

import { useState, useEffect } from 'react'
import { DishType, SearchBarProps } from './types'
import { SelectChangeEvent } from '@mui/material'
import { useAtom } from 'jotai' // Import Jotai's atom and useAtom
import { searchAtom } from 'atoms/searchAtom'
import { urlAtom } from 'atoms/url'
interface UseSearchBarProps extends SearchBarProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearch: () => void
  handleFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFilterClose: () => void
  handleDishTypeChange: (event: SelectChangeEvent<DishType | null>) => void
  handleApplyFilter: () => void
  handleClearAll: () => void
  handleApplyAndSearch: () => void // Add handleApplyAndSearch to the interface
  searchTerm: string
  selectedDishType: DishType | null
  anchorEl: null | HTMLElement
  inputValue: string
}

const useSearchBar = (props?: SearchBarProps): UseSearchBarProps => {
  const [selectedDishType, setSelectedDishType] = useState<DishType | null>(
    null
  )
  const [link, setLink] = useAtom(urlAtom)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [inputValue, setInputValue] = useState<string>('') // Define inputValue state variable
  // Use Jotai's useAtom hook to access and update the value of the search term
  const [searchTerm, setSearchTerm] = useAtom(searchAtom)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSearch = () => {
    // Implement your search logic here
    setSearchTerm(inputValue)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setAnchorEl(null)
  }
  const handleApplyAndSearch = () => {
    handleSearch()
  }
  const handleDishTypeChange = (event: SelectChangeEvent<DishType | null>) => {
    setSelectedDishType(event.target.value as DishType | null)
  }

  const handleApplyFilter = () => {
    handleFilterClose()
  }

  const handleClearAll = () => {
    setSearchTerm('')
    setSelectedDishType(null)
  }

  // Read values from URL parameters when component mounts
  useEffect(() => {
    try {
      const url = new URL(link)
      const urlParams = url.searchParams

      // Check if the 'q' parameter exists
      if (urlParams.has('q')) {
        // Replace the value of the existing 'q' parameter with the new searchTerm
        urlParams.set('q', searchTerm)
      } else {
        // Add the 'q' parameter with the new searchTerm
        urlParams.append('q', searchTerm)
      }

      const updatedUrl = url.toString()
      setLink(updatedUrl)
    } catch (error) {
      console.error('Invalid URL format:', error)
      // Fallback mechanism: If the URL format is invalid, use a default URL
      // Modify this part according to your specific needs
      const defaultUrl = link
      setLink(defaultUrl)
    }
  }, [searchTerm])

  return {
    handleInputChange,
    handleSearch,
    handleFilterClick,
    handleFilterClose,
    handleDishTypeChange,
    handleApplyFilter,
    handleClearAll,
    handleApplyAndSearch, // Include handleApplyAndSearch here
    searchTerm,
    selectedDishType,
    anchorEl,
    inputValue,
    ...(props || {}),
  }
}

export default useSearchBar
