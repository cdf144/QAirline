interface FilledPrimaryButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  size?: keyof typeof sizeClasses;
  color?: string;
  textColor?: string;
}

const sizeClasses = {
  small: "w-18 md:w-24 h-6 md:h-8 text-xs",
  medium: "w-24 md:w-36 h-8 md:h-10 text-base",
  large: "w-32 md:w-48 h-10 md:h-12 text-lg",
  extraLarge: "w-40 md:w-56 h-12 md:h-14 text-xl",
};

const FilledButton: React.FC<FilledPrimaryButtonProps> = ({
  text,
  size = "medium",
  color = "primary",
  textColor = "white",
}) => {
  return (
    <button
      className={`${sizeClasses[size]} px-3 py-1 bg-${color} hover:bg-${color}/75 rounded-full border border-none hover:border-solid text-base text-${textColor} font-bold focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors whitespace-nowrap overflow-hidden `}
    >
      {text}
    </button>
  );
};

export default FilledButton;
