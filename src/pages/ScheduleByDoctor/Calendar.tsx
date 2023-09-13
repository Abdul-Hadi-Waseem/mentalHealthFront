import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment"

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

export const CalendarComponent: React.FC<CalendarProps> = ({ onDateChange }) => {
  const minDate = moment().add(1, 'day').startOf('day').toDate(); // Set min date to tomorrow
  return (
    <div className="calendar-container">
      <Calendar minDate={minDate} onChange={(date: Date) => onDateChange(date)} />
    </div>
  );
}
