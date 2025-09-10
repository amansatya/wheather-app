import { formatDate } from './formatDate';

export const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(formatDate(date));
    }
    return dates;
};
