import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Check,
  Settings,
  Globe
} from 'lucide-react';

const AuthFallback = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const currentOrigin = window.location.origin;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-400 mb-2">
            Google Sign-In Configuration Issues
          </h3>
          <p className="text-gray-300 mb-4">
            There are configuration issues with Google authentication. This could be due to origin restrictions or Firebase project mismatch.
          </p>
          
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-red-300 mb-2 flex items-center">
                🚨 Critical: Origin Mismatch Error 400
              </h4>
              <p className="text-sm text-red-200 mb-2">
                Google is blocking your origin. You need to add your current origin to Google Cloud Console:
              </p>
              <div className="text-xs text-red-200 space-y-1 bg-black/30 rounded p-2">
                <div><strong>Error:</strong> "origin_mismatch" or "The given origin is not allowed"</div>
                <div><strong>Current Origin:</strong> <code className="text-green-300">{window.location.origin}</code></div>
                <div><strong>Solution:</strong> Add this exact origin to your Google OAuth client</div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Setup Instructions:
              </h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li><strong>Firebase Console:</strong> Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center">Firebase Console <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                <li>Select your project → Authentication → Sign-in method</li>
                <li>Click on "Google" provider and copy the "Web SDK configuration"</li>
                <li>Use that Client ID in your environment variables</li>
                <li><strong>OR</strong> Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center">Google Cloud Console <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                <li>Navigate to "APIs & Services" → "Credentials"</li>
                <li>Create or edit your OAuth 2.0 Client ID</li>
                <li>Add this origin to "Authorized JavaScript origins":</li>
              </ol>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Current Origin:
                </span>
                <motion.button
                  onClick={() => copyToClipboard(currentOrigin)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-2 py-1 rounded flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
              <code className="text-sm text-green-400 bg-black/50 px-3 py-2 rounded block font-mono">
                {currentOrigin}
              </code>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Common Development Origins:
              </h4>
              <div className="space-y-1 text-xs text-gray-400 font-mono">
                <div>• http://localhost:3000</div>
                <div>• http://localhost:5173 (Vite default)</div>
                <div>• http://127.0.0.1:5173</div>
                <div>• Your production domain</div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              💡 <strong>Tip:</strong> Add both localhost and 127.0.0.1 with your port number to cover all development scenarios.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthFallback;
