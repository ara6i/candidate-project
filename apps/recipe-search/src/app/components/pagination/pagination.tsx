import React, { useState } from 'react'
import { Pagination, Stack } from '@mui/material'
import { atom, useAtom } from 'jotai'
import { nextLinkAtom, pageLinkAtom, prevLinkAtom } from 'atoms/pagination'
import { urlAtom } from 'atoms/url'



const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [nextLink] = useAtom(nextLinkAtom)
  const [prevLink] = useAtom(prevLinkAtom)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const [link, setLink] = useAtom(urlAtom)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Check if the value is greater than the current page and if there's a next page link
    if (value > currentPage && nextLink) {
      handlePageChange(value);
      setLink(nextLink);
    }
    // Check if the value is less than the current page and if there's a previous page link
    if (value < currentPage && prevLink) {
      handlePageChange(value);
      setLink(prevLink);
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
        count={2}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  )
}

export default PaginationComponent
