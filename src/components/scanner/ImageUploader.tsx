import { type FC, useState, useRef } from 'react';
import { UploadIcon, ImageIcon, XIcon, Loader2Icon } from 'lucide-react';
import { type Product } from '../../types';

/**
 * ImageUploader
 *
 * Component cho phép người dùng upload ảnh (kéo/thả hoặc chọn file) và
 * gửi ảnh để nhận diện (OCR). Sau khi xử lý (mock), component hiển thị
 * kết quả OCR và gợi ý sản phẩm.
 *
 * Lưu ý: hiện tại logic OCR và suggestedProducts được mô phỏng bằng `setTimeout`.
 * Khi tích hợp dịch vụ OCR thực tế, thay phần mock bằng gọi API và xử lý lỗi/loading.
 */
const ImageUploader: FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setOcrResult(null);
      setSuggestedProducts([]);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setOcrResult(null);
      setSuggestedProducts([]);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const resetImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setOcrResult(null);
    setSuggestedProducts([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const processImage = () => {
    if (!selectedImage) return;
    setIsLoading(true);
    // Simulate API call to OCR service
    setTimeout(() => {
      setOcrResult('Sữa tươi Vinamilk 100% Không đường 1L');
      // Mock suggested products based on OCR
      setSuggestedProducts([
        {
          id: 1,
          name: 'Sữa tươi Vinamilk 100% Không đường 1L',
          image:
            'https://cdn.tgdd.vn/Products/Images/2386/76453/bhx/sua-tuoi-tiet-trung-co-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104090935140203.jpg',
          price: '28.000đ',
          rating: 4.5,
          positivePercent: 92,
        },
        {
          id: 2,
          name: 'Sữa tươi Vinamilk 100% Ít đường 1L',
          image:
            'https://cdn.tgdd.vn/Products/Images/2386/84054/bhx/sua-tuoi-tiet-trung-it-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104101340553912.jpg',
          price: '30.000đ',
          rating: 4.3,
          positivePercent: 88,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full max-w-md border-2 border-dashed rounded-lg p-6 text-center ${previewUrl ? 'border-emerald-300' : 'border-gray-300'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!previewUrl ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
            <div className="text-gray-600">
              <p className="text-sm">Kéo và thả ảnh vào đây hoặc</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="mt-2 inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-emerald-700"
              >
                Chọn ảnh
              </label>
            </div>
            <p className="text-xs text-gray-500">Chấp nhận định dạng JPG, PNG</p>
          </div>
        ) : (
          <div className="relative">
            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded" />
            <button
              onClick={resetImage}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {previewUrl && !ocrResult && (
        <button
          onClick={processImage}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
              Đang xử lý...
            </>
          ) : (
            <>
              <UploadIcon className="h-5 w-5 mr-2" />
              Xử lý ảnh
            </>
          )}
        </button>
      )}
      {ocrResult && (
        <div className="w-full max-w-md mt-6">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">Kết quả nhận diện:</h3>
            <p className="text-gray-700 bg-white p-2 rounded border border-gray-200">{ocrResult}</p>
          </div>
          {suggestedProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Sản phẩm gợi ý:</h3>
              <div className="space-y-4">
                {suggestedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow p-3 flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-emerald-600">{product.price}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{product.rating}/5</span>
                        <span className="mx-2">•</span>
                        <span>{product.positivePercent}% tích cực</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ImageUploader;
