import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import clozeTestCSS from '@stylesheets/cloze-test.module.scss'
import clozeTestCSSMobile from '@stylesheets/mobile/cloze-test.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { IClozeTest1Example } from '@interfaces/IClozeTest'

type ExampleProps = {
  index: number
  correctText: string
  example: IClozeTest1Example
  checkAnswer: (
    target: EventTarget & HTMLDivElement,
    selectedWord?: string,
  ) => Promise<void>
}

const isMobile = useDeviceDetection()

const style = isMobile ? clozeTestCSSMobile : clozeTestCSS

export default function Example({
  index,
  correctText,
  example,
  checkAnswer,
}: ExampleProps) {
  const { bookInfo, studyInfo } = useContext(AppContext) as AppContextProps

  return (
    <div
      className={`${style.textCard} 
      ${
        studyInfo.mode === 'Review' &&
        Number(bookInfo.Average) >= 70 &&
        example.Text === correctText
          ? style.correct
          : ''
      }`}
      onClick={(e) => checkAnswer(e.currentTarget, example.Text)}
    >
      <div className={style.cardNumber}>{Number(index + 1)}</div>
      <div className={style.awnserText}>{example.Text}</div>
    </div>
  )
}
