export const metadata = { title: 'player' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 32 }}>{children}</body>
    </html>
  );
}
