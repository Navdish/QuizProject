import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
export default function DateRangePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DateCalendar value={value} onChange={(newValue) => {setValue(newValue); console.log("new value ", newValue.$d)} }/>
    </LocalizationProvider>
  );
}