import vocabularyCSS from '@stylesheets/vocabulary-test.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-test.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { IVocabulary4Example } from '@interfaces/IVocabulary'
type WrapperExampleProps = {
  correctText: string
  exampleData: IVocabulary4Example[]
  checkAnswer: (
    target: EventTarget & HTMLDivElement,
    selectedText: string,
  ) => Promise<void>
  onExampleAnimationEndHandler: (target: EventTarget & HTMLDivElement) => void
}

import Example from './Example'

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function WrapperExample({
  correctText,
  exampleData,
  checkAnswer,
  onExampleAnimationEndHandler,
}: WrapperExampleProps) {
  return (
    <div className={style.answers}>
      {exampleData.map((example, i) => {
        return (
          <Example
            index={i}
            correctText={correctText}
            exampleData={example}
            checkAnswer={checkAnswer}
            onExampleAnimationEndHandler={onExampleAnimationEndHandler}
          />
        )
      })}
    </div>
  )
}
