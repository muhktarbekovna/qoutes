import { useCallback, useEffect, useState } from "react";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, error, data: loadedComment } = useHttp(getAllComments)
  const params = useParams()
  const { quoteId } = params

  useEffect(() => {
    sendRequest(quoteId)
  }, [quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comment;
  if (status === 'pending') {
    comment = <div className="centered"><LoadingSpinner /></div>
  }
  if (error) {
    comment = <p className="centered focused">{error}</p>
  }
  if (status === 'completed' && loadedComment && loadedComment.length > 0) {
    comment = <CommentsList comment={loadedComment} />
  }
  if (status === 'completed' && (!loadedComment && loadedComment.length === 0)) {
    comment = <p>Comment not found maybe add one?</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment &&
        <NewCommentForm
          quotedId={quoteId}
          onAddedComment={addedCommentHandler} />}
      {comment}
    </section>
  );
};

export default Comments;
