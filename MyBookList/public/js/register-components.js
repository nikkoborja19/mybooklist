class RegisterBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false,
            login: false
        }
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        if(this.state.login) {
            return (
                <Redirect to="/session/new" />
            );
        }

        return (
          <div className="col-md-12 body-login-register">
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="col-sm-register">
                <div className="alert-register alert alert-danger invisible" role="alert">
                    {this.state.message}
                </div>
                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="name">User ID</label>
                                <input type="text" ref={(input) => this._name = input} className="form-control" id="register_name" placeholder="Enter user ID" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" ref={(input) => this._password = input} className="form-control" id="register_password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" ref={(input) => this._confirmpassword = input} className="form-control" id="register_confirmpassword" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" className="btn btn-primary register-button">Register</button>
                            <a href="#" onClick={this._redirectLogin.bind(this)} className="click-register">Click here to go back</a>
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

        let session = {
            name: this._name.value,
            password: this._password.value,
            confirm_password: this._confirmpassword.value,
        }

        if(session.password == session.confirm_password){
          $.ajax({
              type: "POST",
              url: "/api/account/register",
              headers: {
                  "Authorization": sessionStorage.getItem("token")
              },
              data: {
                name: session.name,
                password: session.password
              }
          }).done((res, status, xhr) => {
              sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));

              this.setState({
                login: true
              });
          }).fail((xhr) => {
              if(xhr.status == 401) {
                  this._showRegisterError("Something went wrong...");
              }
          });
        }else{
          this._showRegisterError("Password do not match.");
        }
    }

    _redirectLogin(e){
        e.preventDefault();

        this.setState({
          login: true
        });
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
/*class RegisterBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false,
            register: false
        }
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        if(this.state.register) {
            return (
                <Redirect to="/register" />
            );
        }

        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-login">
            <div className="alert-login alert alert-danger invisible" role="alert">
                {this.state.message}
            </div>
                    <form onSubmit={this._handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="name">User IDD</label>
                            <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Enter user ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary submit-button">Submit</button>
                        <button type="submit" ref={(input) => this._register = "true"} className="btn btn-danger register-button">Register</button>
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
            name: this._name.value,
            password: this._password.value,
            register: this._register.value
        }

        if(register == "false" || register == false){
          $.ajax({
              type: "POST",
              url: "/api/session",
              data: session
          }).done((res, status, xhr) => {
              sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));
              this.setState({ redirect: true });
          }).fail((xhr) => {
              if(xhr.status == 401) {
                  this._showLoginError("Invalid name or password.");
              }
          });
        }else{
          this.setState({
              register: true
          });
        }
    }

    _showLoginError(error) {
        this.setState({
            message: error
        });

        let loginAlert = $(".alert-login");

        if(loginAlert.hasClass("invisible")) {
            loginAlert.removeClass("invisible");
        }
    }
}*/
