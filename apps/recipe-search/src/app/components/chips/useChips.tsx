import { useAtom } from 'jotai';
import { chipAtom, tagsAtom } from 'atoms/drawer';
import { CustomChipListActions, CustomChipListState } from './types';
import { useState, useEffect } from 'react';

export const useCustomChipList = (): CustomChipListState &
  CustomChipListActions => {
  const [tags, setTags] = useAtom(tagsAtom);
  const [chip, setChips] = useAtom(chipAtom);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChipClick = (item: string) => {
    setSelectedItems((prevSelectedItems: string[]) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };

  useEffect(() => {
    // Update chips whenever selectedItems changes
    setChips(selectedItems as never[]);
  }, [selectedItems]); // Watch for changes in selectedItems

  const handleDelete = (item: string) => {
    // Filter out the deleted item from the list of items
    const updatedItems = tags.filter((i) => i !== item);
    setTags(updatedItems);
  };

  return { tags, selectedItems, handleChipClick, handleDelete };
};
