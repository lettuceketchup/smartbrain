import React from 'react';

const Register = ({ onRouteChange }) => {
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
                        />
                    </div>
                    <div className="mt3 b--white">
                        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-white-30 white w-100" 
                            type="text" 
                            name="email-address" 
                            id="email-address" 
                        />
                    </div>
                    <div className="mv3 b--white">
                        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-white-30 white w-100" 
                            type="password" 
                            name="password" 
                            id="password" 
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                        type="submit"
                        value="Register"
                        onClick={() => onRouteChange('home')}
                    />
                </div>
            </div>
        </main>
    );
}

export default Register;