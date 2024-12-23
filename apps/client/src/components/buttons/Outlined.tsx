import "../../assets/css/loader.css";

interface OutlinedButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  size?: keyof typeof sizeClasses;
  color?: string;
  loading?: boolean;
}

const sizeClasses = {
  small: "w-18 md:w-24 h-6 md:h-8 text-xs",
  medium: "w-24 md:w-36 h-8 md:h-10 text-base",
  large: "w-32 md:w-48 h-10 md:h-12 text-lg",
  extraLarge: "w-40 md:w-56 h-12 md:h-14 text-xl",
  full: "w-full h-12 md:h-14 text-xl",
};

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  text,
  size = "medium",
  color = "primary",
  loading = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={`${sizeClasses[size]} px-3 py-1 bg-transparent hover:bg-${color} rounded-full border border-primary border-solid text-base text-neutral-700 hover:text-neutral-100 font-bold focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors whitespace-nowrap overflow-hidden`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <div className="loader"></div> : text}
    </button>
  );
};

export default OutlinedButton;
