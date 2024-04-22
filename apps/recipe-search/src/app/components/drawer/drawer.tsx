import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery, // Import useMediaQuery hook
} from '@mui/material'
import { FilterList } from '@mui/icons-material'
import RangeSlider from '../range/rangeSlider'
import CustomAccordion from '../accordion/accordion'
import CustomChipList from '../chips/chips'
import { useCustomDrawer } from './useCustomDrawer'
import CloseIcon from '@mui/icons-material/Close'
import { useAtom } from 'jotai'
import { toggleDrawerAtom } from '../../../atoms/drawer'

const items: string[] = [
  'Biscuits and cookies',
  'Bread',
  'Cereals',
  'Condiments and sauces',
  'Desserts',
  'Drinks',
  'Main course',
  'Pancake',
  'Preps',
  'Preserve',
  'Salad',
  'Sandwiches',
  'Side dish',
  'Soup',
  'Starter',
  'Sweets',
]

const mealTypes: string[] = ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime']

export default function TemporaryDrawer() {
  const {
    openDrawer,
    toggleDrawer,
    checkedItems,
    checkedMealTypes, // Updated to include checkedMealTypes
    rangeValue,
    handleChange,
    handleToggle,
  } = useCustomDrawer(items)
  const [_, setOpenDrawer] = useAtom(toggleDrawerAtom)

  const isMobile = useMediaQuery('(max-width:600px)') // Check if screen width is less than 600px

  const DrawerList = (
    <Box
      sx={{
        width: { xs: '100%', md: 450 }, // Adjusted width based on screen size
        paddingY: 4,
        paddingX: 3,
      }}
      role="presentation"
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {isMobile && ( // Render close icon only if isMobile is true
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography
        variant="h6"
        sx={{
          paddingBottom: 2,
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 1,
        }}
        textAlign={'left'}
      >
        <FilterList />
        Filter By :
      </Typography>

      <CustomAccordion open title="Tags">
        <CustomChipList onClick={handleToggle} checkedItems={checkedItems} />
      </CustomAccordion>
      <CustomAccordion open title="Meal Type">
        <List>
          {mealTypes.map((item) => (
            <ListItem
              key={item}
              onClick={() => handleToggle('mealType', item)} // Updated to handle meal types
              button
              sx={{ padding: 0 }}
            >
              <Checkbox
                checked={checkedMealTypes[item] || false} // Updated to handle meal types
                onChange={() => handleToggle('mealType', item)} // Updated to handle meal types
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <ListItemText
                primary={item}
                primaryTypographyProps={{ align: 'left' }}
              />
            </ListItem>
          ))}
        </List>
      </CustomAccordion>

      <CustomAccordion title="Dish Type ">
        <List>
          {items.map((item) => (
            <ListItem
              onClick={() => handleToggle('dishType', item)} // Updated to handle dish types
              button
              sx={{ padding: 0 }}
            >
              <Checkbox
                checked={checkedItems[item] || false}
                onClick={() => handleToggle('dishType', item)} // Updated to handle dish types
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <ListItemText
                primary={item}
                primaryTypographyProps={{ align: 'left' }}
              />
            </ListItem>
          ))}
        </List>
      </CustomAccordion>
      <RangeSlider
        value={rangeValue}
        onChange={handleChange}
        min={0}
        max={300}
      />
    </Box>
  )

  return (
    <div>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  )
}
