import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResults } from '../../redux/features/question/questionSlice'; // Adjust the import path as necessary

const StudentsResults = () => {
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.results); // Ensure this matches your Redux state structure

    useEffect(() => {
        dispatch(getAllResults());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Students Results</h1>
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>
                            <p>Username: {result.username}</p>
                            <p>Score: {result.score}</p>
                            <p>Time Taken: {result.time} seconds</p>
                            <p>Date: {result.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default StudentsResults;