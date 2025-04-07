import { format } from 'date-fns';
import { da } from 'date-fns/locale';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'd. MMMM yyyy', { locale: da });
};