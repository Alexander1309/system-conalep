const SignUp = ({ state, setState }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" id="name" name="name" className="form-control" onChange={(e) => setState({...state, name: e.target.value})}/>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label" >Last Name</label>
                        <input type="text" id="lastName" name="lastName" className="form-control" onChange={(e) => setState({...state, lastName: e.target.value})}/>
                    </div>
                </div>
                <div className="mb-1"></div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" id="email" name="email" className="form-control" onChange={(e) => setState({...state, email: e.target.value})}/>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" onChange={(e) => setState({...state, password: e.target.value})}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Access code</label>
                    <input type="text" id="code" name="code" className="form-control" onChange={(e) => setState({...state, accessCode: e.target.value})}/>
                </div>
            </div>
        </>
    )
}

export default SignUp