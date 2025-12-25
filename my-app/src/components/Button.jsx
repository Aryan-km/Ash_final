export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200";
  const styles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
    secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200 active:bg-purple-300",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100",
    ghost: "text-purple-600 hover:bg-purple-50 active:bg-purple-100"
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant] || styles.primary} ${className}`}>
      {children}
    </button>
  );
}
