const SignIn = ({ state, setState }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" id="email" name="email" className="form-control" onChange={(e) => setState({...state, email: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-control" onChange={(e) => setState({...state, password: e.target.value})}/>
            </div>
        </>
    )
}

export default SignIn