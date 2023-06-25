import { Providers } from '@/components/Providers'
import { Lato } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Autonomous World ID',
  description:
    'Integrate game identities with privacy and Show off your skills with attestation',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: 'Autonomous World ID',
    description:
      'Integrate game identities with privacy and Show off your skills with attestation',
    image: ['https://awid-frontend.vercel.app/images/cover.png']
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
