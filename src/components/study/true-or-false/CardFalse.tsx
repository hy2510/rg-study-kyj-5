import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import trueOrFalseCSS from '@stylesheets/true-or-false.module.scss'
import trueOrFalseCSSMobile from '@stylesheets/mobile/true-or-false.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

type CardFalseProps = {
  isCorrect: boolean
  checkAnswer: (target: HTMLDivElement, selectedBtn: boolean) => Promise<void>
}

const isMobile = useDeviceDetection()

const style = isMobile ? trueOrFalseCSSMobile : trueOrFalseCSS

export default function CardFalse({ isCorrect, checkAnswer }: CardFalseProps) {
  const { bookInfo, studyInfo } = useContext(AppContext) as AppContextProps

  return (
    <div
      className={`${style.textCard}  ${
        studyInfo.mode === 'Review' &&
        Number(bookInfo.Average) >= 70 &&
        !isCorrect
          ? trueOrFalseCSS.correct
          : ''
      }`}
      onClick={(e) => checkAnswer(e.currentTarget, false)}
    >
      <div className={style.answer}>
        <div className={style.false}>X</div>
        <div className={style.answerText}>False</div>
      </div>
    </div>
  )
}
