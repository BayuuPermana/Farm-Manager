import { useState, useMemo } from 'react';
import type { Livestock } from '../../../types';

export const useLivestockFilters = (livestock: Livestock[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLivestock = useMemo(() => {
    if (!livestock) return [];
    return livestock.filter((item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [livestock, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredLivestock
  };
};