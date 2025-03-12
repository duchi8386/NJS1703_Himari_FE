import React, { useState } from 'react';

const Location = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, text: 'S1.02 vinhomes grandpark, Long Thạnh Mỹ', isEditing: false },
    { id: 2, text: 'S1.02 vinhomes grandpark, Long Thạnh Mỹ', isEditing: false }
  ]);

  const handleEdit = (id) => {
    setAddresses(addresses.map(addr => addr.id === id ? { ...addr, isEditing: true } : addr));
  };

  const handleSave = (id, newText) => {
    setAddresses(addresses.map(addr => addr.id === id ? { ...addr, text: newText, isEditing: false } : addr));
  };

  return (
    <div className=" font-sans max-w-2xl mx-auto">
      <h3 className="text-lg font-bold mb-4">Địa chỉ</h3>

      {addresses.map((addr) => (
        <div key={addr.id} className="mb-3">
          <div className="flex items-center">
            <div className="flex-grow">
              {addr.isEditing ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded bg-white"
                  defaultValue={addr.text}
                  onBlur={(e) => handleSave(addr.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave(addr.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="block px-3 py-2 bg-gray-200 rounded-lg">{addr.text}</span>
              )}
            </div>
            <div className="ml-4 flex items-center gap-2">
              {addr.isEditing ? (
                <button className="w-24 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleSave(addr.id, addr.text)}>Lưu</button>
              ) : (
                <button className="w-24 px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded hover:bg-gray-100">Cập nhật</button>
              )}
              <button className={`w-40 px-4 py-2 text-sm rounded ${addr.id === 1 ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                {addr.id === 1 ? 'Mặc định' : 'Đặt làm mặc định'}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-right mt-4">
        <button className="px-4 py-2 text-sm border rounded hover:bg-gray-100">Thêm địa chỉ mới</button>
      </div>
    </div>
  );
};

export default Location;