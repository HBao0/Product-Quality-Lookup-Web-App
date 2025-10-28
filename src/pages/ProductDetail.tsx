import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, StarIcon, ThumbsUpIcon, ShoppingCartIcon, EditIcon, TrashIcon } from 'lucide-react';
import RatingBar from '../components/products/RatingBar';
// Mock current user (simulating logged in user)
const mockCurrentUser = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com'
};
// Mock product data
const mockProduct = {
  id: 1,
  name: 'Sữa tươi Vinamilk 100% Không đường',
  image: 'https://cdn.tgdd.vn/Products/Images/2386/76453/bhx/sua-tuoi-tiet-trung-co-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104090935140203.jpg',
  price: '28.000đ',
  description: 'Sữa tươi Vinamilk 100% Không đường được làm từ sữa tươi 100% chứa nhiều dưỡng chất tốt cho sức khỏe như canxi, protein, vitamin A, D3, B1, B2... Sản phẩm phù hợp cho những người ăn kiêng, người lớn tuổi cần hạn chế đường.',
  brand: 'Vinamilk',
  origin: 'Việt Nam',
  rating: 4.5,
  positivePercent: 92,
  sentiment: 'positive',
  nutritionFacts: [{
    name: 'Năng lượng',
    value: '60 kcal'
  }, {
    name: 'Chất đạm',
    value: '3.3g'
  }, {
    name: 'Chất béo',
    value: '3.5g'
  }, {
    name: 'Carbohydrate',
    value: '4.7g'
  }, {
    name: 'Canxi',
    value: '124mg'
  }],
  similarProducts: [{
    id: 2,
    name: 'Sữa tươi Vinamilk 100% Ít đường',
    image: 'https://cdn.tgdd.vn/Products/Images/2386/84054/bhx/sua-tuoi-tiet-trung-it-duong-vinamilk-100-sua-tuoi-hop-1-lit-202104101340553912.jpg',
    price: '30.000đ',
    rating: 4.3,
    positivePercent: 88
  }, {
    id: 3,
    name: 'Sữa tươi TH True Milk Không đường',
    image: 'https://cdn.tgdd.vn/Products/Images/2386/195068/bhx/sua-tuoi-tiet-trung-khong-duong-th-true-milk-hop-1-lit-202103312210358693.jpg',
    price: '29.000đ',
    rating: 4.4,
    positivePercent: 90
  }]
};
const ProductDetail = () => {
  const {
    id
  } = useParams();
  const product = mockProduct;
  // Mock reviews state
  const [reviews, setReviews] = useState([{
    id: 1,
    user_id: 1,
    username: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Sữa rất ngon, không ngọt, uống rất thanh mát.',
    created_at: '2024-01-15T10:30:00Z'
  }, {
    id: 2,
    user_id: 2,
    username: 'Trần Thị B',
    rating: 4,
    comment: 'Chất lượng tốt, đóng gói cẩn thận.',
    created_at: '2024-01-14T14:20:00Z'
  }, {
    id: 3,
    user_id: 3,
    username: 'Lê Văn C',
    rating: 3,
    comment: 'Sản phẩm ổn, nhưng hơi đắt.',
    created_at: '2024-01-13T09:15:00Z'
  }]);
  // Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Calculate average rating and total reviews
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const handleSubmitReview = e => {
    e.preventDefault();
    if (!mockCurrentUser) {
      alert('Vui lòng đăng nhập để đánh giá sản phẩm!');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (editingReview) {
        // Update existing review
        setReviews(reviews.map(review => review.id === editingReview.id ? {
          ...review,
          rating: newRating,
          comment: newComment,
          created_at: new Date().toISOString()
        } : review));
        setEditingReview(null);
      } else {
        // Add new review
        const newReview = {
          id: reviews.length + 1,
          user_id: mockCurrentUser.id,
          username: mockCurrentUser.name,
          rating: newRating,
          comment: newComment,
          created_at: new Date().toISOString()
        };
        setReviews([newReview, ...reviews]);
      }
      setNewRating(5);
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };
  const handleEditReview = review => {
    setEditingReview(review);
    setNewRating(review.rating);
    setNewComment(review.comment);
    window.scrollTo({
      top: document.getElementById('review-form').offsetTop - 100,
      behavior: 'smooth'
    });
  };
  const handleDeleteReview = reviewId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
        setIsSubmitting(false);
      }, 500);
    }
  };
  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewRating(5);
    setNewComment('');
  };
  if (!product) {
    return <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Không tìm thấy sản phẩm.</p>
      </div>;
  }
  return <div className="max-w-5xl mx-auto">
      <div className="mb-4">
        <Link to="/products" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          <span>Quay lại danh sách</span>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            </div>
            <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-gray-600">{averageRating}/5</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({totalReviews} đánh giá)
                  </span>
                </div>
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex items-center">
                  <ThumbsUpIcon className="h-5 w-5 text-emerald-500" />
                  <span className="ml-1 text-gray-600">
                    {product.positivePercent}% tích cực
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-emerald-600">
                  {product.price}
                </span>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 mb-2">
                    <span className="text-gray-600 text-sm">Thương hiệu:</span>
                    <span className="ml-2 font-medium">{product.brand}</span>
                  </div>
                  <div className="w-full sm:w-1/2 mb-2">
                    <span className="text-gray-600 text-sm">Xuất xứ:</span>
                    <span className="ml-2 font-medium">{product.origin}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="font-medium">Mô tả sản phẩm</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  <ShoppingCartIcon className="h-4 w-4 mr-2" />
                  Mua trên Shopee
                </a>
                <a href="https://lazada.vn" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  <ShoppingCartIcon className="h-4 w-4 mr-2" />
                  Mua trên Lazada
                </a>
                <a href="https://tiki.vn" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                  <ShoppingCartIcon className="h-4 w-4 mr-2" />
                  Mua trên Tiki
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="md:flex md:space-x-8">
              <div className="md:w-1/2">
                <h3 className="font-medium mb-4">Thông tin dinh dưỡng</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.nutritionFacts.map((fact, index) => <tr key={index} className={index !== 0 ? 'border-t border-gray-200' : ''}>
                          <td className="py-2 text-gray-600">{fact.name}</td>
                          <td className="py-2 text-right font-medium">
                            {fact.value}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <h3 className="font-medium mb-4">Đánh giá cảm xúc</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <RatingBar positive={product.positivePercent} neutral={8} negative={100 - product.positivePercent - 8} />
                  <div className="mt-4 text-sm text-center">
                    <span className="text-emerald-600 font-medium">
                      {product.positivePercent}% đánh giá tích cực
                    </span>
                    <span> về sản phẩm này</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium">Đánh giá từ người dùng</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                  </div>
                  <span className="ml-2 text-lg font-medium">
                    {averageRating}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({totalReviews} đánh giá)
                  </span>
                </div>
              </div>
            </div>
            {/* Review Form */}
            <div id="review-form" className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-medium mb-4">
                {editingReview ? 'Chỉnh sửa đánh giá' : 'Viết đánh giá của bạn'}
              </h4>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => setNewRating(star)} className="focus:outline-none">
                        <StarIcon className={`h-8 w-8 ${star <= newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hover:text-yellow-400 hover:fill-yellow-400 transition-colors`} />
                      </button>)}
                    <span className="ml-2 text-gray-600">
                      ({newRating} sao)
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận xét (Không bắt buộc)
                  </label>
                  <textarea id="comment" rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..." />
                </div>
                <div className="flex space-x-3">
                  <button type="submit" disabled={isSubmitting} className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                    {isSubmitting ? 'Đang xử lý...' : editingReview ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
                  </button>
                  {editingReview && <button type="button" onClick={handleCancelEdit} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                      Hủy
                    </button>}
                </div>
              </form>
            </div>
            {/* Reviews List */}
            {reviews.length > 0 ? <div className="space-y-4">
                {reviews.map(review => <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-gray-900">
                              {review.username}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              {formatDate(review.created_at)}
                            </span>
                          </div>
                          {mockCurrentUser && review.user_id === mockCurrentUser.id && <div className="flex space-x-2">
                                <button onClick={() => handleEditReview(review)} className="text-blue-600 hover:text-blue-800 p-1" title="Chỉnh sửa">
                                  <EditIcon className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDeleteReview(review.id)} className="text-red-600 hover:text-red-800 p-1" title="Xóa">
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>}
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        {review.comment && <p className="text-gray-700 text-sm">
                            {review.comment}
                          </p>}
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Chưa có đánh giá nào, hãy là người đầu tiên đánh giá sản phẩm
                  này!
                </p>
              </div>}
          </div>
          {product.similarProducts.length > 0 && <div className="mt-10 border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-4">Sản phẩm tương tự</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.similarProducts.map(item => <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    </Link>
                    <div className="p-3">
                      <Link to={`/product/${item.id}`} className="block">
                        <h4 className="text-sm font-medium line-clamp-2 hover:text-emerald-600">
                          {item.name}
                        </h4>
                      </Link>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-emerald-600 font-medium">
                          {item.price}
                        </span>
                        <div className="flex items-center">
                          <StarIcon className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-xs">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default ProductDetail;