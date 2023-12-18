import "./select.css"
import { SelectHTMLAttributes, ChangeEvent, FC } from "react"

interface CustomSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  label: string
  options: { value: string; label: string }[]
  className?: string
  value?: any,
  onChange?: (
    selectedOption: { value: string; label: string } | null
  ) => void
}

const Select: FC<CustomSelectProps> = ({
  label,
  options,
  className,
  value,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedOption =
      options.find((option) => option.value === selectedValue) || null
    onChange?.(selectedOption)
  }

  return (
    <div className={`select-wrapper ${className}`}>
      <label className="label">{label}</label>
      <select
        className="select_input"
        onChange={handleChange}
        value={value?.value || null}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
