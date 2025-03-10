import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageCropper from '../ImageCropper/ImageCropper';
import './ImageUpload.scss';

const ImageUpload = ({ onChange, value, maxFileSize = 5, acceptedFileTypes = ['image/jpeg', 'image/png'] }) => {
  // Initialize state with proper URL checking
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [showCropper, setShowCropper] = useState(false);

  // Properly handle the value prop changes
  useEffect(() => {
    // Only set fileList if value is a string (valid URL)
    if (typeof value === 'string' && value) {
      setFileList([{ 
        uid: '-1', 
        name: 'current-image.jpg', 
        status: 'done', 
        url: value 
      }]);
    } else if (!value) {
      // Reset fileList if value is falsy
      setFileList([]);
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
    const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
    
    // Update file list with new cropped image
    const newFileList = [{
      uid: '-1',
      name: 'hinh-anh.jpg',
      status: 'done',
      url: croppedImageUrl,
      originFileObj: croppedFile
    }];
    
    setFileList(newFileList);
    setShowCropper(false);
    
    // Call onChange prop to pass the cropped file back to the parent component
    if (onChange) {
      onChange(croppedFile);
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
      if (onChange) {
        onChange(null);
      }
    },
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
  };

  return (
    <div className="image-upload-container">
      <Upload
        {...uploadProps}
        listType="picture"
      >
        {fileList.length < 1 && (
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        )}
      </Upload>
      
      <ImageCropper
        visible={showCropper}
        imageUrl={previewImage}
        aspectRatio={4/5}
        onCancel={handleCancel}
        onCrop={handleCropComplete}
      />
    </div>
  );
};

export default ImageUpload;
