import {useState} from 'react'
import Rules from '../Rules/Rules'
import './Container.css'
import QuizContainer from '../QuizContainer/QuizContainer'

export default function Container() {
    const [explain , setExplain] = useState<boolean>(true)
    const [age , setAge] = useState(0)
    const [hasProblem , setHasProblem] = useState(false)
    const startQuiz = (userAge:number , hasMindProblem:boolean) => {
        setExplain(false)
        setAge(userAge)
        setHasProblem(hasMindProblem)
    }


    return (
        <main>
            {explain ? <Rules startQuiz={startQuiz}/> : <QuizContainer hasProblem={hasProblem}  age={age}/>} 
        </main>
  )
}
