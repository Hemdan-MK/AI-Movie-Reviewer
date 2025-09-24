import * as React from "react"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-600 text-white hover:bg-orange-700",
        secondary:
          "border-transparent bg-slate-700 text-white hover:bg-slate-600",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline: "text-white border-slate-600",
        gradient: "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white",
        glass: "border-white/20 bg-white/10 backdrop-blur-sm text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, children, ...props }) {
  return (
    <motion.div
      className={cn(badgeVariants({ variant }), className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Badge, badgeVariants }
