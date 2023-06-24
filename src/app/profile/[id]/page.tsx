'use client'

import { Profile } from '@/components/profile'

export default function Home({ params }: { params: { id: string } }) {
  return (
    <main>
      <Profile id={params.id} />
    </main>
  )
}
