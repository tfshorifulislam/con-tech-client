'use client'
import React, { useState, useRef } from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import axios from 'axios';

const PostCreatePage = () => {
    const [preview, setPreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const formRef = useRef(null);

    const user = {
        userName: "Shoriful Islam",
        userId: "67b8f3c9d4e5f67890123456",
        userEmail: "shoriful@example.com"
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.currentTarget);
        const text = formData.get('text');
        const imageFile = formData.get('image');

        if (!text && !imageFile) {
            setMessage({ type: 'error', text: 'Please write something or select an image' });
            setUploading(false);
            return;
        }

        const uploadData = new FormData();
        if (text) uploadData.append('text', text);
        if (imageFile) uploadData.append('image', imageFile);

        uploadData.append('userName', user.userName);
        uploadData.append('userId', user.userId);
        uploadData.append('userEmail', user.userEmail);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 30000
            });

            if (res.data.success) {
                setMessage({ type: 'success', text: 'Post created successfully!' });
                formRef.current?.reset();
                setPreview(null);
                setSelectedImage(null);
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to create post. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Create Post
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Share what's on your mind
                    </p>
                </div>

                <Form
                    ref={formRef}
                    onSubmit={onSubmit}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* User Header */}
                    <div className="flex items-center gap-3 p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold shadow-md">
                            SI
                        </div>
                        <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">{user.userName}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Public • Anyone can see</p>
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="p-6">
                        <TextField name="text">
                            <Label className="text-zinc-600 dark:text-zinc-400 text-sm mb-2 block font-medium">
                                What are you thinking?
                            </Label>
                            <Input
                                placeholder="Write something amazing..."
                                as="textarea"
                                className="min-h-[130px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 text-base focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-y"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Image Upload */}
                    <div className="px-6 pb-8">
                        <Label className="text-zinc-600 dark:text-zinc-400 text-sm mb-2 block font-medium">
                            Add Photo (Optional)
                        </Label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />

                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer block border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-zinc-800 rounded-3xl p-12 text-center transition-all duration-200"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mx-auto max-h-64 w-full object-cover rounded-2xl shadow-md"
                                />
                            ) : (
                                <div>
                                    <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-4xl mb-4">
                                        📸
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 font-medium">Tap to upload image</p>
                                    <p className="text-xs text-zinc-400 mt-1">PNG, JPG • Max 10MB</p>
                                </div>
                            )}
                        </label>

                        {selectedImage && (
                            <p className="text-center text-emerald-600 dark:text-emerald-400 text-sm mt-3 font-medium">
                                ✓ {selectedImage.name}
                            </p>
                        )}
                    </div>

                    {/* Status Message */}
                    {message.text && (
                        <div className={`mx-6 mb-6 px-4 py-3 rounded-2xl text-center text-sm font-medium border ${message.type === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Post Button */}
                    <div className="px-6 pb-6">
                        <Button
                            type="submit"
                            isDisabled={uploading}
                            className="w-full py-4 text-lg font-semibold rounded-2xl bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white shadow-lg shadow-black/30 transition-all active:scale-[0.985]"
                        >
                            {uploading ? "Posting..." : "Post Now"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PostCreatePage;