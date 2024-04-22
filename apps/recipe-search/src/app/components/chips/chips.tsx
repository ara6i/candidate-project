import React from 'react'
import { Chip, Grid, ListItem, useMediaQuery } from '@mui/material'
import { CustomChipListProps } from './types'
import { useCustomChipList } from './useChips'
import { Check } from '@mui/icons-material'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import { useTheme } from '@mui/material/styles' // Import useTheme hook
import { useCustomDrawer } from '../drawer/useCustomDrawer'

const CustomChipList: React.FC<CustomChipListProps> = ({
  checkedItems,
  onClick,
}) => {
  const { tags, handleChipClick, handleDelete } =
    useCustomChipList()
const {selectedItems} = useCustomDrawer(tags)
  const theme = useTheme() // Access the theme object


  // Check if the screen width is below a certain breakpoint (e.g., 'sm')
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Use theme object

  // Define the number of columns based on screen size
  const numColumns = isMobile ? 2 : 3

  return (
    <Grid container spacing={1}>
      {tags.map((item) => (
        <Grid item xs={12 / numColumns} key={item}>
          {' '}
          {/* Use 12 / numColumns to ensure equal width */}
          <ListItem sx={{ padding: 0 }}>
            <Chip
              label={item}
              clickable
              color={selectedItems.includes(item) ? 'primary' : 'default'}
              onClick={() => onClick('dietType', item)}
              icon={
                selectedItems.includes(item) ? (
                  <Check />
                ) : (
                  <CircleOutlinedIcon />
                )
              }
              sx={{ margin: '4px' }}
            />
          </ListItem>
        </Grid>
      ))}
    </Grid>
  )
}

export default CustomChipList
