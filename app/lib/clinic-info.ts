export const CLINIC_INFO = {
  name: '다나을신경외과의원',
  phone: '02-465-9898',
  coordinates: {
    lat: 37.5490604,
    lng: 127.0708617
  },
  hours: {
    weekday: '09:00 - 18:00',
    tuesday_evening: '18:00 - 20:00',
    saturday: '09:00 - 13:00'
  },
  address: {
    // Add address when available
    full: '', // Can be filled in later
  }
} as const; 