import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  ChevronDownIcon, 
  MinusIcon, 
  PlusIcon 
} from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items?: AccordionItem[];
  variant?: 'default' | 'minimal' | 'bordered';
  expandIcon?: 'chevron' | 'plus-minus';
  multiExpand?: boolean;
  defaultOpenIndex?: number[];
}

const defaultProps: AccordionProps = {
  items: [
    {
      title: 'What is Lorem Ipsum?',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      title: 'Why do we use it?',
      content: 'It is a long established fact that a reader will be distracted by the readable content.',
    },
    {
      title: 'Where does it come from?',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    },
  ],
  variant: 'default',
  expandIcon: 'chevron',
  multiExpand: false,
  defaultOpenIndex: [0],
};

export const Accordion = ({
  items,
  variant,
  expandIcon,
  multiExpand,
  defaultOpenIndex,
}: AccordionProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex || []
  );

  const toggleAccordion = (index: number) => {
    if (multiExpand) {
      setOpenIndexes(prev => 
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const renderExpandIcon = (isOpen: boolean, index: number) => {
    switch (expandIcon) {
      case 'plus-minus':
        return isOpen ? <MinusIcon size={16} /> : <PlusIcon size={16} />;
      default:
        return (
          <ChevronDownIcon 
            size={16} 
            className={cn(
              'transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        );
    }
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'w-full',
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
    >
      {items?.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div 
            key={index} 
            className={cn(
              'mb-2',
              variant === 'bordered' && 'border rounded-md',
              variant === 'minimal' && 'border-b last:border-b-0'
            )}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={cn(
                'w-full flex items-center justify-between p-4 text-left transition-colors',
                variant === 'default' && [
                  'hover:bg-gray-100',
                  isOpen && 'bg-gray-100',
                ],
                variant === 'bordered' && [
                  'border-b',
                  isOpen && 'bg-blue-50 border-blue-200',
                ],
                variant === 'minimal' && [
                  'hover:bg-gray-50',
                  isOpen && 'bg-gray-100',
                ]
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-medium">{item.title}</span>
              </div>
              <span>
                {renderExpandIcon(isOpen, index)}
              </span>
            </button>

            {isOpen && (
              <div 
                className={cn(
                  'p-4 bg-white',
                  variant === 'bordered' && 'rounded-b-md',
                  variant === 'minimal' && 'border-t'
                )}
              >
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AccordionSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const addAccordionItem = () => {
    setProp((props: AccordionProps) => {
      props.items?.push({ 
        title: `Accordion Item ${(props.items?.length || 0) + 1}`, 
        content: 'New accordion content' 
      });
    });
  };

  const updateAccordionItem = (index: number, updates: Partial<AccordionItem>) => {
    setProp((props: AccordionProps) => {
      if (props.items) {
        props.items[index] = { ...props.items[index], ...updates };
      }
    });
  };

  const removeAccordionItem = (index: number) => {
    setProp((props: AccordionProps) => {
      if (props.items) {
        props.items.splice(index, 1);
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
                setProp((props: AccordionProps) => (props.variant = 'default'))
              }
            />
            Default
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="minimal"
              checked={props.variant === 'minimal'}
              onChange={() =>
                setProp((props: AccordionProps) => (props.variant = 'minimal'))
              }
            />
            Minimal
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="bordered"
              checked={props.variant === 'bordered'}
              onChange={() =>
                setProp((props: AccordionProps) => (props.variant = 'bordered'))
              }
            />
            Bordered
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Expand Icon</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="chevron"
              checked={props.expandIcon === 'chevron'}
              onChange={() =>
                setProp((props: AccordionProps) => (props.expandIcon = 'chevron'))
              }
            />
            Chevron
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="plus-minus"
              checked={props.expandIcon === 'plus-minus'}
              onChange={() =>
                setProp((props: AccordionProps) => (props.expandIcon = 'plus-minus'))
              }
            />
            Plus/Minus
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="multiExpand"
          checked={props.multiExpand}
          onChange={(e) =>
            setProp((props: AccordionProps) => (props.multiExpand = e.target.checked))
          }
        />
        <label htmlFor="multiExpand" className="text-sm">Multiple Expand</label>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Accordion Items</label>
          <button 
            onClick={addAccordionItem}
            className="text-xs text-blue-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
        <div className="space-y-2">
          {props.items?.map((item, index) => (
            <div key={index} className="space-y-2 p-2 border rounded-md">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Title</label>
                <button 
                  onClick={() => removeAccordionItem(index)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateAccordionItem(index, { title: e.target.value })}
                className="w-full px-2 py-1 border rounded-md text-sm"
              />
              <label className="text-sm font-medium">Content</label>
              <textarea
                value={typeof item.content === 'string' ? item.content : ''}
                onChange={(e) => updateAccordionItem(index, { content: e.target.value })}
                className="w-full px-2 py-1 border rounded-md text-sm"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Accordion.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: AccordionSettings,
  },
};
