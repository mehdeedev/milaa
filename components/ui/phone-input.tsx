"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { normalizeDigits } from "@/lib/utils"

export const PhoneInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function PhoneInput({ onChange, value, ...props }, ref) {
  const [displayValue, setDisplayValue] = React.useState("")

  React.useEffect(() => {
    if (value === undefined || value === null) {
      setDisplayValue("")
      return
    }

    const normalized = normalizeDigits(String(value))
    setDisplayValue(normalized)
  }, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const normalized = normalizeDigits(e.target.value)

    // Allow only digits
    if (!/^\d*$/.test(normalized)) return

    setDisplayValue(normalized)

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: normalized, // always English digits
        },
      }
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <Input
      ref={ref}
      inputMode="numeric"
      dir="ltr"
      value={displayValue}
      onChange={handleChange}
      {...props}
    />
  )
})

PhoneInput.displayName = "PhoneInput"
