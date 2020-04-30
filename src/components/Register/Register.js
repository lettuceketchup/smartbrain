import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.onRouteChange = this.props.onRouteChange;
        this.loadUser = this.props.loadUser;
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    onNameChange = event => {
        this.setState({ name: event.target.value });
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.loadUser(user);
                    this.onRouteChange('home')
                }
            })
    }

    render() {
        // const onRouteChange = this.onRouteChange;
        return (
            <main className="pa4 white-90 center mw6 mw6-ns br3 hidden bg-black-10 ba b--white-50 mv4 shadow-5">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3 b--white">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Username</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-white-30 white w-100"
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
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
                            value="Register"
                            onClick={this.onSubmitRegister}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default Register;