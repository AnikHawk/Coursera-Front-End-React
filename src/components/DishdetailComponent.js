import React from 'react';
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

function RenderComments({comments}) {
  let _comments = comments.map(comment => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    let commentDate = new Date(comment.date).toLocaleDateString(
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
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">{_comments}</ul>
      <CommentForm />
    </div>
  );
}

function RenderDish({dish}) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else return <div />;
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div>
        <Button
          className="btn-light border border-dark"
          role="button"
          onClick={this.toggleModal}
        >
          <i className="fa fa-pencil" /> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  type="select"
                  name="rating"
                  id="rating"
                  className="selectpicker show-tick form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </div>

              <div className="form-group">
                <Label htmlFor="username">First Name</Label>
                <Control.text
                  model=".username"
                  id="username"
                  name="username"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".username"
                  show="touched"
                  messages={{
                    required: 'Required! ',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Input type="textarea" name="comment" rows="6" id="comment" />
              </div>
              <Button
                className="mt-2"
                type="submit"
                value="submit"
                color="primary"
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const Dishdetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  } else return <div />;
};

export default Dishdetail;
