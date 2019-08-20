import React, {Component} from 'react';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import About from './AboutComponent.js';
import Contact from './ContactComponent.js';
import Dishdetail from './DishdetailComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
};

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (values) => dispatch(postFeedback(values)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchDishes: () => { dispatch(fetchDishes())},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render(){
        const HomePage = () => {
            console.log(this.props.leaders);
            return(
                <Home
                dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <Dishdetail
                dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
                />
            );
        }

		return (
			<div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route path="/home" component={HomePage}></Route>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}></Route>
                            <Route path="/menu/:dishId" component={DishWithId}></Route>
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} />}></Route>
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
			</div>
		);
	};
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Main) );