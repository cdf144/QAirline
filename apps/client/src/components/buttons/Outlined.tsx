interface OutlinedButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  size?: keyof typeof sizeClasses;
}

const sizeClasses = {
  small: "w-18 md:w-24 h-6 md:h-8 text-xs",
  medium: "w-24 md:w-36 h-8 md:h-10 text-base",
  large: "w-32 md:w-48 h-10 md:h-12 text-lg",
  extraLarge: "w-40 md:w-56 h-12 md:h-14 text-xl",
};

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  text,
  size = "medium",
}) => {
  return (
    <button
      className={`px-3 py-1 bg-transparent hover:bg-primary/75 rounded-full border border-primary text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors ${sizeClasses[size]}`}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
