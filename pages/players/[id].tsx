import { useRouter } from 'next/router'
import React, { FC } from 'react'

export const Page: FC = () => {
  const router = useRouter()
  const { player } = router.query
  return <div>Players page {player}</div>
}

export default Page
