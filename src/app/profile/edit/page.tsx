import { ProfileEdit } from '@/components/profileEdit'

export default function Home({ params }: { params: { cid: string } }) {
  return (
    <main>
      <ProfileEdit />
    </main>
  )
}
