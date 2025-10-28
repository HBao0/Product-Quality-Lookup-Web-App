import React from 'react';
import { ThumbsUpIcon, MinusIcon, ThumbsDownIcon } from 'lucide-react';
const RatingBar = ({
  positive,
  neutral,
  negative
}) => {
  return <div className="space-y-3">
      <div className="flex items-center">
        <div className="w-20 flex items-center">
          <ThumbsUpIcon className="h-4 w-4 text-emerald-500 mr-2" />
          <span className="text-sm">Tích cực</span>
        </div>
        <div className="flex-1 mx-2">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{
            width: `${positive}%`
          }}></div>
          </div>
        </div>
        <div className="w-10 text-right text-sm font-medium">{positive}%</div>
      </div>
      <div className="flex items-center">
        <div className="w-20 flex items-center">
          <MinusIcon className="h-4 w-4 text-blue-500 mr-2" />
          <span className="text-sm">Trung lập</span>
        </div>
        <div className="flex-1 mx-2">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{
            width: `${neutral}%`
          }}></div>
          </div>
        </div>
        <div className="w-10 text-right text-sm font-medium">{neutral}%</div>
      </div>
      <div className="flex items-center">
        <div className="w-20 flex items-center">
          <ThumbsDownIcon className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-sm">Tiêu cực</span>
        </div>
        <div className="flex-1 mx-2">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{
            width: `${negative}%`
          }}></div>
          </div>
        </div>
        <div className="w-10 text-right text-sm font-medium">{negative}%</div>
      </div>
    </div>;
};
export default RatingBar;