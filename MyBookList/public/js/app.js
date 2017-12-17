const Router = window.ReactRouterDOM.HashRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const hashHistory = window.ReactRouterDOM.hashHistory;

class AppBox extends React.Component {

    render() {
        return (
        <Router>
            <div>

            <div id="content">

                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/register" component={RegisterBox} />
                <Route exact path="/book/add-review/:username/:bookId" component={AddReviewBox} />
                <Route exact path="/book/view-book-reviews/:username/:bookId" component={ViewAllReviewsBox} />
                <Route exact path="/book/edit-review/:username/:reviewId" component={EditReviewBox} />
                <Route exact path="/home/:username" component={HomepageBox} />
                <Route exact path="/" component={LoginBox} />

            </div>
                    <hr />
            <footer className="footer">
              <div className="col-md-12" id="indexFooter">
          		<div className="col-md-12">
          			<div className="col-md-1">
      	    		</div>
      	    		<div className="col-md-4">
      	    			<img id="footerLogo" src="images/logo.png"/>
      	    		</div>
          			<div className="col-md-4">
          			</div>
          			<div className="col-md-3">
      					<a href="#" className="btn btn-default btn-circle social-media-buttons" id="instagramButton"><span><i className="fa fa-instagram fa-2x"></i></span></a>
      					<a href="#" className="btn btn-default btn-circle social-media-buttons" id="twitterButton"><span><i className="fa fa-twitter fa-2x"></i></span></a>
      					<a href="#" className="btn btn-default btn-circle social-media-buttons" id="facebookButton"><span><i className="fa fa-facebook fa-2x"></i></span></a>
          			</div>
          		</div>
          		<div className="col-md-12">
          			<div className="col-md-1">
      	    		</div>
      	    		<div className="col-md-4">
      	    			<p>&copy; 2017 Team Mishimas Inc.</p>
      	    		</div>
          			<div className="col-md-4">
          			</div>
          			<div className="col-md-3">
      					</div>
          		</div>
          	</div>
            </footer>
            </div>
        </Router>

        );
    }
}
const Login = () => <LoginBox />
const Register = () => <RegisterBox />
const Homepage = () => <HomepageBox />
const AddReview = () => <AddReviewBox />
const ViewAllReviews = () => <ViewAllReviewsBox />
const EditReview = () => <EditReviewBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
