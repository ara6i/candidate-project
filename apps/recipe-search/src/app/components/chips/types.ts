export interface CustomChipListState {
  tags: string[]
  selectedItems: string[]
}

export interface CustomChipListActions {
  handleChipClick: (item: string) => void
  handleDelete: (item: string) => void
}
export interface CustomChipListProps {
  checkedItems: { [key: string]: boolean }
  onClick: (type: string, item: string) => void // Update the onClick prop
}
