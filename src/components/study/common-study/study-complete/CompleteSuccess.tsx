import '@stylesheets/character.scss'
import testResultCSS from '@stylesheets/test-result.module.scss'
import testResultCSSMobile from '@stylesheets/mobile/test-result.module.scss'
import { useTranslation } from 'react-i18next'

import useCharacter from '@hooks/study/useCharacter'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

type CompleteSuccessProps = {
  average: number
}

const style = isMobile ? testResultCSSMobile : testResultCSS

export default function CompleteSuccess({ average }: CompleteSuccessProps) {
  const { t } = useTranslation()
  const CHARACTER = useCharacter()

  return (
    <div className={style.quizEndingPass}>
      <div className={`${style.container} animate__animated animate__zoomIn`}>
        <div
          className={style.groupGoodJob}
          onClick={() => {
            location.replace('/uiz/library')
          }}
        >
          <div className={`${style.imgUnit} pass_${CHARACTER}`}>
            <div className={style.imgPointCoin}>
              <span className={style.txtAchivePoint}>
                {t('study.획득 포인트')}
              </span>
            </div>
          </div>
          <div className={style.imgGoodJobRibbon}></div>
          <div className={style.imgConfetti}></div>
        </div>
        <div className={style.groupScore}>
          <span>{average}</span>
          <span>/</span>
          <span>100</span>
        </div>
        <div className={style.txtMessage}>Points Achieved!</div>
        <div
          className={style.btnDelete}
          onClick={() => {
            location.replace('/uiz/library')
          }}
        ></div>
      </div>
    </div>
  )
}
