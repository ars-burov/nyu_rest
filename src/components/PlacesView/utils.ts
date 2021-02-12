export const formatCusines = (cuisines: string[]): string => cuisines.some((cuisine) => cuisine.length > 0)
    ? `Cusines: ${cuisines.join(', ')}`
    : 'Cuisine not specified';
