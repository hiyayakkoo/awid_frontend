'use client'

import { RetrieveProofs } from '@/components/retrieveProofs'

export default function Home({ params }: { params: { cid: string } }) {
  return (
    <main>
      <RetrieveProofs cid={params.cid} />
    </main>
  )
}
