"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxWithTextProps {
  mainText: string;
  subText?: string;
}

export function CheckboxWithText({ mainText, subText }: CheckboxWithTextProps) {
  return (
    <div className="flex space-x-2 items-top">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          { mainText }
        </label>
        { subText && 
          <p className="text-sm text-muted-foreground">
            { subText }
          </p>
        }
      </div>
    </div>
  )
}
