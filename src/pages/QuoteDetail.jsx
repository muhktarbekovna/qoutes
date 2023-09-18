import React, { useEffect } from 'react'
import { useParams, Route, Link } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
import { useRouteMatch } from 'react-router'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const QuoteDetail = () => {
    const match = useRouteMatch()
    const params = useParams()
    const { quoteId } = params
    const { sendRequest, status, error, data: loaddedQuote } = useHttp(getSingleQuote, true)

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])
    console.log(quoteId);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }
    if (error) {
        return <p className='centered focused'>{error}</p>
    }
    if (!loaddedQuote.text) {
        return <p>No quote found</p>
    }
    // const quote = loadedQuotes.find(quote => quote.id === params.quoteId)


    console.log(params);
    return (
        <div>
            <HighlightedQuote text={loaddedQuote.text} author={loaddedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load comments</Link>
                </div>
            </Route>
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments/> 
            </Route>
        </div>
    )
}

export default QuoteDetail