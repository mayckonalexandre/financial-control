export function Modal({
  children,
  className,
}: {
  children: JSX.Element;
  className?: string;
}) {
  return (
    <section
      className={`fixed top-0 left-0 z-30 w-full h-screen bg-black bg-opacity-50 text-white flex items-center backdrop-blur-sm ${className}`}
    >
      {children}
    </section>
  );
}
