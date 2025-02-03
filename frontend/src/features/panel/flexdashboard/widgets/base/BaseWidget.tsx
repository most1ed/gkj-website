import { BaseWidgetProps } from '../../types/dashboard.types';

const BaseWidget: React.FC<BaseWidgetProps> = ({ 
  id, 
  title, 
  children 
}) => {
  return (
    <div 
      id={id} 
      className="bg-white shadow-md rounded-lg p-4 w-full h-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default BaseWidget;
