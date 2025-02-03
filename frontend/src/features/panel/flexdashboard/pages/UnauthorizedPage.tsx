import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-6">
          <Lock size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
          Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/panel/dashboard" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
          <Link 
            to="/login" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
