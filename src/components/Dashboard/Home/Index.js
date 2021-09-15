import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { alertSelectFile, alertMessage, alertCirculeProgress, alertConfirm } from '../../../lib/alerts'
import { formatSizeFile } from '../../../lib/functions'
import { postItSafely, downloadFiles, deleteItSafely } from '../../../lib/http'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faDownload, faFileUpload, faArchive } from '@fortawesome/free-solid-svg-icons'
import Table from '../../Table/Index'
import auth from '../../../lib/auth'
import { usePost } from '../../../hooks/usePost'

const th = ['#', 'Title', 'Description', 'Name File', 'Download File', 'Create on', 'Action']

const View = () => {
    const { route } = useParams()
    const { posts, getPosts } = usePost(route)
    const history = useHistory()
    const [newPost, setNewPost] = useState({ title: '', fileObj: null, fileName: '', fileSize: 0, description: '' })

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newPost.title === '' || newPost.fileObj === null || newPost.fileName === '' || newPost.fileSize === 0 || newPost.description === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else {
            const formData = new FormData()
            formData.append('title', newPost.title)
            formData.append('workArea', route)
            formData.append('fileObj', newPost.fileObj)
            formData.append('fileName', newPost.fileName)
            formData.append('fileSize', newPost.fileSize)
            formData.append('description', newPost.description)

            alertCirculeProgress('Uploading file', 'Please wait a few minutes, uploading file...')
            const res = await postItSafely('dashboard/newPost', formData)
            try {
                if(res.server === 'PostCreated') {
                    const confirm = await alertMessage('Post Created', 'The post has been created correctly.', 'success')
                    if(confirm.isConfirmed) {
                        document.querySelector('#title').value = ''
                        document.querySelector('#description').value = ''
                        setNewPost({ title: '', fileObj: null, fileName: '', fileSize: 0, description: '' })
                        getPosts(route)
                    }
                }
                else if(res.server === 'PostNotCreated')  alertMessage('Post Created', 'Post could not be created try again.', 'error')
                else if(res.server === 'SessionExpired') {
                    const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                    if(confirm.isConfirmed) {
                        auth.logOut(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            history.push('/auth')
                        })
                    }
                }   
                else alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
            } catch(e) {
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
            }
        }
    }

    const handelDeletePost = async (id, title) => {
        const confirm = await alertConfirm(`Are you sure you want to Deleted ${title}?.`)
        if(confirm.isConfirmed) {
            try {
                const server = await( await deleteItSafely(`dashboard/deletePostFile/${id}`)).server
                if(server === 'PostDeleted') alertMessage('Post Deleted', 'The publication has been successfully Deleted.', 'success')
                else if(server === 'PostNotDeleted') alertMessage('Post Not Deleted', 'The publication has not been Deleted.', 'error')
                else if(server === 'SessionExpired') {
                    const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                    if(confirm.isConfirmed) {
                        auth.logOut(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            history.push('/auth')
                        })
                    }
                }   
                getPosts(route)
            } catch(e) {
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
            }
        }
    }

    const handleSelectFile = async () => {
        const file = await alertSelectFile('Select File', 'Loading File', '*')
        if(file !== null){
            setNewPost({...newPost, fileObj: file, fileName: file.name, fileSize: formatSizeFile(file.size)})
            setTimeout(() => {
                alertMessage('Select File Success', '', 'success')
            }, 1000)
        } else setNewPost({...newPost, fileObj: file, fileName: '', fileSize: 0})
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <form onSubmit={handleSubmit}>
                            <div className="card bg-dark text-white rounded-2 ms-auto">
                                <div className="card-header">
                                    <h3>New Post</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label">Post title</label>
                                                <input type="text" className="form-control" name="title" id="title" placeholder="Post title" onChange={e => setNewPost({...newPost, title: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">{newPost.file === null ? 'Select File' : 'Selected File'}</label>
                                                <button className={newPost.fileObj === null ? 'btn btn-info d-block w-100' : 'btn btn-success d-block w-100'} type="button" onClick={handleSelectFile}>{newPost.fileObj === null ? 'Select File' : 'Selected File'}</button>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" id="description" style={{resize:'none'}} rows="3" placeholder="Post description" onChange={e => setNewPost({...newPost, description: e.target.value})} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="mb-3 d-grid gap-2">
                                        <button className="btn btn-primary" type="submit">Create Post</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-5">
                        <div className="card bg-dark text-white rounded-2" style={{maxHeight: '55%'}}>
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div>
                                    <span title={newPost.title === '' ? 'Post title': newPost.title}>{newPost.title === '' ? 'Post title' : newPost.title.length >= 28 ? `${newPost.title.substring(0, 28)}...` : newPost.title}</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-2">
                                        <FontAwesomeIcon style={{fontSize: '4rem'}} icon={newPost.fileObj === null ? faFileUpload : faArchive} />
                                    </div>
                                    <div className="col-9">
                                        <p title={newPost.description === '' ? 'Post description' : newPost.description}>{newPost.description === '' ? 'Post description' : newPost.description.length > 100 ? `${newPost.description.substring(0, 100).trimEnd()}...` : newPost.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div>
                                    <span title={newPost.fileName === '' ? 'Name File.txt' : newPost.fileName}>{newPost.fileObj === null ? 'Name File.txt' : newPost.fileName.length >= 23 ? `${newPost.fileName.substring(0, 23)}...` : newPost.fileName}</span>
                                </div>
                                <div>
                                    <button className="border-0 text-white bg-transparent">
                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                        <span>{newPost.fileObj === null ? '0 bytes' : newPost.fileSize}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Table titles={th}>
                        {posts !== null 
                            ? 
                                posts.length > 0 
                                    ? 
                                        posts.reverse().map((post, i) => (
                                            <tr key={post._id}>
                                                <td>{i + 1}</td>
                                                <td title={post.title}>{post.title.length > 15 ? post.title.substring(0, 15).trimEnd() + '...' : post.title}</td>
                                                <td title={post.description}>{post.description.length > 40 ? post.description.substring(0, 40).trimEnd() + '...' : post.description}</td>
                                                <td>{post.fileName}</td>
                                                <td>
                                                    <button className="border-0 text-dark bg-transparent" onClick={() => downloadFiles(post.urlFile, post.urlFile.split('/').reverse()[0].split('.')[0], post.urlFile.split('/').reverse()[0].split('.')[1])}>
                                                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                        <span>{post.fileSize}</span>
                                                    </button>
                                                </td>
                                                <td>{new Date(post.created_on).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn btn-danger rounded-2 ms-2" onClick={() => handelDeletePost(post._id, post.title)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    : <tr><td colSpan="8">No publications...</td></tr>
                            : <tr><td colSpan="8">Loading...</td></tr>
                        }
                    </Table>
                </div>
            </div>
        </>
    )
}

export default View