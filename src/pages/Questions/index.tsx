/** @format */

import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useDispatch, useSelector } from 'react-redux'
import {
 getQuestions,
 submitAnswer,
} from '../../redux/features/question/questionSlice'
import { useTimer } from './useTimer'

export default function Dashboard() {
 const variants = ['А', 'Б', 'В', 'Г']
 const auth = useAuthUser()
 const dispatch = useDispatch()
 const { questions, loading, error } = useSelector((state) => state.questions)
 const [questionNumber, setQuestionNumber] = useState(1)
 const [selectedAnswer, setSelectedAnswer] = useState('')
 const { timeLeft, startTimer, stopTimer } = useTimer(60)
 const [isFinished, setIsFinished] = useState(false)

//  console.log('questions.isCorrect', questions.isCorrect)
 // 60 seconds timer
 useEffect(() => {
  dispatch(getQuestions())
  setIsFinished(localStorage.getItem('isFinished') === 'true')
 }, [dispatch])

 useEffect(() => {
  if (questions.length > 0) {
   startTimer()
  }
 }, [questions, questionNumber])

 useEffect(() => {
  if (timeLeft === 0) {
   handleNextQuestion()
  }
 }, [timeLeft])

 const handleAnswerSelect = (answer) => {
  setSelectedAnswer(answer)
 }

 const checkAnswer = (answer) => {
  const currentQuestion = questions[questionNumber - 1]
  const isCorrect = currentQuestion.answer === currentQuestion[answer]

  console.log('currentQuestion[anser]', currentQuestion[answer])
  console.log('currentQuestion.answer', currentQuestion.answer)
  console.log('isCorrect', isCorrect)
  dispatch(
   submitAnswer({
    student_id: auth.userId,
    questionId: currentQuestion.id,
    answer: answer,
    isCorrect: isCorrect,
    timeSpent: 60 - timeLeft, // Convert to milliseconds
    question: currentQuestion,
    student_name: auth.student_name,
   })
  )
 }

 const handleNextQuestion = () => {
  if (selectedAnswer) {
   checkAnswer(selectedAnswer)
  }

  if (questionNumber < questions.length) {
   setQuestionNumber(questionNumber + 1)
   setSelectedAnswer('')
   startTimer()
  } else {
   // Тест бүттү
   alert('Quiz completed!')
   localStorage.setItem('isFinished', 'true')
   setTimeout(() => {
    window.location.reload()
   }, 3000)
  }
 }
 if (isFinished)
  return <p>Тестти тапшыргансыз кийинки окуучуга орун бериңиз!</p>
 if (loading) return <p>Жүктөлүүдө...</p>
 if (error) return <p>Ката : {error}</p>
 if (questions.length === 0) return <p>No questions available.</p>

 const currentQuestion = questions[questionNumber - 1]
 return (
  <div className='p-4'>
   <h1 className='text-2xl mb-4'>
    Кош келдиңиз{' '}
    <span className='font-bold text-orange-500 '>{auth.student_name}</span>!
   </h1>

   <div className='mb-4'>
    <h2 className='text-xl font-bold'>{currentQuestion.question_title}</h2>
    <p className={`text-lg ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
     Калган убакыт : {timeLeft} cекунд
    </p>
   </div>
   <div className='space-y-2'>
    <p>{questions[questionNumber - 1].question}</p>
    <div className='flex gap-4'>
     {['a', 'b', 'c', 'd'].map((option, idx) => (
      <label
       key={option}
       className='flex items-center space-x-2 border-2 border-sky-500 p-2 max-w-96 w-full'
      >
       <input
        type='radio'
        name='answer'
        value={option}
        checked={selectedAnswer === option}
        onChange={() => handleAnswerSelect(option)}
        className='form-radio'
       />
       <span>
        {variants[idx]}) {currentQuestion[option]}
       </span>
      </label>
     ))}
    </div>
   </div>
   <button
    onClick={handleNextQuestion}
    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
   >
    Кийинки суроо
   </button>
  </div>
 )
}