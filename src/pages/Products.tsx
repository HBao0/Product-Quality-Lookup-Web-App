import React, { useState } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { type Product } from '../types';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sữa tươi Vinamilk 100% Không đường',
    image:
      'https://cdn.tgdd.vn/Products/Images/2386/76453/bhx/sua-tuoi-tiet-trung-co-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104090935140203.jpg',
    price: '28.000đ',
    rating: 4.5,
    positivePercent: 92,
    sentiment: 'positive',
    brand: 'Vinamilk',
    origin: 'Việt Nam',
  },
  {
    id: 2,
    name: 'Mì Hảo Hảo Tôm Chua Cay',
    image:
      'https://cdn-crownx.winmart.vn/images/prod/162428358148210451508-KG-Mi-Hao-Hao-tom-chua-cay-goi-75g.jpg',
    price: '3.500đ',
    rating: 4.2,
    positivePercent: 85,
    sentiment: 'positive',
    brand: 'Acecook',
    origin: 'Việt Nam',
  },
  {
    id: 3,
    name: 'Nước mắm Nam Ngư 10 độ đạm',
    image:
      'https://cdn.tgdd.vn/Products/Images/2289/76308/bhx/nuoc-mam-nam-ngu-10-do-dam-chai-500ml-202104091458283563.jpg',
    price: '32.000đ',
    rating: 4.0,
    positivePercent: 80,
    sentiment: 'positive',
    brand: 'Masan',
    origin: 'Việt Nam',
  },
  {
    id: 4,
    name: 'Dầu ăn Tường An',
    image:
      'https://cdn.tgdd.vn/Products/Images/2286/76428/bhx/dau-an-tuong-an-chai-1-lit-202103271500141414.jpg',
    price: '45.000đ',
    rating: 4.3,
    positivePercent: 87,
    sentiment: 'positive',
    brand: 'Tường An',
    origin: 'Việt Nam',
  },
  {
    id: 5,
    name: 'Nước ngọt Coca Cola',
    image:
      'https://cdn.tgdd.vn/Products/Images/2443/76453/bhx/nuoc-ngot-coca-cola-chai-1.5-lit-202104091457424303.jpg',
    price: '18.000đ',
    rating: 4.1,
    positivePercent: 82,
    sentiment: 'positive',
    brand: 'Coca Cola',
    origin: 'Việt Nam',
  },
  {
    id: 6,
    name: "Snack khoai tây Lay's",
    image:
      'https://cdn.tgdd.vn/Products/Images/3364/79607/bhx/snack-khoai-tay-lays-vi-tom-goi-52g-202205301111494511.jpg',
    price: '12.000đ',
    rating: 4.4,
    positivePercent: 89,
    sentiment: 'positive',
    brand: "Lay's",
    origin: 'Việt Nam',
  },
];
const categories = [
  {
    id: 'all',
    name: 'Tất cả',
  },
  {
    id: 'milk',
    name: 'Sữa',
  },
  {
    id: 'noodle',
    name: 'Mì gói',
  },
  {
    id: 'sauce',
    name: 'Nước mắm',
  },
  {
    id: 'oil',
    name: 'Dầu ăn',
  },
  {
    id: 'beverage',
    name: 'Đồ uống',
  },
  {
    id: 'snack',
    name: 'Bánh kẹo',
  },
];
const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  // Filter products based on search term
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center w-full md:w-auto">
          <button
            className="flex items-center text-sm text-gray-600 hover:text-emerald-600 md:ml-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="h-4 w-4 mr-1" />
            Bộ lọc
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Danh mục</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-sm rounded-full ${selectedCategory === category.id ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
        </div>
      )}
    </div>
  );
};
export default Products;
