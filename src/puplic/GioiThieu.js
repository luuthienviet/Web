import { CheckCircle, ThumbsUp, Smile } from 'lucide-react';

const BenefitsAndReviews = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-800">
      {/* Tiêu đề */}
      <h1 className="text-5xl font-extrabold text-center mb-12">
        Giới Thiệu Giày Thể Thao Siêu Nhẹ
      </h1>

      {/* Hình ảnh & Mô tả */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
          alt="Giày thể thao"
          className="rounded-2xl shadow-xl w-full md:w-1/2"
        />
        <div className="flex-1 text-lg leading-relaxed">
          <p className="mb-4">
            Đôi giày thể thao cao cấp này mang lại cảm giác thoải mái và phong cách hiện đại.
            Với thiết kế năng động, chất liệu thoáng khí và đế siêu nhẹ, bạn có thể tự tin vận động
            cả ngày mà không lo đau chân.
          </p>
          <p>
            Dù bạn là người yêu thích thể thao, đi dạo phố, hay đơn giản là cần một đôi giày chất lượng,
            đôi giày này là lựa chọn lý tưởng cho bạn.
          </p>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Thông số kỹ thuật</h2>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-left text-base">
          <tbody>
            <tr className="bg-gray-200 border-b border-gray-300">
              <td className="px-4 py-3 font-semibold">Chất liệu</td>
              <td className="px-4 py-3">Vải lưới thoáng khí, đế cao su</td>
            </tr>
            <tr className="bg-gray-100 border-b border-gray-300">
              <td className="px-4 py-3 font-semibold">Màu sắc</td>
              <td className="px-4 py-3">Đen, Trắng, Xanh navy, Đỏ</td>
            </tr>
            <tr className="bg-gray-200 border-b border-gray-300">
              <td className="px-4 py-3 font-semibold">Kích cỡ</td>
              <td className="px-4 py-3">36 - 45</td>
            </tr>
            <tr className="bg-gray-100 border-b border-gray-300">
              <td className="px-4 py-3 font-semibold">Trọng lượng</td>
              <td className="px-4 py-3">Chỉ 220g mỗi chiếc</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="px-4 py-3 font-semibold">Đối tượng</td>
              <td className="px-4 py-3">Nam & Nữ</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lý do chọn */}
      <h2 className="text-3xl font-bold text-center mt-20 mb-10">Tại sao nên chọn chúng tôi?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
          <CheckCircle className="mx-auto text-blue-500 mb-3" size={32} />
          <h3 className="text-xl font-bold mb-2 text-blue-700">Thoải mái tuyệt đối</h3>
          <p className="text-gray-700">
            Thiết kế ôm chân và chất liệu co giãn giúp bạn di chuyển linh hoạt suốt cả ngày.
          </p>
        </div>
        <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
          <ThumbsUp className="mx-auto text-green-600 mb-3" size={32} />
          <h3 className="text-xl font-bold mb-2 text-green-700">Bền bỉ vượt trội</h3>
          <p className="text-gray-700">
            Chịu lực tốt, khó bong tróc, chống trơn trượt giúp bạn yên tâm sử dụng lâu dài.
          </p>
        </div>
        <div className="bg-pink-50 border-2 border-pink-300 p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
          <Smile className="mx-auto text-pink-600 mb-3" size={32} />
          <h3 className="text-xl font-bold mb-2 text-pink-700">Phong cách trẻ trung</h3>
          <p className="text-gray-700">
            Thiết kế hợp thời trang phù hợp với mọi loại trang phục.
          </p>
        </div>
      </div>

      {/* Đánh giá khách hàng */}
      <h2 className="text-3xl font-bold text-center mt-20 mb-10">Đánh giá từ khách hàng</h2>
      <div className="space-y-6">
        {/* Đánh giá 1 */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-lg text-gray-800 italic mb-4">
            “Giày mang cực kỳ êm và nhẹ, đi cả ngày không đau chân. 10 điểm!”
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40?img=15"
              alt="Minh Tú"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold text-gray-800">Minh Tú</span>
          </div>
        </div>

        {/* Đánh giá 2 */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <p className="text-lg text-gray-800 italic mb-4">
            “Phong cách rất trẻ trung, phối đồ nào cũng hợp. Mình đã mua thêm đôi thứ 2.”
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40?img=32"
              alt="Quang Huy"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold text-gray-800">Quang Huy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsAndReviews;
