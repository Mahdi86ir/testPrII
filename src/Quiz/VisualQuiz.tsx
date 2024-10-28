import React, { useEffect, useState } from 'react'
import './VisualQuiz.css'
import visualQuiz from '../JSON/visualQuestions.json'

interface QuizProps {
  saveAnswers:(answers:string[][],score:number,levesScore:number[],qNumber:number,finalScore:number)=>void,
  loadNextStep:()=>void,
  endVisual:()=>void
}

export default function Quiz({saveAnswers , loadNextStep , endVisual}:QuizProps) {
    const [dataIndex , setDataIndex] = useState(0)
    const [quizInfo , setQuizInfo] = useState(visualQuiz[dataIndex])
    const [count , setCount] = useState(1)
    const [visaulScore , setVisualScore] = useState(0)
    const [firstTry , setFirstTry] = useState(true)
    const [showAlert , setShowAlert] = useState(false)
    const [userVisualAnswers , setUserVisualAnswers] = useState<string[][]>([])
    const [levelsScore , setLevelsScore] = useState<number[]>([])
    const [endStreek , setEndStreek] = useState(0)


    const changeData = ():Promise<number> => {
      return new Promise((solved) => {
        setDataIndex(prevIndex => {
          let newIndex =  prevIndex + 1
          solved(newIndex)
          return newIndex
        })
      })
    }
    
    
    // useEffect(()=>{
    //   if(showAlert == false){
    //     setFirstTry(false)
    //   }
    // },[showAlert])
    
    async function loadNext(){
      setShowAlert(false)
      setFirstTry(false)
      let index:number = await changeData()
      if(index != visualQuiz.length){
        setQuizInfo(visualQuiz[index])
        setCount(prevCount => prevCount + 1)
      }
    }

    useEffect(()=>{
      if(endStreek == 3){
        saveAnswers(userVisualAnswers , visaulScore , levelsScore , count , levelsScore[levelsScore.length - 1] )
        endVisual()
      }
    },[endStreek])

    async function calcingVisualScore(point:number , answers:string[]) {
      setLevelsScore(prevScores => [...prevScores,point])
      setVisualScore(prevScore => prevScore + point)
      setUserVisualAnswers(prevAnswers => [...prevAnswers,answers])
      
      if(point == 0){
        setEndStreek(prevStreek => prevStreek + 1)
      }else{
        setEndStreek(0)
      }

      if(point == 0 && firstTry){
        setShowAlert(true)
        setFirstTry(false)
      }else{
        let index:number = await changeData()
        if(index != visualQuiz.length){
          setQuizInfo(visualQuiz[index])
          setCount(prevCount => prevCount + 1)
        }
      }
    }

    useEffect(()=>{
      if(dataIndex >= visualQuiz.length){
        saveAnswers(userVisualAnswers , visaulScore , levelsScore , count , levelsScore[levelsScore.length - 1])
        loadNextStep()
      }
    },[userVisualAnswers , dataIndex , saveAnswers , visaulScore])

  return (
    <section className='visual-container'>
        <h2>سوال {count}) این چیست؟</h2>
        <div className='image-container'>
          <img src={quizInfo.src} alt="" />
        </div>
        <div className='options'>
          <div className='option'>
            <ul>
              {quizInfo.answers0.map((answer , index) => <li key={index}>{answer}</li>)}
            </ul>
            <button type="button" onClick={() => calcingVisualScore(0 , quizInfo.answers0)} className="op-btn">0 نمره</button>
          </div>
          <div className='option'>
            <ul>
              {quizInfo.answers1.map((answer , index) => <li key={index}>{answer}</li>)}
            </ul>
            <button type="button" onClick={() => calcingVisualScore(1 , quizInfo.answers1)} className="op-btn">1 نمره</button>
          </div>
        </div>
        <div className='alertContainer'>
          {showAlert && 
          <>
            <p>«این یک گل است». سپس روی دکمۀ «سؤال بعد» کلیک کنید.</p>
            <div className='btn-container'>
              <button type="button" onClick={() => loadNext()} className='btn'>مرحله بعد</button>
            </div>
          </>}
        </div>
    </section>
  )
}
