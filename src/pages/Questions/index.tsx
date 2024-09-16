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
    
    dispatch(
      submitAnswer({
        student_id: auth.userId,
        questionId: currentQuestion.id,
        answer: answer,
        isCorrect: isCorrect,
        timeSpent: 60 - timeLeft,
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
      alert('Quiz completed!')
      localStorage.setItem('isFinished', 'true')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }

  if (isFinished)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-center p-4 bg-white shadow rounded">
          Тестти тапшыргансыз кийинки окуучуга орун бериңиз!
        </p>
      </div>
    )

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl">Жүктөлүүдө...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl text-red-500">Ката : {error}</p>
    </div>
  )

  if (questions.length === 0) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl">No questions available.</p>
    </div>
  )

  const currentQuestion = questions[questionNumber - 1]

  return (
    <div className='max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl md:text-3xl mb-4 text-center'>
        Кош келдиңиз{' '}
        <span className='font-bold text-orange-500'>{auth.student_name}</span>!
      </h1>
      
      <div className='mb-6 bg-white shadow rounded p-4'>
        <h2 className='text-xl font-bold mb-2'>{currentQuestion.question_title}</h2>
        <p className={`text-lg ${timeLeft <= 10 ? 'text-red-500' : ''} font-semibold`}>
          Калган убакыт : {timeLeft} cекунд
        </p>
      </div>

      <div className='space-y-4 bg-white shadow rounded p-4 mb-6'>
        <p className="text-lg mb-4">{questions[questionNumber - 1].question}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {['a', 'b', 'c', 'd'].map((option, idx) => (
            <label
              key={option}
              className={`flex items-center space-x-2 border-2 p-3 rounded cursor-pointer transition-colors duration-200
                ${selectedAnswer === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-300'}`}
            >
              <input
                type='radio'
                name='answer'
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                className='form-radio text-blue-600'
              />
              <span className="text-lg">
                {variants[idx]}) {currentQuestion[option]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextQuestion}
        className='w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold'
      >
        Кийинки суроо
      </button>
    </div>
  )
}