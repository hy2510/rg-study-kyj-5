import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import vocabularyCSS from '@stylesheets/vocabulary-test.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-test.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

type ExampleProps = {
  index: number
  text: string
  correctText: string
  checkAnswer: (
    target?: (EventTarget & HTMLDivElement) | undefined,
    selectedAnswer?: string,
  ) => Promise<void>
  onAnimationEndHandler: (e: React.AnimationEvent<HTMLDivElement>) => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function Example({
  index,
  text,
  correctText,
  checkAnswer,
  onAnimationEndHandler,
}: ExampleProps) {
  const { bookInfo, studyInfo } = useContext(AppContext) as AppContextProps

  return (
    <div
      className={`${style.textCard} 
      ${
        studyInfo.mode === 'Review' &&
        Number(bookInfo.Average) >= 70 &&
        text === correctText
          ? style.correct
          : ''
      }
      animate__animated`}
      onClick={(e) => checkAnswer(e.currentTarget, text)}
      onAnimationEnd={(e) => onAnimationEndHandler(e)}
    >
      <div className={style.cardNumber}>{index}</div>
      <div className={style.awnserText}>{text}</div>
    </div>
  )
}
