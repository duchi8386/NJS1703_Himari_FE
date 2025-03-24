import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Space, Image, Typography } from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import ImageCropper from '../ImageCropper/ImageCropper';
import '../ImageUpload/ImageUpload.scss';
import './ImageUploadBlog.scss';

const { Text } = Typography;

const ImageUploadBlog = ({ onChange, value, maxFileSize = 2, acceptedFileTypes = ['image/jpeg', 'image/png'] }) => {
    // Initialize state
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [showCropper, setShowCropper] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [newImageSelected, setNewImageSelected] = useState(false);

    // Handle value prop changes
    useEffect(() => {
        if (typeof value === 'string' && value) {
            setFileList([{
                uid: '-1',
                name: 'current-blog-image.jpg',
                status: 'done',
                url: value
            }]);
        } else if (!value) {
            setFileList([]);
        }
        setNewImageSelected(false);
    }, [value]);

    const handleBeforeUpload = (file) => {
        // Check file size (in MB)
        const isLessThanMaxSize = file.size / 1024 / 1024 < maxFileSize;
        if (!isLessThanMaxSize) {
            message.error(`File phải nhỏ hơn ${maxFileSize}MB!`);
            return Upload.LIST_IGNORE;
        }

        // Check file type
        const isAcceptedType = acceptedFileTypes.includes(file.type);
        if (!isAcceptedType) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
            return Upload.LIST_IGNORE;
        }

        // Convert the file to a data URL for the cropper
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);

        // Prevent auto upload
        return false;
    };

    const handleCropComplete = (blob, croppedImageUrl) => {
        if (!blob) {
            message.error('Có lỗi khi cắt ảnh, vui lòng thử lại');
            return;
        }

        // Create a new File from the blob
        const croppedFile = new File([blob], 'cropped-blog-image.jpg', { type: 'image/jpeg' });

        // Update file list with new cropped image
        const newFileList = [{
            uid: '-1',
            name: 'blog-image.jpg',
            status: 'done',
            url: croppedImageUrl,
            originFileObj: croppedFile
        }];

        setFileList(newFileList);
        setShowCropper(false);
        setNewImageSelected(true);

        // Call onChange prop to pass the cropped file back to the parent component
        if (onChange) {
            onChange(croppedFile);
        }
    };

    const handlePreview = () => {
        if (fileList.length > 0) {
            setPreviewImage(fileList[0].url);
            setPreviewVisible(true);
        }
    };

    const handleCancel = () => {
        setShowCropper(false);
        setPreviewImage('');
    };

    const uploadProps = {
        fileList,
        beforeUpload: handleBeforeUpload,
        onRemove: () => {
            setFileList([]);
            setNewImageSelected(false);
            if (onChange) {
                onChange(null);
            }
        },
        customRequest: ({ onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        },
        showUploadList: false, // Hide the default upload list
    };

    const handleUploadButtonClick = () => {
        // Trigger hidden upload input
        const uploadInput = document.querySelector('.image-upload-blog-container .ant-upload input');
        if (uploadInput) {
            uploadInput.click();
        }
    };

    return (
        <div className="image-upload-blog-container">
            <Space direction="vertical" style={{ width: '100%' }}>
                {/* Simple upload button when no image */}
                {fileList.length < 1 && (
                    <Upload
                        {...uploadProps}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn ảnh blog
                        </Button>
                    </Upload>
                )}

                {/* Preview container when there's an image */}
                {fileList.length > 0 && (
                    <div className="image-preview-container">
                        <div className="image-preview-wrapper">
                            <img
                                src={fileList[0].url}
                                alt="Preview"
                                className="preview-image"
                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                            />
                            <div className="image-preview-overlay">
                                <Space>
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        onClick={handlePreview}
                                    >
                                        Xem ảnh
                                    </Button>
                                </Space>
                            </div>
                        </div>
                        <div className="preview-caption">
                            {newImageSelected ? 'Ảnh đã chọn (chưa lưu)' : 'Ảnh hiện tại'}
                        </div>

                        {/* Controls for replacing or removing the image */}
                        <div className="image-actions" style={{ marginTop: '10px' }}>
                            <Space>
                                <Button
                                    icon={<UploadOutlined />}
                                    onClick={handleUploadButtonClick}
                                >
                                    Chọn ảnh khác
                                </Button>
                                <Upload {...uploadProps}>
                                    <Button
                                        danger
                                        onClick={() => {
                                            setFileList([]);
                                            setNewImageSelected(false);
                                            if (onChange) {
                                                onChange(null);
                                            }
                                        }}
                                    >
                                        Xóa ảnh
                                    </Button>
                                </Upload>
                            </Space>
                        </div>
                    </div>
                )}

                {/* Hidden image preview component */}
                <Image
                    width={200}
                    style={{ display: 'none' }}
                    src={previewImage || (fileList.length > 0 ? fileList[0].url : '')}
                    preview={{
                        visible: previewVisible,
                        onVisibleChange: (visible) => setPreviewVisible(visible),
                        title: newImageSelected ? 'Ảnh đã chọn (chưa lưu)' : 'Ảnh hiện tại',
                    }}
                />
            </Space>

            {/* Image cropper modal */}
            <ImageCropper
                visible={showCropper}
                imageUrl={previewImage}
                aspectRatio={5 / 3}
                onCancel={handleCancel}
                onCrop={handleCropComplete}
            />
        </div>
    );
};

export default ImageUploadBlog;
