import { type FC, useEffect, useState } from 'react';
import { CameraIcon, XIcon, Loader2Icon } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { type Product } from '../../types';

/**
 * BarcodeScanner
 *
 * Component dùng để quét mã vạch bằng camera (sử dụng `html5-qrcode`).
 * - Bắt đầu/quét/stop scanner
 * - Hiển thị kết quả mã vạch đã quét
 * - Mô phỏng gọi API lấy thông tin sản phẩm dựa trên mã (mock)
 *
 * Khi tích hợp API thực, thay phần mock trong `onScanSuccess` bằng fetch/axios
 * và xử lý lỗi/throttling/camera permission tương ứng.
 */
const BarcodeScanner: FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const startScanner = () => {
    setIsScanning(true);
    setScanResult(null);
    setProduct(null);
    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
      },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanError);
    function onScanSuccess(decodedText: string) {
      setScanResult(decodedText);
      setIsScanning(false);
      html5QrcodeScanner.clear();
      // Simulate API call to get product by barcode
      setIsLoading(true);
      setTimeout(() => {
        setProduct({
          id: 1,
          name: 'Sữa tươi Vinamilk 100% Không đường',
          image:
            'https://cdn.tgdd.vn/Products/Images/2386/76453/bhx/sua-tuoi-tiet-trung-co-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104090935140203.jpg',
          price: '28.000đ',
          origin: 'Việt Nam',
          brand: 'Vinamilk',
          rating: 4.5,
          positivePercent: 92,
          sentiment: 'positive',
        });
        setIsLoading(false);
      }, 1500);
    }
    function onScanError(error: string) {
      console.warn(`Code scan error = ${error}`);
    }
  };
  const stopScanner = () => {
    setIsScanning(false);
  };
  useEffect(() => {
    return () => {
      // Cleanup
      if (isScanning) {
        const html5QrCode = document.getElementById('qr-reader');
        if (html5QrCode) {
          html5QrCode.innerHTML = '';
        }
      }
    };
  }, [isScanning]);
  return (
    <div className="flex flex-col items-center">
      {!isScanning && !scanResult && (
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Quét mã vạch để tìm kiếm thông tin sản phẩm nhanh chóng
          </p>
          <button
            onClick={startScanner}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            Bắt đầu quét
          </button>
        </div>
      )}
      {isScanning && (
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Đưa mã vạch vào khung hình</h3>
            <button onClick={stopScanner} className="text-gray-500 hover:text-gray-700">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div id="qr-reader" className="w-full"></div>
        </div>
      )}
      {scanResult && (
        <div className="w-full max-w-md mt-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-2">Kết quả quét:</h3>
            <p className="text-gray-700 font-mono bg-white p-2 rounded border border-gray-200">
              {scanResult}
            </p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center mt-6">
          <Loader2Icon className="animate-spin h-6 w-6 mr-2 text-emerald-600" />
          <span>Đang tìm thông tin sản phẩm...</span>
        </div>
      )}
      {product && (
        <div className="w-full max-w-md mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-emerald-600 font-medium mt-1">{product.price}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Thương hiệu: {product.brand}</p>
                  <p>Xuất xứ: {product.origin}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Đánh giá:</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★</span>
                  <span className="text-yellow-300">★</span>
                  <span className="ml-1 text-sm font-medium">{product.rating}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Đánh giá tích cực:</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-2 bg-emerald-500 rounded-full"
                      style={{
                        width: `${product.positivePercent}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{product.positivePercent}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cảm xúc:</span>
                <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                  Tích cực
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-3">
              <a
                href="https://shopee.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded-md"
              >
                Mua trên Shopee
              </a>
              <a
                href="https://lazada.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md"
              >
                Mua trên Lazada
              </a>
              <a
                href="https://tiki.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-teal-500 text-white text-sm rounded-md"
              >
                Mua trên Tiki
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BarcodeScanner;
