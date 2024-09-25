type TitleProps = {
  message: string;
  className?: string;
};

export function Title({ message, className }: TitleProps) {
  return (
    <h1
      className={`font-semibold text-2xl ${className}`}
    >
      {message}
    </h1>
  );
}
