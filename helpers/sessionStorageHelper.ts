export const getSearchTerm = (searchTerm: string | undefined): string => {
  const storedSearchTerm =
    sessionStorage.getItem('searchTerm') || searchTerm || ''
  return encodeURIComponent(storedSearchTerm)
}
