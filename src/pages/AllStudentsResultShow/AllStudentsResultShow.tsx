/** @format */

import { useEffect, useRef, useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import { RxLapTimer } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../redux/features/auth/axiosAuthUtils'
import { getAllResults } from '../../redux/features/question/questionSlice'
import {
	formatTime,
	groupResultsByStudent,
	sortResultsByCorrectAnswersAndTime,
	sortStudentResults,
} from '../admin/studentsResultsFunc'

const AllStudentsResultsShow = () => {
	const dispatch = useDispatch()
	const { allResults, loading, error } = useSelector((state) => state.questions)
	const [sortedResults, setSortedResults] = useState([])
	const [sortBy, setSortBy] = useState('correctAndTime')
	const [searchTerm, setSearchTerm] = useState('')
	const searchInputRef = useRef(null)
	const [isAdminGaveAccess, setIsAdminGaveAccess] = useState(false)
	const [timeOfResults , setTimeOfResults] = useState("")

	useEffect(() => {
		dispatch(getAllResults())
	}, [dispatch])

	useEffect(() => {
		const checkAccess = async () => {
			try {
				const response = await axiosInstance.get(
					'/api/collections/isAdminGaveAcces/records'
				)

				setIsAdminGaveAccess(response.data.items[0].isIt)
				setTimeOfResults(response.data.items[0].time)
				
			} catch (error) {
				console.log(error)
			}
		}
		checkAccess()
	}, [])

	useEffect(() => {
		if (allResults.items?.length > 0) {
			let sorted
			if (sortBy === 'correctAndTime') {
				sorted = sortResultsByCorrectAnswersAndTime(allResults.items)
			} else {
				const groupedResults = groupResultsByStudent(allResults.items)
				sorted = sortStudentResults(groupedResults, sortBy)
			}
			setSortedResults(sorted)
		}
	}, [allResults.items, sortBy])

	const handleSort = (criteria) => {
		setSortBy(criteria)
	}

	const handleSearch = (e) => {
		setSearchTerm(e.target.value)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const matchedStudent = sortedResults.find((student) =>
				student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
			)
			if (matchedStudent) {
				const studentElement = document.getElementById(
					`student-${matchedStudent.student_id}`
				)
				if (studentElement) {
					studentElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
					studentElement.classList.add('bg-yellow-100')
					setTimeout(() => {
						studentElement.classList.remove('bg-yellow-100')
					}, 2000)
				}
			} else {
				alert('Окуучу табылган жок')
			}
		}
	}

	if (loading) return <div className='text-center py-4'>Жүктөлүүдө...</div>
	if(!isAdminGaveAccess) return <div className='text-center py-4'>Жыйынтык чыга элек саат {timeOfResults.slice(11,16)} дө кириңиз</div> 
	if (error)
		return <div className='text-center py-4 text-red-600'>Ката: {error}</div>

	return (
		<div className='container mx-auto px-4 py-8'>
			<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
				Окуучулардын жыйынтыктары
			</h2>

			<div className='mb-6'>
				<input
					type='search'
					placeholder='Окуучунун атын издөө...'
					value={searchTerm}
					onChange={handleSearch}
					onKeyDown={handleKeyDown}
					ref={searchInputRef}
					className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{sortedResults.length > 0 ? (
				<ul className='space-y-4'>
					{sortedResults.map((studentResult, index) => (
						<li
							key={studentResult.student_id}
							id={`student-${studentResult.student_id}`}
							className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'
						>
							<div className='flex items-center justify-between mb-4'>
								<strong className='text-[14px] sm:text-lg md:text-xl text-gray-800 flex items-center gap-2'>
									{index + 1}. <IoPerson />: {studentResult.student_name}
								</strong>
								<span className='text-sm text-gray-500 flex items-center gap-2'>
									<RxLapTimer />: {formatTime(studentResult.totalTime)}
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<div className='flex items-center'>
									<span className='text-green-500 font-bold mr-2'>
										{studentResult.correctAnswers}
									</span>
									<span className='text-sm text-gray-600'>Туура жооптор</span>
								</div>
								<div className='flex items-center'>
									<span className='text-red-500 font-bold mr-2'>
										{studentResult.wrongAnswers}
									</span>
									<span className='text-sm text-gray-600'>Ката жооптор</span>
								</div>
							</div>
							<div className='mt-4 bg-gray-200 rounded-full h-2'>
								<div
									className='bg-green-500 h-2 rounded-full'
									style={{
										width: `${
											(studentResult.correctAnswers /
												(studentResult.correctAnswers +
													studentResult.wrongAnswers)) *
											100
										}%`,
									}}
								></div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className='text-center text-gray-600'>Жыйынтык табылган жок.</p>
			)}
		</div>
	)
}

export default AllStudentsResultsShow
