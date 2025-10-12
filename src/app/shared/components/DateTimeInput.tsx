import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props })

  return (
    <DateTimePicker
      value={field.value ? dayjs(field.value) : null}
      onChange={value => {
        field.onChange(value ? value.toString() : null)
      }}
      sx={{ width: '100%' }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
    />
  )
}
