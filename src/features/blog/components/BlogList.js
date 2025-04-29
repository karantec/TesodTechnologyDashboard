import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBlogs, setLoading, setError } from '../blogSlice';
import { getAllBlogs, deleteBlog } from '../../../app/api';

const BlogList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs, loading, error } = useSelector((state) => state.blog);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllBlogs();
            if (response.status) {
                dispatch(setBlogs(response.data));
            } else {
                dispatch(setError(response.message || 'Failed to fetch blogs'));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDelete = async (id) => {
        try {
            dispatch(setLoading(true));
            const response = await deleteBlog(id);
            if (response.status) {
                fetchBlogs(); // Refresh the list
                setDeleteConfirmation(null);
            } else {
                dispatch(setError(response.message || 'Failed to delete blog'));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/app/blog/add')}
                >
                    Add New Blog
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img 
                                src={blog.image} 
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                            <div className="card-actions justify-end mt-4">
                                <button 
                                    className="btn btn-sm btn-info"
                                    onClick={() => navigate(`/app/blog/edit/${blog._id}`)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-error"
                                    onClick={() => setDeleteConfirmation(blog._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="flex gap-4 mt-4">
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleDelete(deleteConfirmation)}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="btn btn-sm btn-ghost"
                                onClick={() => setDeleteConfirmation(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;
