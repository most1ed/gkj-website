import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  LayoutGridIcon, 
  FileTextIcon, 
  ImageIcon, 
  VideoIcon 
} from 'lucide-react';

interface TabItem {
  label: string;
  icon?: React.ReactNode;
  content: string | React.ReactNode;
}

interface TabsProps {
  tabs?: TabItem[];
  variant?: 'default' | 'boxed' | 'underline';
  alignment?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
  activeColor?: string;
}

const defaultProps: TabsProps = {
  tabs: [
    {
      label: 'Description',
      icon: <FileTextIcon size={16} />,
      content: 'This is the description tab content.',
    },
    {
      label: 'Images',
      icon: <ImageIcon size={16} />,
      content: 'This is the images tab content.',
    },
    {
      label: 'Videos',
      icon: <VideoIcon size={16} />,
      content: 'This is the videos tab content.',
    },
  ],
  variant: 'default',
  alignment: 'left',
  fullWidth: false,
  activeColor: '#3b82f6', // Tailwind blue-500
};

const TabsSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const addTab = () => {
    setProp((props: TabsProps) => {
      props.tabs?.push({ 
        label: `Tab ${(props.tabs?.length || 0) + 1}`, 
        content: 'New tab content' 
      });
    });
  };

  const updateTab = (index: number, updates: Partial<TabItem>) => {
    setProp((props: TabsProps) => {
      if (props.tabs) {
        props.tabs[index] = { ...props.tabs[index], ...updates };
      }
    });
  };

  const removeTab = (index: number) => {
    setProp((props: TabsProps) => {
      if (props.tabs) {
        props.tabs.splice(index, 1);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Variant</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="default"
              checked={props.variant === 'default'}
              onChange={() =>
                setProp((props: TabsProps) => (props.variant = 'default'))
              }
            />
            Default
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="boxed"
              checked={props.variant === 'boxed'}
              onChange={() =>
                setProp((props: TabsProps) => (props.variant = 'boxed'))
              }
            />
            Boxed
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="underline"
              checked={props.variant === 'underline'}
              onChange={() =>
                setProp((props: TabsProps) => (props.variant = 'underline'))
              }
            />
            Underline
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alignment</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="left"
              checked={props.alignment === 'left'}
              onChange={() =>
                setProp((props: TabsProps) => (props.alignment = 'left'))
              }
            />
            Left
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="center"
              checked={props.alignment === 'center'}
              onChange={() =>
                setProp((props: TabsProps) => (props.alignment = 'center'))
              }
            />
            Center
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="right"
              checked={props.alignment === 'right'}
              onChange={() =>
                setProp((props: TabsProps) => (props.alignment = 'right'))
              }
            />
            Right
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="fullWidth"
          checked={props.fullWidth}
          onChange={(e) =>
            setProp((props: TabsProps) => (props.fullWidth = e.target.checked))
          }
        />
        <label htmlFor="fullWidth" className="text-sm">Full Width Tabs</label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Active Color</label>
        <input
          type="color"
          value={props.activeColor}
          onChange={(e) =>
            setProp((props: TabsProps) => (props.activeColor = e.target.value))
          }
          className="w-full h-10 p-1 border rounded"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Tabs</h3>
          <button 
            onClick={addTab}
            className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
          >
            + Add Tab
          </button>
        </div>
        {props.tabs?.map((tab, index) => (
          <div key={index} className="border rounded p-3 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Tab {index + 1}</h4>
              {props.tabs && props.tabs.length > 1 && (
                <button 
                  onClick={() => removeTab(index)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Tab Label"
                value={tab.label}
                onChange={(e) => updateTab(index, { label: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Tab Content"
                value={typeof tab.content === 'string' ? tab.content : ''}
                onChange={(e) => updateTab(index, { content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Tabs = ({
  tabs,
  variant,
  alignment,
  fullWidth,
  activeColor,
}: TabsProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative',
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
    >
      <div
        className={cn(
          'flex',
          alignment === 'left' && 'justify-start',
          alignment === 'center' && 'justify-center',
          alignment === 'right' && 'justify-end'
        )}
      >
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 transition-colors',
              variant === 'default' && [
                'border-b-2',
                activeTab === index 
                  ? `border-[${activeColor}] text-black` 
                  : 'border-transparent text-gray-500 hover:text-black'
              ],
              variant === 'boxed' && [
                'border rounded-t-md',
                activeTab === index 
                  ? `bg-[${activeColor}] text-white` 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              ],
              variant === 'underline' && [
                'border-b-2',
                activeTab === index 
                  ? `border-[${activeColor}] text-black` 
                  : 'border-transparent text-gray-500 hover:text-black'
              ],
              fullWidth && 'flex-1'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs && tabs[activeTab]?.content}
      </div>
    </div>
  );
};

Tabs.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: TabsSettings,
  },
};
