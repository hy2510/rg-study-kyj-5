import writingActivityCSS from '@stylesheets/writing-activity.module.scss'
import writingActivityCSSMobile from '@stylesheets/mobile/writing-activity.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import BtnSubmit from '../BtnSubmit'

type GoNextStepBoxProps = {
  isSubmit: boolean
  wordMinCount: number
  wordMaxCount: number
  answerLength: number
  submitAnswer: () => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? writingActivityCSSMobile : writingActivityCSS

export default function GoNextStepBox({
  isSubmit,
  wordMinCount,
  wordMaxCount,
  answerLength,
  submitAnswer,
}: GoNextStepBoxProps) {
  return (
    <div className={style.goNextStepBox}>
      <div className={style.wordLimitIndicator}>
        <div className={style.limit}>
          • Word Limit: {wordMinCount}~{wordMaxCount}
        </div>
        <div className={style.words}>• The number of words: {answerLength}</div>
      </div>

      <BtnSubmit isSubmit={isSubmit} submitAnswer={submitAnswer} />
    </div>
  )
}
