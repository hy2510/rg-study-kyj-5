import quizTemplateCSS from '@stylesheets/quiz-template.module.scss'
import quizTemplateCSSMobile from '@stylesheets/mobile/quiz-template.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

const style = isMobile ? quizTemplateCSSMobile : quizTemplateCSS

type QuizBodyProps = {
  children: JSX.Element | JSX.Element[]
}

export default function QuizBody({ children }: QuizBodyProps) {
  return (
    <div className={`${style.quizBody} animate__animated animate__fadeIn`}>
      <div className={style.container}>{children}</div>
    </div>
  )
}
