import React, { useEffect, useState } from 'react'
import './Words.css'
import wordsData from '../JSON/WordsQuiz.json'

interface WordsProps{
    endQuiz:(userWordsAnswers:string[][],wordsScore:number,levelsScore:number[],qNumber:number,finalScore:number)=>void,
    startIndex:number
}

export default function Words({endQuiz , startIndex = 0}:WordsProps) {
    const [dataIndex , setDataIndex] = useState(startIndex)
    const [wordsQuiz , setWordsQuiz] = useState(wordsData[dataIndex])
    const [showAlert , setShowAlert] = useState(false)
    const [wordsScore , setWordsScore] = useState(0)
    // const [stepCounter , setStepCounter] = useState(startIndex + 1)
    const [userWordsAnswers , setUserWordsAnswers] = useState<string[][]>([])
    const [showNextWord , setShowNextWord] = useState<boolean>(false)
    const [ nextQuestion , setNextQuestion] = useState(false)
    const [levelsScore , setLevelsScore] = useState<number[]>([])
    const [endStreek , setEndStreek] = useState(0)
    // const [levelsScore , setL]
    // const [userVisualAnswers , setUserVisualAnswers] = useState<string[][]>([])

    let clickSound = new Audio('/src/assets/Ding.MP3')

    useEffect(()=>{
        if(wordsData[dataIndex]){
            setWordsQuiz(wordsData[dataIndex])
        }
    },[dataIndex])

    useEffect(()=>{
        if(endStreek == 3){
            endQuiz(userWordsAnswers,wordsScore,levelsScore,wordsQuiz.qNumber,levelsScore[levelsScore.length - 1])
        }
      },[endStreek])


    function showNextQuestion (){
        setShowAlert(false)
        if(dataIndex != wordsData.length - 1){
            setTimeout(()=>{
                setDataIndex(prevIndex => prevIndex + 1)
                // setStepCounter(prevStep => prevStep + 1)
                setShowNextWord(true)
                setTimeout(()=>{
                    setShowNextWord(false)
                },1000)
            },500)
        }
    }

    function calcWordsScore(point:number = 0 , userAnswer:string[] | undefined = undefined){
        clickSound.play()
        setLevelsScore(prevScores => [...prevScores,point])
        setWordsScore(prevscore => prevscore + point)
        
        if(point == 0){
            setEndStreek(prevStreek => prevStreek + 1)
        }else{
            setEndStreek(0)
        }

        userAnswer && setUserWordsAnswers(prevAnswers => [...prevAnswers,userAnswer])
        
        if( point == 0 && wordsQuiz.finalAnswer || point == 1 && wordsQuiz.finalAnswer){
            setShowAlert(true)
        }else{
            if(dataIndex != wordsData.length - 1 ){
            setTimeout(()=>{
                    setDataIndex(prevIndex => prevIndex + 1)
                    // setStepCounter(prevStep => prevStep + 1)
                    setShowNextWord(true)
                    setTimeout(()=>{
                        setShowNextWord(false)
                    },1000)
                },500)
            }else{
                console.log('end')
                endQuiz(userWordsAnswers,wordsScore,levelsScore,wordsQuiz.qNumber , levelsScore[levelsScore.length - 1])
            }
        }
    }

    return (
        <>
            {showNextWord ? <div className='next-word-alert'>کلمه بعد</div> :(
                    <section className='words-quiz-container'>
                        <div className='word-container'>
                            <h1>سوال {wordsQuiz.qNumber}) {wordsQuiz.word}، {wordsQuiz.word} چیست؟</h1>
                        </div>
                        <div className='word-options-container'>
                            {wordsQuiz.answer0 && (
                                <>
                                    <div className='word-options'> 
                                        <ul>
                                            {wordsQuiz.answer0.map((word: string | string[], index) => {
                                                if (typeof word === 'string') {
                                                    return <li key={index}>{word}</li>;
                                                } else if (Array.isArray(word)) {
                                                    return (
                                                        <>
                                                            {word.map((orWord: string, newIndex: number) => (
                                                                <li style={{color:'orange'}} key={newIndex}>{orWord}</li>
                                                            ))}
                                                        </>
                                                    )
                                                }
                                            })}                    
                                        </ul>
                                        <button type="button" onClick={() => calcWordsScore(0 , wordsQuiz.answer0.flat())} className="op-btn2">0 نمره</button>
                                    </div>
                                </>
                            )}
                            <div className='word-options'> 
                                <ul>
                                    {wordsQuiz.answer1.map((word: string | string[], index) => {
                                        if (typeof word === 'string') {
                                            return <li key={index}>{word}</li>;
                                        } else if (Array.isArray(word)) {
                                            return (
                                                <>
                                                    {word.map((orWord: string, orIndex: number) => (
                                                        <li style={{color:'orange'}} key={orIndex}>{orWord}</li>
                                                    ))}
                                                </>
                                            )
                                        }
                                    })}
            
                                </ul>
                                <button type="button" onClick={() => calcWordsScore(1 , wordsQuiz.answer1.flat())} className="op-btn2">1 نمره</button>
                            </div>
                            <div className='word-options'> 
                                <ul>
                                    {wordsQuiz.answer2.map((word,index) => <li key={index}>{word}</li>)}
                                </ul>
                                <button type="button" onClick={() => calcWordsScore(2 , wordsQuiz.answer2.flat())} className="op-btn2">2 نمره</button>
                            </div>
                        </div>
                        <div className='alertContainer'>
                        {showAlert && 
                        <>
                            <p>لطفاً به شرکت کننده بگویید: «{wordsQuiz.finalAnswer}» <span style={{color:'white'}}>سپس روی دکمۀ «سؤال بعد» کلیک کنید.</span></p>
                            <div className='btn-container'>
                            <button type="button" onClick={() => showNextQuestion()} className='btn'>مرحله بعد</button>
                            </div>
                        </>}
                        </div>
                    </section>
            )}
        </>
  )
}
