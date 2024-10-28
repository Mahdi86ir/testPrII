import React from 'react'

interface EndProps{
  levelsScores:number[],
  totalScores:number,
  finalLevel:number,
  finalTrueLevel:number,
}

export default function End({levelsScores,totalScores,finalLevel,finalTrueLevel}:EndProps) {
  return (
    <div>
      <div>
        <p>levelsScore:{levelsScores.map((item,index) => <li key={index+1}>{item}</li>)}</p>
        <p>totalScore:{totalScores}</p>
        <p>finalLevel:{finalLevel}</p>
        <p>finalTrueLevel:{finalTrueLevel}</p>
      </div>
    </div>
  )
}
