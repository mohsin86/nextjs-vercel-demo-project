export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      {children}
      <footer></footer>
    </>
  );
}