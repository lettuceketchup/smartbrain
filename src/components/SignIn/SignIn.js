import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.onRouteChange = this.props.onRouteChange;
        this.loadUser = this.props.loadUser;
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = event => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = event => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3003/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.loadUser(user);
                    this.onRouteChange('home')
                }
            })
    }

    render() {
        const onRouteChange = this.onRouteChange;
        return (
            <main className="pa4 white-90 center mw5 mw6-ns br3 hidden bg-black-10 ba b--white-50 mv4 shadow-5">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3 b--white">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-white-30 white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3 b--white">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-white-30 white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                            type="submit"
                            value="Sign in"
                            onClick={this.onSubmitSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <span
                            className="f6 link dim white db pointer"
                            onClick={() => onRouteChange('register')}
                        >Register</span>
                    </div>
                </div>
            </main>
        );
    }
}

export default SignIn;