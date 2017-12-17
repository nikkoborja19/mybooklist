class EditReviewBox extends React.Component {
  constructor() {
       super();

       this.state = {
           review: "",
           auth: true,
           done: false,
       }
   }

   componentWillMount() {
       let reviewId = this.props.match.params.reviewId;
       let user = this.props.match.params.username;

       this._getReview(user, reviewId);

       if(!sessionStorage.getItem("token")) {
           this.setState({
               auth: false
           });
       }
   }

   _getReview(user, reviewId){
       $.ajax({
             type: "GET",
             url: `/api/review/${user}/${reviewId}`,
             headers: {
                 "Authorization": sessionStorage.getItem("token")
             },
             async: false
         }).done((_review, status, xhr) => {
             console.log(_review);
             this.setState({
                 review: _review
             });
         }).fail((xhr) => {
             if(xhr.status == 401)
             {
                 this.setState({
                     auth: false
                 });
             }
        });
   }

   render() {
       if(!this.state.auth) {
           return (
               <Redirect to="/session/new" />
           );
       }

       if(this.state.done) {
           return (
               <Redirect to={`/book/view-book-reviews/${this.state.review.username}/${this.state.review.bookId}`} />
           );
       }

       return(
         <div className="col-md-12 body-add-edit-review">
           <div className="col-md-3">
           </div>
           <div className="col-md-6">
           <div className="container-fluid">
               <div className="row">
                   <div className="col-sm"></div>
                   <div className="col-sm" id="col-sm-add-review">
               <div >
                   <p className="review-message">Edit Review for {this.state.review.bookName}!</p>
               </div>
                       <form onSubmit={this._handleSubmit.bind(this)}>
                           <div className="form-group">
                               <label htmlFor="editSubject">Subject</label>
                               <input type="text" onChange={this._handleSubjectChange.bind(this)} ref={(input) => this._subject = input} className="form-control" id="editSubject" value={this.state.review.subject} />
                           </div>
                           <div className="form-group">
                               <label htmlFor="editRatingDropdown">Rating</label>
                               <select className="form-control" id="editRatingDropdown">
                                  <Options selectedRatingProp={this.state.review.rating} />

                              </select>
                           </div>
                           <div className="form-group">
                               <label htmlFor="editReview">Review</label>
                               <textarea onChange={this._handleReviewContentChange.bind(this)} ref={(textarea) => this._review = textarea} className="form-control" id="editReview" rows="3" value={this.state.review.content}></textarea>
                           </div>
                           <button type="submit" className="btn btn-primary submit-review-button">Submit Review</button>
                           <a href="#" onClick={this._redirectViewAllReviews.bind(this)} className="click-homepage">Click here to go back</a>
                       </form>
                   </div>
                   <div className="col-sm"></div>
               </div>
           </div>
         </div>
         <div className="col-md-3">
         </div>
       </div>
       );
   }

   _handleSubjectChange(e) {
     //this is required cause magthrow ng error na
     //"Warning: A component is changing an uncontrolled input of type text to be controlled.
     //Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a
     //controlled or uncontrolled input element for the lifetime of the component."
     //ALSO PUT async: false sa AJAX kasi minsan nagrurun na kahit di pa nakukuha ni AJAX ung value ni review.
         let review = this.state.review;

         this.setState({
             review: Object.assign({}, review,
                 {
                     subject: e.target.value
                 })
         });
     }

     _handleReviewContentChange(e) {
       let review = this.state.review;

       this.setState({
           review: Object.assign({}, review,
               {
                   content: e.target.value
               })
       });
     }

   _handleSubmit(e) {
       e.preventDefault();

       let reviewId = this.state.review._id;

       let ratingVal = $('#editRatingDropdown').find(":selected").text() +"";

       let review = {
           reviewId: this.state.review._id+"",
           username: this.state.username,
           bookId: this.state.review.bookId,
           bookName: this.state.review.bookName,
           subject: this._subject.value,
           content: this._review.value,
           rating: ratingVal
       }

       console.log("bottles "+review.rating);
       if(review.subject == "" || review.subject == undefined){
         console.log("endgame");
         this._showError("Please include a subject!");
       }else if(review.content == "" && review.content == undefined){
         console.log("enter");
         this._showError("Please include a review!");
       }else if(review.subject != "" && review.subject != undefined && review.content != "" && review.content != undefined){

         console.log(sessionStorage.getItem("token"));
         $.ajax({
             type: "PUT",
             url: `/api/review/${reviewId}`,
             headers: {
                 "Authorization": sessionStorage.getItem("token")
             },
             xhrFields: {
                withCredentials: true
             },
             dataType: 'application/json',
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify(review)
         }).done((res, status, xhr) => {
             //sessionStorage.setItem("token", xhr.getResponseHeader("Authorization")); wag to ilagay kasi dito sa page na to "lilipat" ung token. So pag nag go back tayo, wala na sa homepage so pag cnlick natin ulit ung add review, wala nang token na ipapasa. WORKS SIMILARLY SA CONTEXT IN ANDROID.

             this.setState({
               done: true
             });
         }).fail((xhr) => {
             if(xhr.status == 401) {
                 this._showError("401: Something went wrong...");
             }else if(xhr.status == 500) {
                 this._showError("500: Something went wrong...");
             }
         });
      }

   }

   _redirectViewAllReviews(e) {
       e.preventDefault();

       this.setState({
           done: true
       });
   }

   _showError(error) {
       this.setState({
           message: error
       });

       let emptyAlert = $(".alert-empty");

       if(emptyAlert.hasClass("invisible")) {
           emptyAlert.removeClass("invisible");
       }
   }
}

class Options extends React.Component {

    render() {
        let selectedRating = this._getSelectedRating();
        let ratings = [
          "5.0",
          "4.5",
          "4.0",
          "3.5",
          "3.0",
          "2.5",
          "2.0",
          "1.5",
          "1.0",
          "0.5",
          "0.0"
        ];

        return(
            ratings.map((rating) =>
                    <OptionItem
                        key={rating}
                        currentRating={rating}
                        selectedRating={selectedRating} />
                )
        );
    }

    _getSelectedRating() {

        return this.props.selectedRatingProp;
    }
}

class OptionItem extends React.Component {
    constructor() {
       super();

       this.state = {
           currentRating: "",
           selectedRating: ""
       }
    }

    componentWillMount() {
       let curr = this.props.currentRating;
       let selected = this.props.selectedRating;

       this.setState({
           currentRating: curr,
           selectedRating: selected
       });

       if(!sessionStorage.getItem("token")) {
           this.setState({
               auth: false
           });
       }
    }

    render(){

      if(this.state.currentRating === this.state.selectedRating){
        return(
              <option selected>{this.state.currentRating}</option>
        );
      }else if(this.state.currentRating != this.state.selectedRating){
        return(
              <option>{this.state.currentRating}</option>
        );
      }

    }
}
