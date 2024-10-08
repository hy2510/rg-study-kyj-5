import readingComprehensionCSS from '@stylesheets/reading-comprehension.module.scss'
import readingComprehensionCSSMobile from '@stylesheets/mobile/reading-comprehension.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

import { IReadingComprehension3Example } from '@interfaces/IReadingComprehension'
import { MultiPlayStateProps } from '@pages/study/ReadingComprehension3'

type WrapperSectionRightProps = {
  multiPlayState: MultiPlayStateProps
  question: string
  correctText: string
  exampleData: IReadingComprehension3Example[]
  playSentence: (index: number) => void
  checkAnswer: (
    target: React.RefObject<HTMLDivElement>,
    index: number,
  ) => Promise<void>
  onAnimationEndHandler: (e: React.AnimationEvent<HTMLDivElement>) => void
}

import Gap from '../common-study/Gap'
import WrapperExample from './WrapperExample'

const style = isMobile ? readingComprehensionCSSMobile : readingComprehensionCSS

export default function WrapperSectionRight({
  multiPlayState,
  question,
  correctText,
  exampleData,
  playSentence,
  checkAnswer,
  onAnimationEndHandler,
}: WrapperSectionRightProps) {
  return (
    <div className={style.answers}>
      {isMobile ? <></> : <Gap height={10} />}

      {/* 책의 레벨이 KC인 경우에는 문장을 보여주지 않음 */}
      {question && (
        <>
          <div className={style.questionText}>{question}</div>

          {isMobile ? <></> : <Gap height={10} />}
        </>
      )}
      {/* 보기 */}
      <WrapperExample
        multiPlayState={multiPlayState}
        correctText={correctText}
        exampleData={exampleData}
        playSentence={playSentence}
        checkAnswer={checkAnswer}
        onAnimationEndHandler={onAnimationEndHandler}
      />
    </div>
  )
}
