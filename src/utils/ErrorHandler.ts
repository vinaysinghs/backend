
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

export const validateRequiredFields = (fields: object) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return `${key} is required`;
    }
  }
  return null;
};


export const validateTimes = (times: any[]) => {
  if (!Array.isArray(times)) return 'Times should be an array';
  for (const time of times) {
    if (!time.startTime || !time.endTime) {
      return 'Each time entry must have startTime and endTime';
    }
  }
  return null;
};