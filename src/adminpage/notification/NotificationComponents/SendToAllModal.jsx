import React from 'react';
import { Modal } from 'antd';

const SendToAllModal = ({ isOpen, onClose, onSendToAll, notification, loading }) => {
  return (
    <Modal
      title="Gửi thông báo cho tất cả người dùng"
      open={isOpen}
      onCancel={onClose}
      onOk={onSendToAll}
      okText="Xác nhận gửi cho tất cả"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      {notification && (
        <div>
          <div className="mb-4">
            <p className="font-medium mb-1">Thông báo:</p>
            <p className="text-blue-600 font-bold">{notification.title}</p>
            <p className="text-gray-600 mt-2">{notification.message}</p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
            <p className="text-yellow-800">
              <strong>Lưu ý:</strong> Thông báo này sẽ được gửi đến <strong>tất cả người dùng</strong> trong hệ thống. 
              Hành động này không thể hoàn tác.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SendToAllModal;