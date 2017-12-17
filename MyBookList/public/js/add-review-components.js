class AddReviewBox extends React.Component {
  constructor() {
       super();

       this.state = {
           reviews: {},
           bookList: [],
           book: "",
           auth: true,
           done: false,
           username: ""
       }
   }

   componentWillMount() {
       let bookId = this.props.match.params.bookId;
       let user = this.props.match.params.username;

       this._getBook(bookId);

       this.setState({
           username: user
       });

       if(!sessionStorage.getItem("token")) {
           this.setState({
               auth: false
           });
       }
   }

   _getBook(bookId) { //should be hardcoded
       let books = [];

       books[0] = new Book(0, "Harry Potter and the Philosopher's Stone", "Fantasy", "J.K. Rowling", "Harry Potter series", "1", "https://static2.hypable.com/wp-content/uploads/2013/02/sorcerers-stone-kazu-cover-full.jpg",
       "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.");
       books[1] = new Book(1, "Harry Potter and the Chamber Of Secrets", "Fantasy", "J.K. Rowling", "Harry Potter series", "2", "https://static2.hypable.com/wp-content/uploads/2013/05/harry-potter-new-chamber-of-secrets-cover-630.jpg",
       "In Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockheart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny. But each of these seem minor annoyances when the real trouble begins, and someone--or something--starts turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects...Harry Potter himself?");
       books[2] = new Book(2, "Harry Potter and the Prisoner Of Azkaban", "Fantasy", "J.K. Rowling", "Harry Potter series", "3", "http://www.slate.com/content/dam/slate/blogs/browbeat/2013/06/27/potter_cover_3.jpg.CROP.article568-large.jpg",
       "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort. Now he has escaped, leaving only two clues as to where he might be headed: Harry Potter's defeat of You-Know-Who was Black's downfall as well. And the Azkban guards heard Black muttering in his sleep, \"He's at Hogwarts...he's at Hogwarts.\" Harry Potter isn't safe, not even within the walls of his magical school, surrounded by his friends. Because on top of it all, there may well be a traitor in their midst.");
       books[3] = new Book(3, "Harry Potter and the Goblet Of Fire", "Fantasy", "J.K. Rowling", "Harry Potter series", "4", "https://s-media-cache-ak0.pinimg.com/originals/5b/77/7b/5b777b414bb178f297f11a2b5e0177f6.jpg",
       "Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup. He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.");
       books[4] = new Book(4, "Harry Potter and the Order Of The Phoenix", "Fantasy", "J.K. Rowling", "Harry Potter series", "5", "http://www.pearltrees.com/s/pic/or/harry-potter-order-phoenix-80978554",
       "In his fifth year at Hogwart's, Harry faces challenges at every turn, from the dark threat of He-Who-Must-Not-Be-Named and the unreliability of the government of the magical world to the rise of Ron Weasley as the keeper of the Gryffindor Quidditch Team. Along the way he learns about the strength of his friends, the fierceness of his enemies, and the meaning of sacrifice.");
       books[5] = new Book(5, "Harry Potter and the Half-Blood Prince", "Fantasy", "J.K. Rowling", "Harry Potter series", "6", "https://pottermoreowl.files.wordpress.com/2013/07/bpgqexgcqaeptil.png",
       "The war against Voldemort is not going well; even the Muggles have been affected. Dumbledore is absent from Hogwarts for long stretches of time, and the Order of the Phoenix has already suffered losses. And yet . . . as with all wars, life goes on. Sixth-year students learn to Apparate. Teenagers flirt and fight and fall in love. Harry receives some extraordinary help in Potions from the mysterious Half-Blood Prince. And with Dumbledore's guidance, he seeks out the full, complex story of the boy who became Lord Voldemort -- and thus finds what may be his only vulnerability.");
       books[6] = new Book(6, "Harry Potter and the Deathly Hallows", "Fantasy", "J.K. Rowling", "Harry Potter series", "7", "https://vignette.wikia.nocookie.net/harrypotter/images/e/eb/Kkhp7-lg.jpg/revision/latest?cb=20130731191029",
       "During the first six books, Harry Potter learned to master his wizarding skills and understand the importance of his status as 'the boy who lived.' In the seventh and final book of the series, Harry and his friends, Ron and Hermione, will come face to face with Lord Voldemort in an effort to save the wizarding world. As their travels take them all over in an effort to destroy the Horcruxes connected to the dark lord, they face danger and adventure unlike anything they've seen before. Re-enter this magical world one last time as Harry Potter and Lord Voldemort face-to-face for an epic final battle.");

       this.setState({
         bookList: books,
         book: books[bookId]
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
               <Redirect to={`/home/${this.state.username}`} />
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
                   <p className="review-message">Rate and Review {this.state.book.title}!</p>
               </div>
                       <form onSubmit={this._handleSubmit.bind(this)}>
                           <div className="form-group">
                               <label htmlFor="addSubject">Subject</label>
                               <input type="text" ref={(input) => this._subject = input} className="form-control" id="addSubject" placeholder="Enter subject" />
                           </div>
                           <div className="form-group">
                               <label htmlFor="addRatingDropdown">Rating</label>
                               <select className="form-control" id="addRatingDropdown">
                                <option defaultValue>5.0</option>
                                <option>4.5</option>
                                <option>4.0</option>
                                <option>3.5</option>
                                <option>3.0</option>
                                <option>2.5</option>
                                <option>2.0</option>
                                <option>1.5</option>
                                <option>1.0</option>
                                <option>0.5</option>
                                <option>0.0</option>
                              </select>
                           </div>
                           <div className="form-group">
                               <label htmlFor="addReview">Review</label>
                               <textarea ref={(textarea) => this._review = textarea} className="form-control" id="addReview" rows="3"></textarea>
                           </div>
                           <button type="submit" className="btn btn-primary submit-review-button">Submit Review</button>
                           <a href="#" onClick={this._redirectHomepage.bind(this)} className="click-homepage">Click here to go back</a>
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

   _handleSubmit(e) {
       e.preventDefault();

       let bookId = this.props.match.params.bookId;

       this._getBook(bookId); //para magload yung book

       let ratingVal = $('#addRatingDropdown').find(":selected").text() +"";

       let review = {
           bookId: this.state.book._id+"",
           username: this.state.username,
           bookName: this.state.book.title,
           subject: this._subject.value,
           content: this._review.value,
           rating: ratingVal
       }

       if(review.subject == "" || review.subject == undefined){
         console.log("endgame");
         this._showError("Please include a subject!");
       }else if(review.content == "" && review.content == undefined){
         console.log("enter");
         this._showError("Please include a review!");
       }else if(review.subject != "" && review.subject != undefined && review.content != "" && review.content != undefined){

         console.log(sessionStorage.getItem("token"));
         $.ajax({
             type: "POST",
             url: "/api/review",
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

   _redirectHomepage(e) {
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
