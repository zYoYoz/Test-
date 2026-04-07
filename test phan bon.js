import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    LayoutDashboard,
    Home,
    PlusCircle,
    TrendingUp,
    Search,
    ShoppingCart,
    User,
    Filter,
    Package,
    Eye,
    MousePointer2,
    DollarSign,
    ChevronRight,
    Star,
    CheckCircle2
} from 'lucide-react';

const App = () => {
    const [view, setView] = useState('home'); // home, shop, ads, cart, profile
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data: Products
    const products = [
        { id: 1, name: 'Phân bón NPK 20-20-15', price: 750000, category: 'Vô cơ', rating: 4.8, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400', stock: 150 },
        { id: 2, name: 'Phân Gà Hữu Cơ Nhật Bản', price: 320000, category: 'Hữu cơ', rating: 4.9, img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=400', stock: 85 },
        { id: 3, name: 'Đạm Ure Cà Mau', price: 580000, category: 'Vô cơ', rating: 4.5, img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400', stock: 200 },
        { id: 4, name: 'Phân Bón Vi Lượng Combi', price: 45000, category: 'Vi lượng', rating: 4.7, img: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=400', stock: 500 },
        { id: 5, name: 'Lân Lâm Thao', price: 210000, category: 'Vô cơ', rating: 4.6, img: 'https://images.unsplash.com/photo-1622383529357-37ae49f99ed4?auto=format&fit=crop&q=80&w=400', stock: 300 },
        { id: 6, name: 'Phân Trùn Quế Nguyên Chất', price: 120000, category: 'Hữu cơ', rating: 5.0, img: 'https://images.unsplash.com/photo-1581273275455-a223f668f495?auto=format&fit=crop&q=80&w=400', stock: 45 },
    ];

    // Mock Data: Ads
    const adCampaigns = [
        { id: 1, title: 'Khuyến mãi Hè rực rỡ', status: 'Đang chạy', views: 12540, clicks: 840, ctr: '6.7%', spent: 4500000 },
        { id: 2, title: 'Ra mắt NPK Thế hệ mới', status: 'Tạm dừng', views: 5200, clicks: 120, ctr: '2.3%', spent: 1200000 },
        { id: 3, title: 'Ưu đãi đại lý miền Tây', status: 'Đang chạy', views: 25800, clicks: 2100, ctr: '8.1%', spent: 12500000 },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
        // Simple message box logic instead of alert
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transform transition-all duration-500 translate-y-0';
        toast.innerHTML = `Đã thêm ${product.name} vào giỏ hàng!`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => document.body.removeChild(toast), 500);
        }, 3000);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // --- Components ---

    const Navbar = () => (
        <nav className="bg-white border-b sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Package className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-green-800 tracking-tight">AGRI-ADS</span>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phân bón..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 rounded-full transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setView('shop')} className={`flex flex-col items-center gap-1 ${view === 'shop' ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}>
                            <ShoppingBag className="w-6 h-6" />
                            <span className="text-[10px] uppercase font-bold">Cửa hàng</span>
                        </button>
                        <button onClick={() => setView('ads')} className={`flex flex-col items-center gap-1 ${view === 'ads' ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}>
                            <LayoutDashboard className="w-6 h-6" />
                            <span className="text-[10px] uppercase font-bold">Quản lý QC</span>
                        </button>
                        <button onClick={() => setView('cart')} className={`relative flex flex-col items-center gap-1 ${view === 'cart' ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}>
                            <ShoppingCart className="w-6 h-6" />
                            <span className="text-[10px] uppercase font-bold">Giỏ hàng</span>
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden cursor-pointer border border-gray-300">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=15803d&color=fff" alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

    const HomeView = () => (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center bg-green-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1599839619722-397514112634?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover"
                        alt="Farm"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        Năng Suất Vàng <br /><span className="text-green-400">Từ Phân Bón Sạch</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-xl">
                        Cung cấp giải pháp dinh dưỡng tối ưu cho cây trồng của bạn. Mua lẻ giá sỉ, giao hàng tận nơi trên toàn quốc.
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => setView('shop')} className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                            Mua Sắm Ngay
                        </button>
                        <button onClick={() => setView('ads')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-3 rounded-lg font-bold border border-white/30 transition-all">
                            Quảng Cáo Sản Phẩm
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
                        <p className="text-gray-500 mt-2">Dòng phân bón bán chạy nhất tháng này</p>
                    </div>
                    <button onClick={() => setView('shop')} className="text-green-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        Xem tất cả <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border overflow-hidden group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                    {product.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
                                    <span className="text-gray-400 text-xs ml-2 font-medium">{product.rating}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                                <p className="text-green-700 font-bold text-lg mb-4">{formatCurrency(product.price)}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full bg-gray-50 hover:bg-green-600 hover:text-white text-green-700 py-2 rounded-lg font-bold border border-green-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" /> Thêm giỏ hàng
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ad Showcase */}
            <section className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-green-600 font-bold tracking-widest uppercase text-sm">Dành cho Nhà cung cấp</span>
                            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Gia tăng doanh số với Hệ thống Quảng cáo tích hợp</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Đưa sản phẩm của bạn đến đúng đối tượng khách hàng mục tiêu là các hộ nông dân và đại lý trên toàn quốc. Theo dõi hiệu quả theo thời gian thực.
                            </p>
                            <ul className="space-y-3">
                                {['Tiếp cận 10.000+ nông dân mỗi ngày', 'Tỷ lệ chuyển đổi (CTR) trung bình 5-8%', 'Quản lý ngân sách linh hoạt', 'Báo cáo minh bạch, chi tiết'].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle2 className="text-green-500 w-5 h-5" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setView('ads')} className="bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-all">
                                Truy cập Dashboard QC
                            </button>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-green-100">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold text-gray-800">Hiệu quả chiến dịch</span>
                                    <TrendingUp className="text-green-500" />
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Lượt xem', value: '45.2K', color: 'bg-blue-500', width: '85%' },
                                        { label: 'Lượt Click', value: '3.8K', color: 'bg-green-500', width: '65%' },
                                        { label: 'Đơn hàng', value: '420', color: 'bg-orange-500', width: '40%' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 font-medium">{stat.label}</span>
                                                <span className="text-gray-900 font-bold">{stat.value}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: stat.width }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-2xl shadow-xl hidden lg:block">
                                <p className="text-xs uppercase font-bold opacity-80">ROI trung bình</p>
                                <p className="text-2xl font-bold">12.5x</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    const ShopView = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-green-600" /> Danh mục
                        </h3>
                        <div className="space-y-2">
                            {['Tất cả', 'Phân hữu cơ', 'Phân vô cơ', 'Phân vi lượng', 'Thuốc bảo vệ thực vật'].map((cat, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="radio" name="category" className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300" defaultChecked={i === 0} />
                                    <span className="text-gray-600 group-hover:text-green-700 transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Khoảng giá</h3>
                        <input type="range" className="w-full accent-green-600" />
                        <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                            <span>0đ</span>
                            <span>2.000.000đ+</span>
                        </div>
                    </div>
                    <div className="bg-green-900 rounded-2xl p-6 text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <p className="text-xs font-bold opacity-75 uppercase mb-2">Ưu đãi đại lý</p>
                            <h4 className="text-xl font-bold mb-4 leading-tight">Mua từ 20 bao <br />Giảm ngay 15%</h4>
                            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                Xem chi tiết
                            </button>
                        </div>
                        <div className="absolute -bottom-4 -right-4 opacity-20">
                            <Package className="w-24 h-24 rotate-12" />
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Tất cả sản phẩm ({products.length})</h1>
                        <select className="bg-white border rounded-lg px-4 py-2 outline-none text-sm font-medium text-gray-700">
                            <option>Mới nhất</option>
                            <option>Giá thấp đến cao</option>
                            <option>Giá cao đến thấp</option>
                            <option>Phổ biến nhất</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border overflow-hidden">
                                <div className="h-56 overflow-hidden">
                                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                            {product.category}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">Kho: {product.stock}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 h-12 line-clamp-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-700 font-extrabold text-xl">{formatCurrency(product.price)}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-all"
                                        >
                                            <PlusCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );

    const AdsDashboardView = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Quảng cáo</h1>
                    <p className="text-gray-500 mt-2">Chào Admin! Đây là hiệu suất các chiến dịch hiện tại của bạn.</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all">
                    <PlusCircle className="w-5 h-5" /> Tạo chiến dịch mới
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Tổng ngân sách', value: '25.000.000đ', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Tổng hiển thị', value: '142.5K', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Tổng lượt click', value: '8.4K', icon: MousePointer2, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Chi phí/Click (CPC)', value: '1.200đ', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Campaign List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-800">Danh sách chiến dịch</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-bold text-green-600 bg-green-50 rounded-lg">Tất cả</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">Đang chạy</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">Tạm dừng</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Chiến dịch</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4">Lượt xem</th>
                                <th className="px-6 py-4">Lượt Click</th>
                                <th className="px-6 py-4">CTR</th>
                                <th className="px-6 py-4 text-right">Chi phí</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {adCampaigns.map((camp) => (
                                <tr key={camp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-gray-900 block">{camp.title}</span>
                                        <span className="text-xs text-gray-400">ID: CAM-00{camp.id}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${camp.status === 'Đang chạy' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-gray-600 font-medium">{camp.views.toLocaleString()}</td>
                                    <td className="px-6 py-5 text-gray-600 font-medium">{camp.clicks.toLocaleString()}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-900 font-bold">{camp.ctr}</span>
                                            <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: camp.ctr }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-gray-900">{formatCurrency(camp.spent)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const CartView = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Giỏ hàng của bạn</h1>
                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">Giỏ hàng của bạn còn trống</p>
                        <button onClick={() => setView('shop')} className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all">
                            Tiếp tục mua sắm
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-6 bg-white p-5 rounded-2xl shadow-sm border items-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                        <p className="text-green-700 font-bold">{formatCurrency(item.price)}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center border rounded-lg overflow-hidden">
                                                <button className="px-3 py-1 hover:bg-gray-100 text-gray-500">-</button>
                                                <span className="px-4 font-bold text-sm">1</span>
                                                <button className="px-3 py-1 hover:bg-gray-100 text-gray-500">+</button>
                                            </div>
                                            <button className="text-red-500 text-sm font-bold hover:underline" onClick={() => setCart(cart.filter((_, i) => i !== idx))}>Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border h-fit sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Phí vận chuyển</span>
                                    <span>Mẫu phí</span>
                                </div>
                                <div className="pt-4 border-t flex justify-between items-center font-bold text-lg">
                                    <span>Tổng cộng</span>
                                    <span className="text-green-700 text-2xl">{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-100 transition-all">
                                Thanh toán ngay
                            </button>
                            <p className="text-center text-gray-400 text-xs mt-4">
                                Đảm bảo an toàn và bảo mật 100%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // --- Main Layout ---
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            {view === 'home' && <HomeView />}
            {view === 'shop' && <ShopView />}
            {view === 'ads' && <AdsDashboardView />}
            {view === 'cart' && <CartView />}

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <Package className="text-white w-6 h-6" />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">AGRI-ADS</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Nền tảng kết nối trực tiếp nhà sản xuất phân bón chất lượng cao với bà con nông dân. Sứ mệnh mang lại giá trị bền vững cho nông nghiệp Việt.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Mua sắm</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Phân hữu cơ</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Phân vô cơ</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Dinh dưỡng lá</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Bộ sưu tập mới</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Đối tác</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Đăng ký Đại lý</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Dịch vụ Quảng cáo</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Chính sách vận chuyển</li>
                                <li className="hover:text-green-400 cursor-pointer transition-colors">Báo cáo thị trường</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Đăng ký nhận tin</h4>
                            <p className="text-xs mb-4">Nhận báo giá và khuyến mãi mới nhất qua email.</p>
                            <div className="flex">
                                <input type="email" placeholder="Email của bạn" className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-green-500 outline-none text-sm" />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2024 AGRI-ADS - Sàn thương mại điện tử vật tư nông nghiệp.</p>
                        <div className="flex gap-6 uppercase font-bold tracking-tighter opacity-60">
                            <span className="hover:opacity-100 cursor-pointer">Facebook</span>
                            <span className="hover:opacity-100 cursor-pointer">Zalo</span>
                            <span className="hover:opacity-100 cursor-pointer">Youtube</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;