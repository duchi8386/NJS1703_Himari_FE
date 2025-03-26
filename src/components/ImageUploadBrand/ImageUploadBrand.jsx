import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageCropper from '../ImageCropper/ImageCropper';

const ImageUploadBrand = ({ initialImage, onImageChange, value }) => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [cropperVisible, setCropperVisible] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState('');

    // Initialize or reset component when initialImage changes
    useEffect(() => {
        // Reset state when component mounts or initialImage changes
        if (initialImage) {
            setPreviewImage(initialImage);
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: initialImage,
            }]);
        } else {
            setPreviewImage('');
            setFileList([]);
        }
    }, [initialImage]);

    const handleBeforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên file hình ảnh!');
            return Upload.LIST_IGNORE;
        }

        // Create temporary URL for cropper
        const url = URL.createObjectURL(file);
        setTempImageUrl(url);
        setCropperVisible(true);
        return false; // Prevent auto upload
    };

    const handleRemove = () => {
        setFileList([]);
        setPreviewImage('');
        onImageChange(null);
    };

    const handleCropCancel = () => {
        setCropperVisible(false);
        setTempImageUrl('');
    };

    const handleCropFinish = (blob, croppedImageUrl) => {
        setCropperVisible(false);

        // Create a file from blob
        const file = new File([blob], "cropped-image.png", { type: "image/png" });

        // Update file list with new cropped image
        setFileList([{
            uid: "-1",
            name: file.name,
            status: "done",
            originFileObj: file,
        }]);

        setPreviewImage(croppedImageUrl);
        onImageChange(file);
    };

    const uploadProps = {
        onRemove: handleRemove,
        beforeUpload: handleBeforeUpload,
        fileList,
        listType: "picture",
        maxCount: 1,
    };

    return (
        <>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                    {fileList.length > 0 ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
                </Button>
            </Upload>

            {previewImage && (
                <div className="mt-2">
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                    />
                </div>
            )}

            <ImageCropper
                visible={cropperVisible}
                imageUrl={tempImageUrl}
                aspectRatio={2 / 1}
                onCancel={handleCropCancel}
                onCrop={handleCropFinish}
            />
        </>
    );
};

export default ImageUploadBrand;
