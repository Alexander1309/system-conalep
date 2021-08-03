const Table = ({children, titles, bg}) => {
    return (
        <>
            <div className={`table-responsive card-header bg-${bg} rounded-2`}>
                <table className={`table table-${bg}`}>
                    <thead>
                        <tr>
                            {
                                titles.map((title, i) => (
                                    <th scope="col" key={i}>{title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table