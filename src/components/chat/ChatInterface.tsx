import { useEffect, useState, useRef, type KeyboardEvent } from 'react';
import { SendIcon, ImageIcon, BarcodeIcon, Loader2Icon } from 'lucide-react';
import ChatBubble from './ChatBubble';
import { type Message, type Product } from '../../types';
// Mock data for product suggestions
const mockProducts = [
  {
    id: 1,
    name: 'Sữa tươi Vinamilk',
    image:
      'https://cdn.tgdd.vn/Products/Images/2386/76453/bhx/sua-tuoi-tiet-trung-co-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104090935140203.jpg',
    rating: 4.5,
    positivePercent: 92,
    sentiment: 'positive',
    price: '28.000đ',
    links: {
      shopee: 'https://shopee.vn',
      lazada: 'https://lazada.vn',
      tiki: 'https://tiki.vn',
    },
  },
  {
    id: 2,
    name: 'Mì Hảo Hảo',
    image:
      'https://cdn-crownx.winmart.vn/images/prod/162428358148210451508-KG-Mi-Hao-Hao-tom-chua-cay-goi-75g.jpg',
    rating: 4.2,
    positivePercent: 85,
    sentiment: 'positive',
    price: '3.500đ',
    links: {
      shopee: 'https://shopee.vn',
      lazada: 'https://lazada.vn',
      tiki: 'https://tiki.vn',
    },
  },
];
/**
 * ChatInterface
 *
 * Giao diện chat dùng để trao đổi với trợ lý ảo. Tính năng chính:
 * - Hiển thị luồng tin nhắn (`Message[]`) và cuộn về cuối khi có tin nhắn mới
 * - Cho phép gửi tin nhắn văn bản, tải ảnh (mock) và điều hướng đến trang quét mã vạch
 * - Khi bot phản hồi, `suggestions` có thể chứa `Product[]` để hiển thị gợi ý sản phẩm
 *
 * Lưu ý: hiện tại các phản hồi và sản phẩm gợi ý là mock; khi tích hợp API, thay
 * các setTimeout bằng gọi API thực sự và xử lý trạng thái lỗi/loading phù hợp.
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        'Xin chào! Tôi là trợ lý VietChoice. Bạn có thể nhập tên sản phẩm, quét mã vạch hoặc tải lên hình ảnh để tra cứu thông tin sản phẩm.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Ref to the scrollable messages container so we only scroll that element
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // scroll the container itself to avoid moving the whole window
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: 'Tôi đã tìm thấy một số sản phẩm phù hợp với yêu cầu của bạn:',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: mockProducts as Product[],
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleImageUpload = () => {
    alert('Tính năng tải lên hình ảnh sẽ được triển khai sau!');
  };
  const handleBarcodeScanner = () => {
    window.location.href = '/scanner';
  };
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} suggestions={message.suggestions} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2Icon className="animate-spin h-5 w-5 mr-2 text-emerald-600" />
            <span className="text-gray-600">Đang tìm kiếm...</span>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleBarcodeScanner}
            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
            title="Quét mã vạch"
          >
            <BarcodeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleImageUpload}
            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
            title="Tải lên hình ảnh"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tên sản phẩm bạn muốn tìm..."
            className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className={`p-2 rounded-full ${input.trim() === '' ? 'bg-gray-200 text-gray-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatInterface;
