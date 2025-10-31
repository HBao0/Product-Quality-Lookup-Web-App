import React, { useState } from 'react';
import { UserIcon, ClockIcon, HistoryIcon, LogOutIcon } from 'lucide-react';
import { type Conversation } from '../types';
// Mock data for user
const mockUser = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  joinDate: '01/01/2023',
};
// Mock data for search history
const mockSearchHistory = [
  {
    id: 1,
    query: 'Sữa tươi Vinamilk',
    timestamp: '2023-10-01T10:30:00Z',
  },
  {
    id: 2,
    query: 'Mì Hảo Hảo',
    timestamp: '2023-09-28T14:45:00Z',
  },
  {
    id: 3,
    query: 'Nước mắm Nam Ngư',
    timestamp: '2023-09-25T09:15:00Z',
  },
];
// Mock data for conversation history
const mockConversations: Conversation[] = [
  {
    id: 1,
    title: 'Tìm kiếm sữa tươi không đường',
    lastMessage: 'Tôi muốn tìm sữa tươi không đường chất lượng cao',
    timestamp: '2023-10-01T10:30:00Z',
    messages: [
      {
        id: 1,
        content: 'Tôi muốn tìm sữa tươi không đường chất lượng cao',
        sender: 'user',
        timestamp: '2023-10-01T10:30:00Z',
      },
      {
        id: 2,
        content:
          'Tôi đã tìm thấy một số sản phẩm phù hợp với yêu cầu của bạn. Vinamilk và TH True Milk đều có sản phẩm sữa tươi không đường chất lượng cao.',
        sender: 'bot',
        timestamp: '2023-10-01T10:31:00Z',
      },
    ],
  },
  {
    id: 2,
    title: 'So sánh các loại nước mắm',
    lastMessage: 'Nước mắm nào tốt nhất hiện nay?',
    timestamp: '2023-09-28T14:45:00Z',
    messages: [
      {
        id: 1,
        content: 'Nước mắm nào tốt nhất hiện nay?',
        sender: 'user',
        timestamp: '2023-09-28T14:45:00Z',
      },
      {
        id: 2,
        content:
          'Dựa trên đánh giá của người dùng, nước mắm Nam Ngư và Phú Quốc đang được đánh giá cao về chất lượng.',
        sender: 'bot',
        timestamp: '2023-09-28T14:46:00Z',
      },
    ],
  },
];
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tài khoản của tôi</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex items-center px-4 py-3 ${activeTab === 'profile' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('profile')}
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Thông tin cá nhân
          </button>
          <button
            className={`flex items-center px-4 py-3 ${activeTab === 'search-history' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('search-history')}
          >
            <ClockIcon className="h-5 w-5 mr-2" />
            Lịch sử tìm kiếm
          </button>
          <button
            className={`flex items-center px-4 py-3 ${activeTab === 'conversations' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => {
              setActiveTab('conversations');
              setSelectedConversation(null);
            }}
          >
            <HistoryIcon className="h-5 w-5 mr-2" />
            Lịch sử trò chuyện
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    value={mockUser.name}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={mockUser.email}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày tham gia
                  </label>
                  <input
                    type="text"
                    value={mockUser.joinDate}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="flex justify-between">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Cập nhật thông tin
                  </button>
                  <button className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'search-history' && (
            <div>
              <h3 className="font-medium mb-4">Lịch sử tìm kiếm gần đây</h3>
              {mockSearchHistory.length > 0 ? (
                <div className="space-y-3">
                  {mockSearchHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">{item.query}</p>
                        <p className="text-sm text-gray-500">{formatDate(item.timestamp)}</p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                        Tìm lại
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Bạn chưa có lịch sử tìm kiếm nào.</p>
              )}
            </div>
          )}
          {activeTab === 'conversations' && !selectedConversation && (
            <div>
              <h3 className="font-medium mb-4">Lịch sử trò chuyện</h3>
              {mockConversations.length > 0 ? (
                <div className="space-y-3">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div>
                        <p className="font-medium">{conversation.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(conversation.timestamp)}
                        </p>
                      </div>
                      <div className="text-emerald-600">
                        <HistoryIcon className="h-5 w-5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Bạn chưa có cuộc trò chuyện nào.</p>
              )}
            </div>
          )}
          {activeTab === 'conversations' && selectedConversation && (
            <div>
              <div className="flex items-center mb-4">
                <button
                  className="text-emerald-600 mr-2"
                  onClick={() => setSelectedConversation(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <h3 className="font-medium">{selectedConversation.title}</h3>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(selectedConversation.timestamp)}
                </span>
              </div>
              <div className="bg-gray-50 rounded-md p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
                    >
                      <div>{message.content}</div>
                      <div className="text-xs mt-1 opacity-70">{formatDate(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
