import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllResults } from '../../redux/features/question/questionSlice' // Adjust the import path as necessary

const StudentsResults = () => {
	const dispatch = useDispatch()
	const { allResults, loading, error } = useSelector((state) => state.questions) // Ensure this matches your Redux state structure

	useEffect(() => {
		dispatch(getAllResults())
	}, [dispatch])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	return (
		<div>
			<h1>Students Results</h1>
			{allResults.items?.length > 0 ? (
				<ul>
					{allResults.items.map((result) => (
						<li key={result.id}>
							<p>Username: {result.student_id}</p>
							{/* <p>Score: {result.answer}</p> */}
							<p>Time Taken: {result.time} seconds</p>
							{/* <p>Date: {result.date}</p> */}
						</li>
					))}
				</ul>
			) : (
				<p>No results found.</p>
			)}
		</div>
	)
}

export default StudentsResults
