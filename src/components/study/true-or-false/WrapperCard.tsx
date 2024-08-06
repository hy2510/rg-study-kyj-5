import trueOrFalseCSS from '@stylesheets/true-or-false.module.scss'
import trueOrFalseCSSMobile from '@stylesheets/mobile/true-or-false.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

type WrapperCardProps = {
  isCorrect: boolean
  checkAnswer: (target: HTMLDivElement, selectedBtn: boolean) => Promise<void>
}

import CardTrue from './CardTrue'
import CardFalse from './CardFalse'

const isMobile = useDeviceDetection()

const style = isMobile ? trueOrFalseCSSMobile : trueOrFalseCSS

export default function WrapperCard({
  isCorrect,
  checkAnswer,
}: WrapperCardProps) {
  return (
    <div className={style.answers}>
      <CardTrue isCorrect={isCorrect} checkAnswer={checkAnswer} />

      <CardFalse isCorrect={isCorrect} checkAnswer={checkAnswer} />
    </div>
  )
}
