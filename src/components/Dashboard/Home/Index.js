import { useState } from 'react'
import { useParams } from "react-router"
import { alertSelectFile, alertMessage } from '../../../lib/alerts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFileAlt } from '@fortawesome/free-solid-svg-icons'

const View = () => {
    const { route } = useParams()
    const [newPost, setNewPost] = useState({ title: '', file: null, description: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        alertMessage('Hola', 'Se a creado el post', 'success')
    }

    const handleSelectFile = async () => {
        const file = await alertSelectFile('Select File', 'Loading File', '*')
        if(file !== null){
            setNewPost({...newPost, file: file})
            setTimeout(() => {
                alertMessage('Select File Success', '', 'success')
            }, 1000)
        } else setNewPost({...newPost, file: file})
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
                                                <input type="text" className="form-control" name="title" id="title" placeholder="Title..." onChange={e => setNewPost({...newPost, title: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">{newPost.file === null ? 'Select File' : 'Selected File'}</label>
                                                <button className={newPost.file === null ? 'btn btn-info d-block w-100' : 'btn btn-success d-block w-100'} type="button" onClick={handleSelectFile}>{newPost.file === null ? 'Select File' : 'Selected File'}</button>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" id="description" style={{resize:'none'}} rows="3" placeholder="Description..." onChange={e => setNewPost({...newPost, description: e.target.value})} />
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
                        <div className="card bg-dark text-white rounded-2 h-100">
                            <div className="card-header">
                                <h3>{newPost.title === '' ? 'Title Post' : newPost.title.length >= 15 ? newPost.title.substring(0, 15) + '...' : newPost.title}</h3>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <div>
                                        {
                                            newPost.file === null
                                            ? <FontAwesomeIcon icon={faFileUpload} style={{fontSize: 5 + 'rem'}} />
                                            : <FontAwesomeIcon icon={faFileAlt} style={{fontSize: 5 + 'rem'}}/>
                                        }
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-5">
                                        <p className="fw-bolder">Name: <span className="fw-light">{newPost.file !== null ? newPost.file.name.split('.')[0] : 'File'}</span></p>
                                    </div>
                                    <div className="col">
                                        <p className="fw-bolder">Type: <span className="fw-light">{newPost.file !== null ? newPost.file.name.split('.').reverse()[0] : 'txt'}</span></p>
                                    </div>
                                    <div className="col">
                                        <p className="fw-bolder">Size: <span className="fw-light">{newPost.file !== null ? (Math.round(newPost.file.size / 1024) !== 0 ? `${(newPost.file.size / 1024).toString().substr(0,4)} KB` : `${newPost.file.size} Bytes`) : '0 Bytes'}</span></p>
                                    </div>
                                </div>
                                <div className="pe-2 ps-2">
                                    <span>{newPost.description === '' ? 'Post description' : newPost.description.length >= 155 ? newPost.description.substring(0, 155) + '...' : newPost.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View