const Card = ({title, icon, count, color}) => {
    return (
        <>
            <div className={`card border-${color} rounded-2`}>
                <div className={`card-header bg-${color} d-flex justify-content-center`}>
                    <div className="me-2 text-white">
                        <span className="fs-2">{title}</span>
                    </div>
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                        {icon}
                    </div>
                    <div>
                        <span className={`fs-3 text-${color}`}>{count}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card