import { useAtom } from 'jotai'
import { tagsAtom } from 'atoms/drawer'
import { CustomChipListActions, CustomChipListState } from './types'
import { useState } from 'react'

export const useCustomChipList = (): CustomChipListState &
  CustomChipListActions => {
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleChipClick = (item: string) => {
    setSelectedItems((prevSelectedItems: string[]) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    )
  }

  const handleDelete = (item: string) => {
    // Filter out the deleted item from the list of items
    const updatedItems = tags.filter((i) => i !== item)
    setTags(updatedItems)
  }

  return { tags, selectedItems, handleChipClick, handleDelete }
}
