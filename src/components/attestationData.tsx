import { FC, useEffect, useState } from 'react'

type Prop = {
  EOA: string
  ratingContract: string
}
export const AttestationData: FC<Prop> = ({ EOA, ratingContract }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (!EOA || !ratingContract) {
      return
    }
    console.log('EOA/Contract', EOA, ratingContract)
    // fetch()メソッドを使用してクエリを送信します
    fetch('https://sepolia.easscan.org/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query Attestations($where: AttestationWhereInput) {
        attestations(
          take: 1
          orderBy: { time: desc }
          where: $where
        ) {
          data
        }
      }
    `,
        variables: {
          where: {
            attester: { equals: ratingContract },
            data: { endsWith: EOA.replace(/^0x/, '') }
          }
        }
      })
    })
      .then((response) => response.json())
      .then((result) => setData(result.data.attestations ?? '---'))
  }, [EOA, ratingContract])

  if (!EOA || !ratingContract) {
    return <div>---</div>
  }

  if (!data.length) {
    return <div>Loading</div>
  }

  return (
    <div>
      {data.map((att, index) => {
        const typedData = data as unknown as string

        if (!data) {
          return <div key={index}>Loading</div>
        }
        return (
          <div key={index}>
            {parseInt(typedData.slice(0, 66), 16).toString()}
          </div>
        )
      })}
    </div>
  )
}
