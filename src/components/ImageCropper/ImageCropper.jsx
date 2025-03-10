import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import './cropper.css';
import { Button, Modal } from 'antd';

const ImageCropper = ({ visible, imageUrl, aspectRatio = 4 / 5, onCancel, onCrop }) => {
  const cropperRef = useRef(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const canvas = cropperRef.current?.cropper.getCroppedCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedImage = URL.createObjectURL(blob);
            setCroppedImageUrl(croppedImage);
            onCrop(blob, croppedImage);
          }
        });
      }
    }
  };

  return (
    <Modal
      title="Cắt hình ảnh"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="crop" type="primary" onClick={handleCrop}>
          Cắt ảnh
        </Button>
      ]}
      width={800}
    >
      <div className="cropper-container">
        {imageUrl && (
          <Cropper
            src={imageUrl}
            style={{ height: 400, width: "100%" }}
            aspectRatio={aspectRatio}
            guides={true}
            ref={cropperRef}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            background={false}
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageCropper;
