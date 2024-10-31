import { useEffect, useState } from 'react'
import VisualQuiz from '../Quiz/VisualQuiz'
import WordsQuizContainer from '../WordsQuizContainer/WordsQuizContainer'
import End from '../End/End'

interface QuizContainerProps{
    age:number,
    hasProblem:boolean
}

export default function QuizContainer({age,hasProblem}:QuizContainerProps) {
    const [nextQuiz , setNextQuiz] = useState(false)
    const [visualAnswers , setVisualAnswers] = useState<string[][]>()
    const [visaulScore , setVisualScore] = useState(0)
    const [wordScore , setWordScore] = useState(0)
    const [wordsAnswers , setWordsAnswers] = useState<string[][]>() 
    const [end , setEnd] = useState(false)
    const [levelsScores , setLevelsScores] = useState<number[]>([]) // important !
    const [totalScores , setTotalScores] = useState(0) // important !
    const [finalLevel , setFinalLevel] = useState<number>(0) // important !
    const [finalTrueLevel , setFinalTrueLevel] = useState(0) // important !
    const [startIndex , setStartIndex] = useState(0)

    useEffect(()=>{
        if(age >= 8 && age <= 11 && !hasProblem){
            setNextQuiz(true)
            setStartIndex(0)
        }else if(age >= 13 && age <=16  && !hasProblem){
            setNextQuiz(true)
            setStartIndex(4)
        }
    },[])

    useEffect(()=>{
        if(end){
            setTotalScores(wordScore + visaulScore)
        }
    },[visaulScore,wordScore])


    const saveUserVisualAnswers = (userAnswers:string[][],score:number,levesScore:number[],qNumber:number , finalScore:number) => {
        setLevelsScores(prevScores => [...prevScores,...levesScore])
        setVisualAnswers(userAnswers)
        setVisualScore(score)
        setFinalLevel(qNumber)
        setFinalTrueLevel(finalScore)
    }
    const endVisual = () => {
        setEnd(true)
        console.log(levelsScores)
        console.log(wordsAnswers)
        console.log(visualAnswers)
        console.log(totalScores)
        console.log(finalLevel)
        console.log(finalTrueLevel)
    }
    
    
    
    const setingWordEndQuiz = (userAnswers:string[][],score:number , levesScore:number[] , qNumber:number , finalScore:number) => {
        setLevelsScores(prevScores => [...prevScores,...levesScore])
        setWordScore(score)
        setWordsAnswers(userAnswers)
        setFinalLevel(qNumber)
        setFinalTrueLevel(finalScore)
        setEnd(true)
    }
    

    const loadNextStep = () =>{
        setNextQuiz(true)
    }
    return (
        <>
            {end ? <End/> : nextQuiz ? <WordsQuizContainer startIndex={startIndex} endQuiz={setingWordEndQuiz}/> : <VisualQuiz loadNextStep={loadNextStep} endVisual={endVisual} saveAnswers={saveUserVisualAnswers}/>}
        </>
  )
}
