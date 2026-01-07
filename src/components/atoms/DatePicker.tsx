import React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/utils/classname.ts';

export type DatePickerProps = DayPickerProps & {
  className?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ className, ...props }) => {
  return (
    <div className={cn('rounded-lg border border-white/10 bg-transparent p-2', className)}>
      <DayPicker {...props} />
    </div>
  );
};

export default DatePicker;
