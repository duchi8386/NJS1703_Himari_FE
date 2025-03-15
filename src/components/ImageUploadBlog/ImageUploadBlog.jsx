import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Space, Image, Row, Col, Card, Typography } from 'antd';
import { UploadOutlined, EyeOutlined, SwapOutlined } from '@ant-design/icons';
import ImageCropper from '../ImageCropper/ImageCropper';
import '../ImageUpload/ImageUpload.scss';
import './ImageUploadBlog.scss';

const { Text, Title } = Typography;

const ImageUploadBlog = ({ onChange, value, maxFileSize = 2, acceptedFileTypes = ['image/jpeg', 'image/png'] }) => {
    // Initialize state with proper URL checking
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [showCropper, setShowCropper] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [originalImage, setOriginalImage] = useState('');
    const [showComparison, setShowComparison] = useState(false);

    // Properly handle the value prop changes
    useEffect(() => {
        console.log("Value changed in ImageUploadBlog:", value);
        // Only set fileList if value is a string (valid URL)
        if (typeof value === 'string' && value) {
            setFileList([{
                uid: '-1',
                name: 'current-blog-image.jpg',
                status: 'done',
                url: value
            }]);
            setOriginalImage(value);
        } else if (!value) {
            // Reset fileList if value is falsy
            setFileList([]);
            setOriginalImage('');
        }
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

        // If there was an original image, show the comparison
        if (originalImage) {
            setShowComparison(true);
        }

        // Call onChange prop to pass the cropped file back to the parent component
        if (onChange) {
            onChange(croppedFile);
        }
    };

    const handlePreview = () => {
        setPreviewVisible(true);
    };

    const handleCancel = () => {
        setShowCropper(false);
        setPreviewImage('');
    };

    const toggleComparison = () => {
        setShowComparison(!showComparison);
    };

    const uploadProps = {
        fileList,
        beforeUpload: handleBeforeUpload,
        onRemove: () => {
            setFileList([]);
            setShowComparison(false);
            if (onChange) {
                onChange(null);
            }
        },
        customRequest: ({ onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        },
        showUploadList: fileList.length > 0 && !showComparison ? {
            showPreviewIcon: false,
            showRemoveIcon: true,
        } : false,
    };

    return (
        <div className="image-upload-blog-container">
            <Space direction="vertical" style={{ width: '100%' }}>
                {!showComparison && (
                    <Upload
                        {...uploadProps}
                        listType="picture"
                    >
                        {fileList.length < 1 && (
                            <Button icon={<UploadOutlined />}>Chọn ảnh blog</Button>
                        )}
                    </Upload>
                )}

                {showComparison && (
                    <div className="image-comparison">
                        <div className="comparison-header">
                            <Title level={5}>So sánh hình ảnh</Title>
                            <Space>
                                <Button
                                    icon={<SwapOutlined />}
                                    onClick={toggleComparison}
                                >
                                    Ẩn so sánh
                                </Button>
                            </Space>
                        </div>

                        <Row gutter={16} className="comparison-row">
                            <Col span={12}>
                                <Card
                                    title="Ảnh hiện tại"
                                    className="comparison-card original"
                                    extra={
                                        <Button
                                            size="small"
                                            type="text"
                                            icon={<EyeOutlined />}
                                            onClick={() => {
                                                setPreviewImage(originalImage);
                                                setPreviewVisible(true);
                                            }}
                                        />
                                    }
                                >
                                    <div className="image-wrapper">
                                        <img src={originalImage} alt="Original" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    title="Ảnh mới (chưa lưu)"
                                    className="comparison-card new"
                                    extra={
                                        <Button
                                            size="small"
                                            type="text"
                                            icon={<EyeOutlined />}
                                            onClick={() => {
                                                setPreviewImage(fileList[0].url);
                                                setPreviewVisible(true);
                                            }}
                                        />
                                    }
                                >
                                    <div className="image-wrapper">
                                        <img src={fileList[0].url} alt="New" />
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <div className="comparison-actions">
                            <Button
                                type="primary"
                                onClick={() => {
                                    setShowComparison(false);
                                }}
                            >
                                Giữ ảnh mới
                            </Button>
                            <Button
                                danger
                                onClick={() => {
                                    // Reset to original image
                                    setFileList([{
                                        uid: '-1',
                                        name: 'current-blog-image.jpg',
                                        status: 'done',
                                        url: originalImage
                                    }]);
                                    setShowComparison(false);
                                    if (onChange) {
                                        onChange(null); // Signal no change to parent
                                    }
                                }}
                            >
                                Giữ ảnh cũ
                            </Button>
                        </div>
                    </div>
                )}

                {!showComparison && fileList.length > 0 && (
                    <div className="image-preview-container">
                        <div className="image-preview-wrapper">
                            <img
                                src={fileList[0].url}
                                alt="Preview"
                                className="preview-image"
                            />
                            <div className="image-preview-overlay">
                                <Space>
                                    {/* <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        onClick={handlePreview}
                                    >
                                        Xem ảnh
                                    </Button> */}

                                    {originalImage && fileList[0].originFileObj && (
                                        <Button
                                            icon={<SwapOutlined />}
                                            onClick={toggleComparison}
                                        >
                                            So sánh
                                        </Button>
                                    )}
                                </Space>
                            </div>
                        </div>
                        <div className="preview-caption">
                            {fileList[0].originFileObj ? 'Ảnh đã chỉnh sửa (chưa lưu)' : 'Ảnh hiện tại'}
                        </div>
                    </div>
                )}

                {/* Always render upload button for blog image regardless of fileList */}
                {!showComparison && (
                    <div className={fileList.length > 0 ? 'additional-upload-button' : ''}>
                        {fileList.length > 0 && (
                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => {
                                    // Trigger hidden upload input
                                    const uploadInput = document.querySelector('.image-upload-blog-container .ant-upload input');
                                    if (uploadInput) {
                                        uploadInput.click();
                                    }
                                }}
                            >
                                Chọn ảnh khác
                            </Button>
                        )}
                    </div>
                )}

                <Image
                    width={200}
                    style={{ display: 'none' }}
                    src={previewImage || (fileList.length > 0 ? fileList[0].url : '')}
                    preview={{
                        visible: previewVisible,
                        onVisibleChange: (visible) => setPreviewVisible(visible),
                        title: previewImage === originalImage ? 'Ảnh hiện tại' :
                            (fileList.length > 0 && fileList[0].originFileObj ?
                                'Ảnh đã chỉnh sửa (chưa lưu)' : 'Ảnh hiện tại'),
                    }}
                />
            </Space>

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
