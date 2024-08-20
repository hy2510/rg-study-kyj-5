import stepIntroCSS from '@stylesheets/step-intro.module.scss'
import stepIntroCSSMobile from '@stylesheets/mobile/step-intro.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

type StepIntroRewritingProps = {
  currentSubmitCount: number
  maxSubmitCount: number
  goWritingActivity: () => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? stepIntroCSSMobile : stepIntroCSS

export default function StepIntroRewriting({
  currentSubmitCount,
  maxSubmitCount,
  goWritingActivity,
}: StepIntroRewritingProps) {
  return (
    <div className={style.revisionFreeIntro}>
      <div
        className={`${style.container} animate__animated animate__bounceInRight`}
      >
        <div className={style.stepOrder}>Step5</div>
        <div className={style.quizType}>Writing Activity(R)</div>
        <div className={style.comment}>글쓰기를 하시겠어요?</div>
        <div className={style.revisionBoard}>
          <div className={style.txtLabel}>남은 첨삭:</div>
          <div className={style.txtCount}>
            {maxSubmitCount - currentSubmitCount} / {maxSubmitCount}
          </div>
          <div className={style.txtLabel}>첨삭 완료:</div>
          <div className={style.txtCount}>{currentSubmitCount}</div>
        </div>
        <div style={{ display: 'flex' }} className={style.selectBox}>
          <div className={style.goButton} onClick={() => goWritingActivity()}>
            Go
          </div>
        </div>
      </div>
    </div>
  )
}
