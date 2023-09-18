import React, { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AllQuotes = () => {
    const { sendRequest, status, error, data: loadedQuotes } = useHttp(getAllQuotes, true)

    useEffect(() => {
        sendRequest()
    }, [])
    
    if (status === 'completed' && (!loadedQuotes || loadedQuotes.lenght === 0)) {
        return <NoQuotesFound />
    }
    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className='centered focused'>{error}</p>
    }

    return (
        <div>
            <QuoteList quotes={loadedQuotes} />
        </div>
    )
}

export default AllQuotes;

// const DUMMY_QUOTES = [
//     {
//         id: '1',
//         author: 'Ravil',
//         text: 'I like JS so much!!'
//     },
//     {
//         id: '2',
//         author: 'Nurperi',
//         text: 'Learning React is awesome!'
//     },

// ]
