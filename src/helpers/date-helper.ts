export const dateTimeRegex =
  /^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(:\d{2})?)?$/;

export const isValidDate = (dateString?: string): boolean => {
  if (!dateString) return false;

  const date = new Date(dateString);

  // Checks if the date is valid and if the month and day match the given string
  return (
    !isNaN(date.getTime()) &&
    dateString.substring(0, 10) ===
      `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        '0',
      )}-${String(date.getUTCDate()).padStart(2, '0')}`
  );
};

export const formatDateTime = (date?: Date): string => {
  if (!date) return '';

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

export const formatDateWithoutTimeZone = (date?: string) => {
  return date ? new Date(`${date}Z`) : '';
};
