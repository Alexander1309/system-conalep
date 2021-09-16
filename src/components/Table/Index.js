import { FormattedMessage } from 'react-intl'
const Table = ({children, id, titles }) => {
    return (
        <>
            <div className={`overflow-auto card bg-light rounded-2`} style={{height: '20rem'}}>
                <table className="table table-striped">
                    <thead className="bg-secondary card-header sticky-top text-white">
                        <tr>
                            {
                                titles.map((title, i) => (
                                    <th scope="col" className="p-2" key={i}>
                                        <FormattedMessage id={`${id}.table${i+1}`} defaultMessage={title} />
                                    </th>
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