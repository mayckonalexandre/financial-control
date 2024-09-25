export function Modal({ children }: { children: JSX.Element }) {
  return (
    <section className="fixed top-0 left-0 z-30 w-full h-full bg-black bg-opacity-50 text-white flex items-center justify-end backdrop-blur-sm">
      {children}
    </section>
  );
}
