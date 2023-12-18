import { FC, InputHTMLAttributes, ChangeEvent } from "react"
import "./input.css"

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const Input: FC<CustomInputProps> = ({
  label,
  className,
  placeholder,
  onChange,
  type = "text",
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle the input change here
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <div className={`input-wrapper`}>
      <label className="label">{label}</label>
      <input
        className={`text_input ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default Input
