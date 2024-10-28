import React, { useState } from 'react'
import './WordsQuizContainer.css'
import WordsExplain from '../WordsExplain/WordsExplain'
import Words from '../Words/Words'

interface WordsQuizProps{
  endQuiz:(userWordsAnswers:string[][],wordsScore:number,levelsScore:number[],qNumber:number,finalScore:number)=>void,
  startIndex:number
}

export default function WordsQuiz({endQuiz , startIndex}:WordsQuizProps) {
    const [startQuiz , setStartQuiz] = useState(false)

    const startQuizHandler = () => {
        setStartQuiz(true)
    }
  return (
    <section className='words-container'>
      {startQuiz ? <Words startIndex={startIndex} endQuiz={endQuiz}/> :<WordsExplain startQuiz={startQuizHandler}/>}
    </section>
  )
}
