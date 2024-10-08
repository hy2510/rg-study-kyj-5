import listeningCSS from '@stylesheets/listening-activity.module.scss'
import listeningCSSMobile from '@stylesheets/mobile/listening-activity.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

import { IListeningActivity3Example } from '@interfaces/IListeningActivity'

type WrapperExample = {
  correctText: string
  exampleData: IListeningActivity3Example[]
  checkAnswer: (
    target: EventTarget & HTMLDivElement,
    selectedText: string,
  ) => Promise<void>
  onWrapperAnimationEndHandler: (
    e: React.AnimationEvent<HTMLDivElement>,
  ) => void
}

import Example from './Example'

const style = isMobile ? listeningCSSMobile : listeningCSS

export default function WrapperExample({
  correctText,
  exampleData,
  checkAnswer,
  onWrapperAnimationEndHandler,
}: WrapperExample) {
  return (
    <div className={style.listeningActivity3}>
      <div className={style.container}>
        {exampleData.map((example, index) => {
          return (
            <Example
              key={`example-0${index + 1}`}
              correctText={correctText}
              example={example}
              index={index}
              checkAnswer={checkAnswer}
              onWrapperAnimationEndHandler={onWrapperAnimationEndHandler}
            />
          )
        })}
      </div>
    </div>
  )
}
