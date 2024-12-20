import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

type IndicatorProps = {
  isLastPage: boolean
  quizNo: number
  totalQuizCnt: number
  changeQuizNo: (quizNo: number) => void
}

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function Indicator({
  isLastPage,
  quizNo,
  totalQuizCnt,
  changeQuizNo,
}: IndicatorProps) {
  return (
    <div className={style.indicator}>
      <span
        style={isLastPage || quizNo > 1 ? { opacity: '1' } : { opacity: '.2' }}
        onClick={() => changeQuizNo(quizNo - 1)}
      >
        <div className={style.iconChevLeft}></div>
      </span>
      <span>
        {quizNo} / {totalQuizCnt}
      </span>
      <span onClick={() => changeQuizNo(quizNo + 1)}>
        <div className={style.iconChevRight}></div>
      </span>
    </div>
  )
}
