import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { toggleDrawerAtom } from 'atoms/drawer'
import { baseUrlAtom, urlAtom } from 'atoms/url'


export const useCustomDrawer = (items: string[]) => {
  const [openDrawer, setOpenDrawer] = useAtom(toggleDrawerAtom)
  const [_, setLink] = useAtom(urlAtom)
  const [uri] = useAtom(baseUrlAtom)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [checkedMealTypes, setCheckedMealTypes] = useState<{
    [key: string]: boolean
  }>({})
  const [checkedDietTypes, setCheckedDietTypes] = useState<{
    [key: string]: boolean
  }>({})
  const [rangeValue, setRangeValue] = useState<number[]>([0, 3000])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }

  const handleChipClick = (item: string) => {
    setSelectedItems((prevSelectedItems: string[]) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    )
  }

  const handleChange = (newValue: number | number[]) => {
    setRangeValue(newValue as number[])
  }

  const handleToggle = (type: string, item: string) => {
    if (type === 'dishType') {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [item]: !prevCheckedItems[item],
      }))
    } else if (type === 'mealType') {
      setCheckedMealTypes((prevCheckedMealTypes) => ({
        ...prevCheckedMealTypes,
        [item]: !prevCheckedMealTypes[item],
      }))
    } else if (type === 'dietType') {
      handleChipClick(item)
    }
  }

  useEffect(() => {
    const selectedDishTypes = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    )
    const selectedMealTypes = Object.keys(checkedMealTypes).filter(
      (key) => checkedMealTypes[key]
    )
    const selectedDietTypes = Object.keys(checkedDietTypes).filter(
      (key) => checkedDietTypes[key]
    )
    const baseUrl = uri

    const urlWithDishTypes = selectedDishTypes
      .map((dishType) => `&dishType=${encodeURIComponent(dishType)}`)
      .join('')
    const urlWithMealTypes = selectedMealTypes
      .map((mealType) => `&mealType=${encodeURIComponent(mealType)}`)
      .join('')
    const urlWithDietTypes = selectedDietTypes
      .map((dietType) => `&diet=${encodeURIComponent(dietType)}`)
      .join('')

    // Constructing the calorie range parameter
    const calorieRange = `&calories=${rangeValue[0]}-${rangeValue[1]}`

    const url = `${baseUrl}${urlWithDishTypes}${urlWithMealTypes}${urlWithDietTypes}${calorieRange}`
    setLink(url)
  }, [checkedItems, checkedMealTypes, checkedDietTypes, rangeValue])

  return {
    openDrawer,
    toggleDrawer,
    checkedItems,
    checkedMealTypes,
    checkedDietTypes,
    rangeValue,
    handleChange,
    handleToggle,
  }
}
