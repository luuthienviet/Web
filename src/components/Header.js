import React, { useState, useRef, useEffect } from 'react'; // Import useRef và useEffect
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../puplic/SearchBar';
import { useAuth } from '../AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Header({ onSearch }) {
    const { currentUser, logout, isLoading } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    // Refs để tham chiếu đến div chứa icon người dùng và dropdown menu
    const userMenuRef = useRef(null);
    const dropdownTimeoutRef = useRef(null); // Ref để lưu timeout của dropdown

    const handleLogout = () => {
        logout();
        setDropdownVisible(false); // Ẩn dropdown sau khi logout
    };

    const goToProfile = () => {
        navigate('/profile'); // Điều hướng đến trang hồ sơ
        setDropdownVisible(false); // Ẩn dropdown
    };

    // Hàm để mở dropdown khi chuột vào
    const handleMouseEnter = () => {
        // Xóa bất kỳ timeout nào đang chờ để ẩn menu (nếu có)
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setDropdownVisible(true);
    };

    // Hàm để đóng dropdown khi chuột rời đi, có độ trễ
    const handleMouseLeave = () => {
        // Đặt timeout để ẩn menu sau một khoảng thời gian ngắn (ví dụ: 200ms)
        // Điều này cho phép người dùng di chuyển chuột sang menu con mà không bị mất
        dropdownTimeoutRef.current = setTimeout(() => {
            setDropdownVisible(false);
        }, 200); // Độ trễ 200ms
    };

    // Hàm để bật/tắt dropdown khi click vào icon người dùng
    const handleUserIconClick = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền ra ngoài
        setDropdownVisible(prev => !prev);
    };

    // Hook useEffect để xử lý việc đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Nếu click không nằm trong userMenuRef (bao gồm cả icon và dropdown)
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        // Thêm event listener khi dropdown hiển thị
        if (dropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Xóa event listener khi dropdown ẩn
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function: Xóa event listener khi component unmount
        // hoặc khi dropdownVisible thay đổi trạng thái (false)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Đảm bảo clear timeout nếu component bị unmount hoặc trạng thái thay đổi
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, [dropdownVisible]); // Chỉ chạy lại khi dropdownVisible thay đổi

    if (isLoading) {
        return (
            <header className="relative w-full px-6 py-4 bg-white shadow-md flex items-center justify-between h-20">
                <div className="text-4xl font-bold text-gray-800 whitespace-nowrap z-10">
                    <span className="text-blue-800">L</span>
                    <span className="text-orange-500">T</span>
                    <span className="text-green-600">V</span>
                </div>
                <div className="flex items-center gap-4 whitespace-nowrap z-10">
                    <span>Đang tải...</span>
                </div>
            </header>
        );
    }

    return (
        <header className="relative w-full px-6 py-4 bg-white shadow-md flex items-center justify-between h-20">
            {/* Logo */}
            <div className="text-4xl font-bold text-gray-800 whitespace-nowrap z-10">
                <span className="text-blue-800">L</span>
                <span className="text-orange-500">T</span>
                <span className="text-green-600">V</span>
            </div>

            {/* Thanh tìm kiếm căn giữa */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-0">
                <SearchBar onSearch={onSearch} />
            </div>

            {/* Menu phải */}
            <div className="flex items-center gap-4 whitespace-nowrap z-10">
                <Link to="/" className="text-black hover:text-rose-600">Trang chủ</Link>
                <Link to="/gioi-thieu" className="text-black hover:text-rose-600">Giới thiệu</Link>

                {currentUser ? (
                    // Thêm ref vào div bao ngoài cùng của icon và dropdown
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter} // Hover để mở
                        onMouseLeave={handleMouseLeave} // Hover để đóng (có trễ)
                        ref={userMenuRef} // Gán ref ở đây
                    >
                        <button
                            type="button"
                            className="flex items-center text-black hover:text-rose-600 focus:outline-none"
                            aria-label="User menu"
                            onClick={handleUserIconClick} // Click để bật/tắt
                        >
                            <FaUserCircle size={28} /> {/* Sử dụng icon */}
                        </button>
                        {dropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                                <button
                                    onClick={goToProfile}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Hồ sơ người dùng
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/register" className="text-black hover:text-rose-600">Đăng Ký</Link>
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
