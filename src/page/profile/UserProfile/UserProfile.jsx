import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Tribiboi',
    fullName: 'Trần Đức Trí',
    gender: 'Nữ',
    points: '1000',
    phone: '0123456789',
    email: 'Tribiboi@fpt.edu.vn'
  });

  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Xử lý lưu dữ liệu
    setIsEditing(false);
  };

  const renderField = (label, value, field) => {
    return (
      <div className="flex mb-4">
        <label className="w-32 font-bold text-gray-700">{label}:</label>
        <div>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setUserData({...userData, [field]: e.target.value})}
              className="w-full p-1 border rounded"
              readOnly={field === 'username' || field === 'points'}
            />
          ) : (
            <span>{value}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex gap-20">
        <div className="flex-grow">
          <div>
            {renderField('Username', userData.username, 'username')}
            
            <div className="flex mb-4">
              <label className="w-32 font-bold text-gray-700">Họ và tên:</label>
              <div>

                {isEditing ? (
                  <input
                    type="text"
                    value={userData.fullName}
                    onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                    className="w-[200px] p-1 border rounded"
                  />
                ) : (
                  <span>{userData.fullName}</span>
                )}
              </div>
              <label className="w-20 font-bold text-gray-700 ml-8">Giới tính:</label>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.gender}
                    onChange={(e) => setUserData({...userData, gender: e.target.value})}
                    className="w-20 p-1 border rounded"
                  />
                ) : (
                  <span>{userData.gender}</span>
                )}
              </div>
            </div>

            {renderField('Điểm', userData.points, 'points')}
            {renderField('Số điện thoại', userData.phone, 'phone')}
            {renderField('Email', userData.email, 'email')}
          </div>

          <div className="mt-6">
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="px-6 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Lưu thay đổi
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        {/* Ảnh đại diện bên phải */}
        <div className="w-48">
          <div className="text-center">
            <div className="mb-4">
              <img
                src={avatar || "/ranger.png"}
                alt="Profile"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <div className="space-y-2">
              <button 
                className="text-center w-full cursor-pointer hover:text-blue-600"
                onClick={() => document.getElementById('avatar-upload').click()}
              >
                Choose image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatar-upload"
              />
              <p className="text-xs text-gray-500">
                Dung lượng file tối đa 1 MB
                <br />
                Định dạng: JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;