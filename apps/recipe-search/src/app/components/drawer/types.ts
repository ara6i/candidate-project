export interface CustomChipListProps {
  items: string[]
  checkedItems: { [key: string]: boolean }
  handleToggle: (item: string) => void
}
