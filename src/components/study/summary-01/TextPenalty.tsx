import { useEffect, useRef, useState } from 'react'

import summaryCSS from '@stylesheets/summary.module.scss'
import summaryCSSMobile from '@stylesheets/mobile/summary.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

type TextPenaltyProps = {
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
  word: string
  inputIndex: number
  currentInputIndex: number
  changeInputIndex: (index: number) => void
}

const style = isMobile ? summaryCSSMobile : summaryCSS

export default function TextPenalty({
  inputRefs,
  word,
  inputIndex,
  currentInputIndex,
  changeInputIndex,
}: TextPenaltyProps) {
  const [inputVal, setInputVal] = useState<string>('')
  const [currentInputWidth, setCurrentInputWidth] = useState<number>(0)
  const [inputWidth, setInputWidth] = useState<number>(0)
  const currenHintRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currenHintRef.current && currenHintRef.current.offsetWidth > 0) {
      setCurrentInputWidth(currenHintRef.current.offsetWidth)
    }

    if (hintRef.current && hintRef.current.offsetWidth > 0) {
      setInputWidth(hintRef.current.offsetWidth)
    }
  })

  useEffect(() => {
    if (currentInputIndex === inputIndex) {
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/
      const firstChar = word.substring(0, 1)

      if (reg.test(firstChar)) {
        setInputVal(firstChar)
      }
    }
  }, [currentInputIndex])

  /**
   * 키보드 타이핑 이벤트
   * @param e
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    let text: string = e.currentTarget.value
    const isMatch =
      word.substring(0, text.length) === text &&
      word.substring(0, text.length).length < word.length
        ? true
        : false

    if (text === word) {
      setInputVal(text)
      changeInputIndex(currentInputIndex + 1)
    } else {
      const reg = /^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/
      const char = word.replace(text, '')

      if (isMatch) {
        if (reg.test(char) && text !== '') {
          const addStr = char.match(reg)

          if (text + addStr === word) {
            setInputVal(word)
            changeInputIndex(currentInputIndex + 1)
          } else {
            setInputVal(text + addStr)
          }
        } else {
          setInputVal(text)
        }
      } else {
        setInputVal(text)
      }
    }
  }

  return (
    <>
      {/* input이 현재 input index보다 크면 */}
      {inputIndex > currentInputIndex && (
        <span className={`${style.reviewAnswer}`}>
          <span className={style.otherInput}>
            <input
              ref={(el: HTMLInputElement) =>
                (inputRefs.current[inputIndex] = el)
              }
              style={{ width: `${currentInputWidth + 4}px` }}
              disabled
            />
          </span>
          <div ref={currenHintRef} className={style.hintText}>
            {word}
          </div>
        </span>
      )}

      {/* input이 현재 input index와 같으면 */}
      {inputIndex === currentInputIndex && (
        <span className={`${style.reviewAnswer} ${style.currentOrder}`}>
          <span className={style.currentInput}>
            <input
              ref={(el: HTMLInputElement) =>
                (inputRefs.current[inputIndex] = el)
              }
              type="text"
              style={{ width: `${inputWidth + 4}px` }}
              value={inputVal}
              onChange={(e) => onChangeHandler(e)}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              inputMode="search"
              tabIndex={-1}
            />
          </span>
          <div ref={hintRef} className={style.hintText}>
            {word}
          </div>
        </span>
      )}

      {/* input이 현재 input index보다 작으면 */}
      {inputIndex < currentInputIndex && (
        <span className={`${style.reviewAnswer} ${style.correctAnswer}`}>
          {word}
        </span>
      )}
    </>
  )
}
