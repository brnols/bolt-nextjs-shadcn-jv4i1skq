"use client"

import type * as React from "react"

interface CircularProgressProps {
  n: string|number
  value: number
  valueMax: number
  size?: number
  strokeWidth?: number
  className?: string
  fontSize?: number | string
  progressColor?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  n,
  value,
  valueMax,
  size = 120,
  strokeWidth = 10,
  className = "",
  fontSize = "2xl",
  progressColor = "",
}) => {
  // Calcula a porcentagem, garantindo que valueMax não seja zero
  const percentage = valueMax > 0 ? (value / valueMax) * 100 : 0
  const clampedPercentage = Math.min(100, Math.max(0, percentage))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference

  // Função para determinar a classe de tamanho de fonte
  const getFontSizeClass = (size: number | string) => {
    if (typeof size === "number") {
      return `text-[${size}px]`
    }
    return `text-${size}`
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-muted-foreground"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={progressColor || "rgb(0, 0, 0)"}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.5s ease 0s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center font-semibold ${getFontSizeClass(fontSize)}`} style={{color: progressColor || "rgb(0, 0, 0)"}}>
        {n}
      </div>
    </div>
  )
}
