export default function PublicLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <main>{children}</main>
  );
}
