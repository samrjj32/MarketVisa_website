'use client';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

export default function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-md">
      <div className="flex items-start gap-3">
        <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-green-800">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-green-500 hover:text-green-700"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
} 