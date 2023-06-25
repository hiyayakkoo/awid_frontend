import { SkeletonText } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

type Prop = {
  EOA: string
  ratingContract: string
  fallbackValue?: string
}
export const AttestationData: FC<Prop> = ({
  EOA,
  ratingContract,
  fallbackValue
}) => {
  const [data, setData] = useState<string>()
  const [fall, setFall] = useState<boolean>(false)
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
      .then((result) => {
        console.log(result)
        if (result.data.attestations.length == 0) {
          setData('0')
          setFall(true)
        } else {
          setData(result.data.attestations as unknown as string)
        }
      })
  }, [EOA, ratingContract])

  if (!EOA || !ratingContract) {
    return <div>---</div>
  }

  if (!data) {
    return (
      <SkeletonText
        noOfLines={1}
        h="45px"
        w="10"
        display="flex"
        alignItems="center"
      />
    )
  }

  return (
    <div>
      <div>
        {fall
          ? !!fallbackValue
            ? fallbackValue
            : parseInt(data.slice(0, 66), 16).toString()
          : parseInt(data.slice(0, 66), 16).toString()}
      </div>
    </div>
  )
}
