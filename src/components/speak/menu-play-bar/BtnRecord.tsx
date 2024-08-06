import { useEffect, useState } from 'react'

import SpeakCSS from '@stylesheets/speak.module.scss'

type BtnRecordProps = {
  startRecord: () => void
}

export default function BtnRecord({ startRecord }: BtnRecordProps) {
  const [isDelay, setIsDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      !isDelay ? setIsDelay(true) : setIsDelay(false)
    }, 3000)
  }, [])

  return (
    <button
      className={`${SpeakCSS.btnSpeakPlay} ${isDelay && 'heartbeat'}`}
      onClick={() => {
        setIsDelay(false)
        startRecord()
      }}
    >
      <div className={`${SpeakCSS.icon} ${SpeakCSS.record}`}></div>
      <div className={SpeakCSS.txtWord}>Speak!</div>
    </button>
  )
}
