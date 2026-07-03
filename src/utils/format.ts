export const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate));

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
