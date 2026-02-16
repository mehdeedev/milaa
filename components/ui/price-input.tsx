"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { normalizeDigits } from "@/lib/utils"

function formatWithCommas(value: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function removeCommas(value: string) {
  return value.replace(/,/g, "")
}

export const PriceInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function PriceInput(
  { onChange, value, ...props },
  ref
) {
  const [displayValue, setDisplayValue] = React.useState("")

  React.useEffect(() => {
    if (value === undefined || value === null) {
      setDisplayValue("")
      return
    }

    const normalized = normalizeDigits(String(value))
    const raw = removeCommas(normalized)

    setDisplayValue(formatWithCommas(raw))
  }, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const normalized = normalizeDigits(e.target.value)
    const raw = removeCommas(normalized)

    // digits only
    if (!/^\d*$/.test(raw)) return

    setDisplayValue(formatWithCommas(raw))

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: raw, // always English digits
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

PriceInput.displayName = "PriceInput"
