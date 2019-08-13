import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function RenderComments({comments}) {
  let _comments = comments.map (comment => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    let commentDate = new Date (comment.date).toLocaleDateString (
      'en-US',
      options
    );
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          --{comment.author} , {commentDate}
        </p>
      </li>
    );
  });

  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {_comments}
      </ul>
    </div>
  );
}

function RenderDish({dish}) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>

      </div>
    );
  } else return <div />;
}

const Dishdetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    );
  } else return <div />;
};

export default Dishdetail;
