import React, { ChangeEvent, useState } from 'react'
import './Rules.css'


interface RulesProps {
    startQuiz:(age:number , hasMindProblem:boolean)=>void
}

function UserAge({startQuiz}:RulesProps){
    const [userAge, setUserAge] = useState(0)
    const [hasMindProblem , setHasMindProblem] = useState(false)
    const saveAge = (e:ChangeEvent<HTMLInputElement>)=>{
        setUserAge(+e.target.value)
    }

    return(
        <div className='age-container'>
            <h2>لطفا سن خود را وارد کنید</h2>
            <span>
                <input type="text" onChange={(e)=> saveAge(e)} />
            </span>
            <span>
              <input type="checkbox" onClick={()=>setHasMindProblem(true)} name="" id="" />
              <label>آیا کودک مشکوک به ناتوانی ذهنی است؟</label>
            </span>
            <span>
                <button type="button" onClick={() => startQuiz(userAge , hasMindProblem)} className='btn'>صفحه بعد</button>
            </span>
        </div>
    )
}


function Notes({startQuiz}:RulesProps){
    const [ lastStep , setLastStep] = useState(false)
    return(
        <>
            {lastStep ? <UserAge startQuiz={startQuiz}/> : (
                    <div className='notes'>
                        <p>دقت کنید هیچگونه راهنمایی در این بخش مجاز نیست. تنها باید به تصویر اشاره کنید و بپرسید : «این چیست؟». لطفاً حالات زیر را درنظر بگیرید:</p>
                        <ul>
                            <li>پاسخ‌های نزدیک: <br />اگر شرکت‌کننده پاسخی مناسب اما نزدیک به پاسخ اصلی ارائه دهد، مثلاً به جای «لیوان» بگوید «ظرف آب»، به او بگویید : «درست است اما چه اسم دیگری دارد؟» تا پاسخش شفاف شود. </li>
                            <li>پاسخ‌های کلی: <br />اگر شرکت کننده پاسخی مناسب اما کلی ارائه دهد، مثلاً به جای «گربه» بگوید «حیوان» ، به او بگویید: «درست است اما چه نوع حیوانی؟» تا پاسخش شفاف شود. </li>
                            <li>پاسخ‌های عملکرد: <br />به جای اسم چیزی که در تصویر می‌بیند، عمکلرد آن را توضیح دهد؛ مثلاً به جای «لیوان» بگوید «با آن آب می‌خوریم»، به او بگویید: «درست است اما اسمش چیست؟» تا پاسخش را شفاف کند.</li>
                            <li>نمایش با صورت و بدن: <br />به جای بیان اسم تصویر، آن را با بدن و صورت نشان دهد. مثلاً به جای گفتن «لیوان»، وانمود کند که دارد آب می‌خورد به او بگویید: «درست است اما اسمش چیست؟» تا پاسخش را شفاف کند.</li>
                            <li>پاسخ‌های شخصی: <br />به جای بیان اسم، پاسخ‌هایی مثل اینکه «من یکی از اینها دارم» یا «مادرم برایم خریده‌ است» و یا اسامی خاص و داستانی بیان کند، بگویید: «درست است اما اسمش چیست؟» تا پاسخش را شفاف کند.</li>
                        </ul>
                        <p style={{color:"orange"}}>درصورتی که در پنج حالت بالا، توضیح اضافه ندهد و پاسخش را شفاف نکند، برای او نمرۀ 0 ثبت کنید.</p>
                        <p>برای شروع بخش تصویری آزمون، روی دکمۀ زیر کلیک کنید</p>
                        <span>
                            <button type="button" onClick={()=> setLastStep(true) } className='btn'>شروع آزمون</button>
                        </span>
                    </div>
            )}
        </>
    )
}

function QuizRules({startQuiz}:RulesProps){

    const [nextStep , setNextStep] = useState(false)

    return (
        <>
            {nextStep ? <Notes startQuiz={startQuiz}/> : (<div className='rules'>
                <h2>لطفاً قواعد اجرای بخش تصویری آزمون را با دقت مطالعه کنید:</h2>
                <p>در این بخش، پاسخ شرکت کننده بر اساس درست یا غلط بودن، 1 یا 0 نمره می‌گیرد. برای هر سؤال همانند نمونۀ زیر، <br />
                دو کادر پاسخ در زیر تصویر محرک وجود دارد. شما باید پاسخ‌ شرکت‌کننده را با پاسخ‌های ارائه شده در این کادرها <br />
                مقایسه کنید و بر اساس آنها، نمرۀ شرکت کننده را مشخص کنید. </p>
                <span>
                    <button type="button" onClick={()=>setNextStep(true)} className='btn'>صفحه بعد</button>
                </span>
            </div>) }
        </>
    )
}



export default function Rules({startQuiz}:RulesProps) {
    
    const [showRules , setShowRules] = useState<boolean>(false)
    
    const changeState = () => {
        setShowRules(true)
    }

    return (
        <section className='explain-container'>
            {showRules ? <QuizRules startQuiz={startQuiz}/> : (
                <div className='helper'>
                    <h2>راهنمای آزمون</h2>
                    <p>در این آزمون ابتدا تعدادی تصویر و بعد تعدادی کلمه ارائه می‌شود که آزمون‌دهنده باید معنای آن‌ها را بیان کند. <br /> برای مشاهدۀ راهنمای بخش تصویری آزمون، روی دکمۀ «صفحۀ بعد» کلیک کنید. </p>
                    <span>
                        <button type="button" onClick={changeState} className='btn'>صفحه بعد</button>
                    </span>
                </div>
            )}
        </section>
    )
}
