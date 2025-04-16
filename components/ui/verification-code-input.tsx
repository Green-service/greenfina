"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface VerificationCodeInputProps {
  length?: number
  onComplete: (code: string) => void
  disabled?: boolean
}

export function VerificationCodeInput({ length = 6, onComplete, disabled = false }: VerificationCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const processInput = (e: React.ChangeEvent<HTMLInputElement>, slot: number) => {
    const value = e.target.value
    if (!/^[0-9]$/.test(value) && value !== "") return

    const newCode = [...code]
    newCode[slot] = value
    setCode(newCode)

    // Move to next input if current field is filled
    if (value !== "" && slot < length - 1) {
      inputs.current[slot + 1]?.focus()
    }

    // Check if all fields are filled
    if (newCode.every((val) => val !== "")) {
      onComplete(newCode.join(""))
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.key === "Backspace" && !code[slot] && slot > 0) {
      // Move to previous input if current field is empty and backspace is pressed
      const newCode = [...code]
      newCode[slot - 1] = ""
      setCode(newCode)
      inputs.current[slot - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a number and has the correct length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, length).split("")
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty slot or the last slot if all are filled
    const nextEmptyIndex = newCode.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1) {
      inputs.current[nextEmptyIndex]?.focus()
    } else {
      inputs.current[length - 1]?.focus()
      onComplete(newCode.join(""))
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {code.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={1}
          value={digit}
          ref={(el) => (inputs.current[idx] = el)}
          onChange={(e) => processInput(e, idx)}
          onKeyDown={(e) => onKeyDown(e, idx)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-10 h-12 text-center text-lg font-semibold rounded-md",
            "bg-white/5 border border-white/10 focus:border-green-400/50 text-white",
            "focus:outline-none focus:ring-2 focus:ring-green-400/30",
            "transition-all duration-200",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        />
      ))}
    </div>
  )
}
