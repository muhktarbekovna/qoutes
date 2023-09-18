import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comment.map((comments) => (
        <CommentItem key={comments.id} text={comments.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
