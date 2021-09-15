import { useParams } from 'react-router-dom'
import Header from '../Header/Index'
import { routes } from '../../router/dashboard.routes'
import { usePost } from '../../hooks/usePost'
import { downloadFiles } from '../../lib/http'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faDownload, faFileUpload, faArchive, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../img/365cons-032.svg'

const WorkArea = () => {
    const { workArea } = useParams()
    const { posts, resultSearch, searchPosts } = usePost(workArea)
    document.title = `Conalep - Work Areas / ${routes[routes.findIndex(r => r.workAreasPath === workArea)].title}`

    return (
        <>
            <Header />
            {
                posts !== null 
                    ? 
                        posts.length > 0
                            ?   <div className="d-flex justify-content-center mt-2">
                                    <input type="text" className="form-control rounded-pill w-50 shadow border border-dark border-3" id="search" name="search" placeholder="Search for a publication..." onChange={(e) => searchPosts(e.target.value)} />
                                </div>
                        : <></>
                : <></>
            }
            <div className="row m-2">
                {
                    posts !== null 
                        ? 
                            posts.length > 0
                                ? 
                                    resultSearch === null
                                        ? 
                                            posts.map(post => (
                                                <div key={post._id} className="col-md-4 mt-2">
                                                    <div className="card bg-dark text-white rounded-2">
                                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <span title={post.title === '' ? 'Post title': post.title}>{post.title === '' ? 'Post title' : post.title.length >= 28 ? `${post.title.substring(0, 28)}...` : post.title}</span>
                                                                </div>
                                                                <div>
                                                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                                                    <span>{new Date(post.created_on).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <FontAwesomeIcon style={{fontSize: '4rem'}} icon={post.fileObj === null ? faFileUpload : faArchive} />
                                                                    </div>
                                                                    <div className="col-9">
                                                                        <p title={post.description === '' ? 'Post description' : post.description}>{post.description === '' ? 'Post description' : post.description.length > 100 ? `${post.description.substring(0, 100).trimEnd()}...` : post.description}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <span title={post.fileName === '' ? 'Name File.txt' : post.fileName}>{post.fileObj === null ? 'Name File.txt' : post.fileName.length >= 23 ? `${post.fileName.substring(0, 23)}...` : post.fileName}</span>
                                                                </div>
                                                            <div>
                                                                <button className="border-0 text-white bg-transparent" onClick={() => downloadFiles(post.urlFile, post.urlFile.split('/').reverse()[0].split('.')[0], post.urlFile.split('/').reverse()[0].split('.')[1])}>
                                                                    <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                                    <span>{post.fileObj === null ? '0 bytes' : post.fileSize}</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))
                                    : 
                                        resultSearch.length > 0
                                                ?
                                                resultSearch.map(post => (
                                                    <div key={post._id} className="col-md-4 mt-2">
                                                        <div className="card bg-dark text-white rounded-2">
                                                                <div className="card-header d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <span title={post.title === '' ? 'Post title': post.title}>{post.title === '' ? 'Post title' : post.title.length >= 28 ? `${post.title.substring(0, 28)}...` : post.title}</span>
                                                                    </div>
                                                                    <div>
                                                                        <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                                                        <span>{new Date(post.created_on).toLocaleDateString()}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-2">
                                                                            <FontAwesomeIcon style={{fontSize: '4rem'}} icon={post.fileObj === null ? faFileUpload : faArchive} />
                                                                        </div>
                                                                        <div className="col-9">
                                                                            <p title={post.description === '' ? 'Post description' : post.description}>{post.description === '' ? 'Post description' : post.description.length > 100 ? `${post.description.substring(0, 100).trimEnd()}...` : post.description}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <span title={post.fileName === '' ? 'Name File.txt' : post.fileName}>{post.fileObj === null ? 'Name File.txt' : post.fileName.length >= 23 ? `${post.fileName.substring(0, 23)}...` : post.fileName}</span>
                                                                    </div>
                                                                <div>
                                                                    <button className="border-0 text-white bg-transparent" onClick={() => downloadFiles(post.urlFile, post.urlFile.split('/').reverse()[0].split('.')[0], post.urlFile.split('/').reverse()[0].split('.')[1])}>
                                                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                                        <span>{post.fileObj === null ? '0 bytes' : post.fileSize}</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            ))
                                        :
                                            <div className="d-flex flex-column align-items-center mt-5">
                                                <div className="d-flex justify-content-center">
                                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning" style={{fontSize: '9rem'}} />
                                                </div>
                                                <span className="fs-1 fw-bold">¡There is no coincidences!</span>
                                            </div>
                            : 
                                <div className="d-flex flex-column align-items-center mt-5">
                                    <div className="d-flex justify-content-center">
                                        <img src={Icon} alt="lo" className="w-75" />
                                    </div>
                                    <span className="fs-1 fw-bold">No publications</span>
                                </div>
                        : 
                            <div className="d-flex flex-column align-items-center mt-5">
                                <div className="text-center">
                                    <div className="spinner-grow fs-5" style={{width: '5rem', height: '5rem'}} role="status"></div>
                                </div>
                                <span className="fs-1 fw-bold">Loading...</span>
                            </div>
                }
            </div>
        </>
    )
}

export default WorkArea