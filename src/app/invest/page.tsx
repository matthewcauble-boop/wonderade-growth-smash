export default function InvestPage() {
  return (
    <iframe
      src="/invest/index.html"
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="Wonderade Investor Deck"
    />
  )
}

export const metadata = {
  title: 'Wonderade — Investor Deck',
  description: 'Wonderade seed round overview for prospective investors.',
  robots: 'noindex, nofollow',
}
