/** @format */

// src/components/StudentsResults.js

import { useEffect, useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import { RxLapTimer } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../redux/features/auth/axiosAuthUtils'
import { getAllResults } from '../../redux/features/question/questionSlice'
import {
	formatTime,
	groupResultsByStudent,
	sortStudentResults,
} from './studentsResultsFunc'

const StudentsResults = () => {
	const dispatch = useDispatch()
	const { allResults, loading, error } = useSelector((state) => state.questions)
	const [sortedResults, setSortedResults] = useState([])
	const [sortBy, setSortBy] = useState('name')

	useEffect(() => {
		dispatch(getAllResults())
	}, [dispatch])

	useEffect(() => {
		if (allResults.items?.length > 0) {
			const groupedResults = groupResultsByStudent(allResults.items)
			const sorted = sortStudentResults(groupedResults, sortBy)
			setSortedResults(sorted)
		}
	}, [allResults.items, sortBy])

	const handleSort = (criteria) => {
		setSortBy(criteria)
	}

	const gaveAccess = () => {
		try {
			const response = axiosInstance.patch(
				'/api/collections/isAdminGaveAcces/records/vwyp7szt8vbrw90',
				{
					isIt: true,
				}
			)

			console.log('response', response)
		} catch (error) {
			console.log(error)
		}
	}

	if (loading) return <div className='text-center py-4'>Жүктөлүүдө...</div>
	if (error)
		return <div className='text-center py-4 text-red-600'>Ката: {error}</div>

	console.log('sortedResults', sortedResults)
	return (
		<div className='container mx-auto px-4 py-8'>
			<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
				Окуучулардын жыйынтыктары
			</h2>
			<div className='flex flex-wrap justify-center gap-2 mb-6'>
				<button
					onClick={() => handleSort('name')}
					className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
				>
					Аты ⬇️
				</button>
				<button
					onClick={() => handleSort('time')}
					className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
				>
					Убакыт ⬇️
				</button>
				<button
					onClick={() => handleSort('correct')}
					className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
				>
					Туура ⬇️
				</button>
				<button
					onClick={() => handleSort('wrong')}
					className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
				>
					Ката ⬇️
				</button>
				<button
					onClick={() => gaveAccess()}
					className='bg-purple-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
				>
					Уруксат берүү
				</button>
			</div>
			{sortedResults.length > 0 ? (
				<ul className='space-y-4'>
					{sortedResults.map((studentResult, index) => (
						<li
							key={studentResult.student_id}
							className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'
						>
							<div className='flex items-center justify-between mb-4'>
								<strong className='text-[14px] sm:text-lg md:text-xl  text-gray-800 flex items-center gap-2'>
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
							<div className='mt-4 bg-red-500 rounded-full h-2'>
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

export default StudentsResults
