const SignUp = () => {
    return (
        <>
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" />
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" id="email" name="email" className="form-control" />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Access code</label>
                    <input type="text" id="code" name="code" className="form-control" />
                </div>
            </div>
        </>
    )
}

export default SignUp