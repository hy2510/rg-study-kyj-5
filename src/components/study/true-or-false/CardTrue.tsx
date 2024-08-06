import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import trueOrFalseCSS from '@stylesheets/true-or-false.module.scss'
import trueOrFalseCSSMobile from '@stylesheets/mobile/true-or-false.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

type CardTrueProps = {
  isCorrect: boolean
  checkAnswer: (target: HTMLDivElement, selectedBtn: boolean) => Promise<void>
}

const isMobile = useDeviceDetection()

const style = isMobile ? trueOrFalseCSSMobile : trueOrFalseCSS

export default function CardTrue({ isCorrect, checkAnswer }: CardTrueProps) {
  const { bookInfo, studyInfo } = useContext(AppContext) as AppContextProps

  return (
    <div
      className={`${style.textCard} ${
        studyInfo.mode === 'Review' &&
        Number(bookInfo.Average) >= 70 &&
        isCorrect
          ? trueOrFalseCSS.correct
          : ''
      }`}
      onClick={(e) => checkAnswer(e.currentTarget, true)}
    >
      <div className={style.answer}>
        <div className={style.true}>O</div>
        <div className={style.answerText}>True</div>
      </div>
    </div>
  )
}
