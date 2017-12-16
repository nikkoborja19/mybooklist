class IndexBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            login: false,
            register: false
        }
    }

    render() {

        if(this.state.login) {
            return (
                <Redirect to="/session/login" />
            );
        }

        if(this.state.register) {
            return (
                <Redirect to="/session/register" />
            );
        }

        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-register">
            <div className="alert-register alert alert-danger invisible" role="alert">
                {this.state.message}
            </div>
                    <form onSubmit={this._handleSubmit.bind(this)}>
                        <button type="submit" ref={(input) => this._loginState = "true"} className="btn btn-primary">LOGIN</button>
                        <button type="submit" ref={(input) => this._registerState = "true"} className="btn btn-primary">REGISTER</button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>

        );
    }

    _handleSubmit(e) {
        e.preventDefault();

        let session = {
            loginState: this._loginState.value,
            registerState: this._registerState.value
        }

        if(loginState == "true" || loginState == true){
          this.setState({
            login: true
          });
        }

        if(registerState == "true" || registerState == true){
          this.setState({
            register: true
          });
        }


    }

    _showRegisterError(error) {
        this.setState({
            message: error
        });

        let registerAlert = $(".alert-register");

        if(registerAlert.hasClass("invisible")) {
            registerAlert.removeClass("invisible");
        }
    }
}
