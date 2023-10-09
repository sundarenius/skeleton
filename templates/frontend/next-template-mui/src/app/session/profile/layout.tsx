export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <p>hejsan från profile layout</p>
      {children}
    </div>
  )
}
