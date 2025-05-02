"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Definindo uma interface customizada que substitui a prop 'value'
interface CustomProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'> {
  value: number
  valueMax: number
  color?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, valueMax, color="blue", ...props }, ref) => {
  // Calcula a porcentagem de progresso com base no valor atual e no máximo
  const percentage = valueMax > 0 ? (value / valueMax) * 100 : 0

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-500",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)`,backgroundColor: color }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
