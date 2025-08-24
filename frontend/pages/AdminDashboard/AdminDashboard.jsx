import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUsers, 
    FaBuilding, 
    FaFlag, 
    FaChartBar, 
    FaCog, 
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUserShield,
    FaBell
} from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const admin = localStorage.getItem('adminData');
        
        if (!token || !admin) {
            navigate('/admin/login');
            return;
        }

        setAdminData(JSON.parse(admin));
        fetchAnalytics();
    }, [navigate]);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:3000/api/admin/analytics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Total Users</p>
                            <p className="text-3xl font-bold">{analytics?.summary?.total?.users || 0}</p>
                            <p className="text-blue-200 text-xs">+{analytics?.summary?.weekly?.users || 0} this week</p>
                        </div>
                        <FaUsers className="h-8 w-8 text-blue-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium">Companies</p>
                            <p className="text-3xl font-bold">{analytics?.summary?.total?.companies || 0}</p>
                            <p className="text-green-200 text-xs">+{analytics?.summary?.weekly?.companies || 0} this week</p>
                        </div>
                        <FaBuilding className="h-8 w-8 text-green-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Employees</p>
                            <p className="text-3xl font-bold">{analytics?.summary?.total?.employees || 0}</p>
                            <p className="text-purple-200 text-xs">+{analytics?.summary?.weekly?.employees || 0} this week</p>
                        </div>
                        <FaUsers className="h-8 w-8 text-purple-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-100 text-sm font-medium">Reports</p>
                            <p className="text-3xl font-bold">{analytics?.summary?.total?.contentReports || 0}</p>
                            <p className="text-yellow-200 text-xs">Total Reports</p>
                        </div>
                        <FaFlag className="h-8 w-8 text-yellow-200" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Registrations</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {analytics?.recent?.users?.slice(0, 5).map((user, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-900">{user.username}</span>
                                    <span className="text-xs text-gray-500 ml-2">{user.email}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                        {analytics?.recent?.companies?.slice(0, 3).map((company, index) => (
                            <div key={`company-${index}`} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-900">{company.companyName}</span>
                                    <span className="text-xs text-gray-500 ml-2">{company.industry}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(company.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                        {(!analytics?.recent?.users || analytics.recent.users.length === 0) && 
                         (!analytics?.recent?.companies || analytics.recent.companies.length === 0) && (
                            <div className="text-center text-gray-500 text-sm py-4">
                                No recent registrations
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Statistics</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">{analytics?.summary?.monthly?.users || 0}</p>
                                <p className="text-xs text-blue-600">Users This Month</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{analytics?.summary?.monthly?.companies || 0}</p>
                                <p className="text-xs text-green-600">Companies This Month</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <p className="text-2xl font-bold text-purple-600">{analytics?.summary?.monthly?.employees || 0}</p>
                                <p className="text-xs text-purple-600">Employees This Month</p>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-600">{analytics?.summary?.yearly?.users || 0}</p>
                                <p className="text-xs text-yellow-600">Users This Year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Search
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium">JD</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                                            <div className="text-sm text-gray-500">john.doe@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    john.doe@example.com
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Suspend</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium">JS</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                                            <div className="text-sm text-gray-500">jane.smith@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    jane.smith@example.com
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-green-600 hover:text-green-900">Activate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderCompanies = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Company Management</h3>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Search
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">TechCorp</h4>
                                <p className="text-sm text-gray-600">Technology</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">contact@techcorp.com</p>
                            <p className="text-sm text-gray-600">San Francisco, CA</p>
                            <div className="flex space-x-2">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    Verified
                                </span>
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                View Details
                            </button>
                            <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">InnovateLab</h4>
                                <p className="text-sm text-gray-600">Research</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">hello@innovatelab.com</p>
                            <p className="text-sm text-gray-600">Boston, MA</p>
                            <div className="flex space-x-2">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Pending
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200">
                                Approve
                            </button>
                            <button className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200">
                                Reject
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">D</span>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">DataFlow</h4>
                                <p className="text-sm text-gray-600">Analytics</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">info@dataflow.com</p>
                            <p className="text-sm text-gray-600">Austin, TX</p>
                            <div className="flex space-x-2">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    Verified
                                </span>
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                View Details
                            </button>
                            <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderModeration = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Content Moderation</h3>
                    <div className="flex space-x-3">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all">All Priority</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 mr-3">
                                        Urgent
                                    </span>
                                    <span className="text-sm text-gray-600">User Profile Report</span>
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Inappropriate Content Detected</h4>
                                <p className="text-gray-700 mb-3">User profile contains offensive language and inappropriate images that violate community guidelines.</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Reported by: user123</span>
                                    <span>2 hours ago</span>
                                    <span>Status: Pending</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                                    Remove Content
                                </button>
                                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                                    Suspend User
                                </button>
                                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-3">
                                        High
                                    </span>
                                    <span className="text-sm text-gray-600">Company Profile Report</span>
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Fake Information Suspected</h4>
                                <p className="text-gray-700 mb-3">Company claims to be based in multiple locations with conflicting information about services offered.</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Reported by: company456</span>
                                    <span>1 day ago</span>
                                    <span>Status: Under Review</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                    Request Verification
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                                    Remove Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mr-3">
                                        Medium
                                    </span>
                                    <span className="text-sm text-gray-600">Job Posting Report</span>
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Spam Content</h4>
                                <p className="text-gray-700 mb-3">Job posting appears to be automated spam with generic content and suspicious contact information.</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>Reported by: employee789</span>
                                    <span>3 days ago</span>
                                    <span>Status: Resolved</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                                    Mark Resolved
                                </button>
                                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
            <p className="text-gray-600">Analytics and reporting interface will be implemented here.</p>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <p className="text-gray-600">System settings interface will be implemented here.</p>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            {sidebarOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Admin Dashboard</h1>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                            <FaBell className="h-5 w-5" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <FaUserShield className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{adminData?.username}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="h-full flex flex-col">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'overview'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaChartBar className="mr-3 h-5 w-5" />
                                    Overview
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'users'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaUsers className="mr-3 h-5 w-5" />
                                    Users
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('companies')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'companies'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaBuilding className="mr-3 h-5 w-5" />
                                    Companies
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('moderation')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'moderation'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaFlag className="mr-3 h-5 w-5" />
                                    Moderation
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'analytics'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaChartBar className="mr-3 h-5 w-5" />
                                    Analytics
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                                        activeTab === 'settings'
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <FaCog className="mr-3 h-5 w-5" />
                                    Settings
                                </button>
                            </nav>
                        </div>
                        
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                            >
                                <FaSignOutAlt className="mr-3 h-5 w-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                        <div className="py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                {activeTab === 'overview' && renderOverview()}
                                {activeTab === 'users' && renderUsers()}
                                {activeTab === 'companies' && renderCompanies()}
                                {activeTab === 'moderation' && renderModeration()}
                                {activeTab === 'analytics' && renderAnalytics()}
                                {activeTab === 'settings' && renderSettings()}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
