class HomepageBox extends React.Component {

    constructor() {
        super();

        this.state ={
            bookList: [],
            auth: true,
            homepage: false,
            logout: false,
            username: ""
        }
    }

    componentWillMount() { //part of lifecycle method. search mo
        let user = this.props.match.params.username; //may username sa link

        this._getBooks();

        this.setState({
            username: user
        });

        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    _getBooks() { //should be hardcoded
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
          bookList: books
        });
    }

    render() {

        if(this.state.homepage) {
            return (
                <Redirect to={`/home/${this.state.username}`} />
            );
        }

        if(this.state.logout || !this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        return (
          <div className="col-md-12">
              <div className="col-md-12">
                <a href="#" onClick={this._redirectLogout.bind(this)} className="click-logout">Click here to logout</a>
                <div className="col-md-12">

                    <div className="row">
                        <BookList booksProp={this.state.bookList} usernameProp={this.state.username}/>
                    </div>

                </div>
              </div>

          </div>

        );
    }

    _redirectLogout(e) {
        e.preventDefault();

        this.setState({
            logout: true
        });
    }
}

class BookList extends React.Component {

    render() {
        let books = this._getBooks();
        let username = this._getUsername();

        return(
            books.map((book) =>
                    <BookCard
                        key={book._id}
                        bookId={book._id}
                        title={book.title}
                        genre={book.genre}
                        author={book.author}
                        series={book.series}
                        series_number={book.series_number}
                        book_cover={book.book_cover}
                        description={book.description}
                        username={username} />
                )
        );
    }

    _getBooks() {
        return this.props.booksProp; //return ung books sa BookList
    }

    _getUsername() {
        return this.props.usernameProp; //return ung books sa BookList
    }
}

class BookCard extends React.Component {

    constructor() {
        super();

        this.state = {
            refresh: false,
            add: "", //add a review to book
            viewall: "", //view all reviews of book
            user: ""
        }
    }

    render() {

        if(this.state.add != "") {
            return (
                <Redirect to={`/book/add-review/${this.state.user}/${this.state.add}`} />
            );
        }

        if(this.state.viewall != "") {
            return (
                <Redirect to={`/book/view-book-reviews/${this.state.user}/${this.state.viewall}`} />
            );
        }

        if(this.state.refresh) {
            return (
                <Redirect to={`/home/${this.state.user}`} />
            );
        }

        return(
              <div className="col-md-6 book-panel">
                <div className="col-md-12">
                  <div className="col-md-5">
                    <div className="col-md-12">
                      <img className="thumbnail" src={this.props.book_cover}/>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-12 div-view-book-reviews-button">
                        <ViewAllButtonBind bookId={this.props.bookId} username={this.props.username} action={this._handleViewBookReviews.bind(this)}/>
                      </div>
                      <div className="col-md-12 div-add-review-button">
                        <AddButtonBind bookId={this.props.bookId} username={this.props.username} action={this._handleAddReview.bind(this)}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 book-information">
                    <h4 className="book-title">{this.props.title}</h4>
                    <p className="book-description">by <a href={`#/home/${this.props.username}`} className="author-tag">{this.props.author}</a></p>
                    <p className="book-description"><a href={`#/home/${this.props.username}`} className="genre-tag">{this.props.genre}</a></p>
                    <p className="book-description">{this.props.description}</p>
                  </div>
                </div>
              </div>
        );
    }

    _handleViewBookReviews(bookId, username) {
        console.log(bookId);

        this.setState({
            viewall: bookId+"", //cause string yung pang checker natin sa redirect sa taas
            user: username
        });
    }

    _handleAddReview(bookId, username) {
      console.log(username);

      this.setState({
          add: bookId+"", //cause string yung pang checker natin sa redirect sa taas
          user: username
      });
    }

}

class ViewAllButtonBind extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a type="button" href="#" onClick={this._handleEdit.bind(this)} className="btn btn-view-book-reviews">View All Reviews</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.bookId, this.props.username);
    }

}

class AddButtonBind extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a type="button" href="#" onClick={this._handleEdit.bind(this)} className="btn btn-add-review">Add Review</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.bookId, this.props.username);
    }

}
