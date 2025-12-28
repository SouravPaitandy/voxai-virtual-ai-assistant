/* eslint-disable react/prop-types */
// Atomic Card Component

export function Card({ className = "", children, hover = true, ...props }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 
        bg-white/5 backdrop-blur-xl
        transition-all duration-500 ease-out
        dark:bg-black/40 dark:border-white/10 shadow-lg
        group
        ${
          hover
            ? "hover:bg-white/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
