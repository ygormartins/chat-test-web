import { format, isToday, isYesterday } from "date-fns";

export const generateHumanReadableDate = (date: Date): string => {
  if (isToday(date)) {
    const formattedTimeDate = format(date, "HH:mm");
    return formattedTimeDate;
  }

  if (isYesterday(date)) return "Yesterday";

  const formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
};
