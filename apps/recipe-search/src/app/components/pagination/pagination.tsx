import React from 'react'
import { Pagination, Stack } from '@mui/material'
import { atom, useAtom } from 'jotai'
import { pageLinkAtom } from 'atoms/pagination'
import { urlAtom } from 'atoms/url'

interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number, nextPageLink?: string) => void
  nextPageLink?: string
  prevPageLink?: string
}

const PaginationComponent: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  nextPageLink,
  prevPageLink,
}) => {
  const [link, setLink] = useAtom(urlAtom)
  console.log(prevPageLink, 'prevPageLink')

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Check if the value is greater than the current page and if there's a next page link
    if (value > currentPage && nextPageLink) {
      onPageChange(value, nextPageLink);
      setLink(nextPageLink);
    }
    // Check if the value is less than the current page and if there's a previous page link
    if (value < currentPage && prevPageLink) {
      onPageChange(value, prevPageLink);
      setLink(prevPageLink);
    }
  };
  

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 6 }}
    >
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  )
}

export default PaginationComponent
