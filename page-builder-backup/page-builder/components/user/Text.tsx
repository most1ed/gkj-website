import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from 'lucide-react';

interface TextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  lineHeight?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const defaultProps: TextProps = {
  text: 'Type your text here...',
  fontSize: 16,
  fontFamily: 'Arial',
  fontWeight: '400',
  textAlign: 'left',
  color: '#000000',
  lineHeight: '1.5',
  bold: false,
  italic: false,
  underline: false,
};

const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const fontFamilies = [
    'Arial', 
    'Helvetica', 
    'Times New Roman', 
    'Courier New', 
    'Verdana', 
    'Georgia', 
    'Palatino', 
    'Garamond', 
    'Bookman', 
    'Comic Sans MS', 
    'Trebuchet MS', 
    'Arial Black'
  ];

  const fontWeights = [
    { value: '100', label: 'Thin' },
    { value: '200', label: 'Extra Light' },
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
    { value: '900', label: 'Black' }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text Content</label>
        <textarea
          value={props.text}
          onChange={(e) =>
            setProp((props: TextProps) => (props.text = e.target.value))
          }
          placeholder="Enter your text"
          className="w-full px-3 py-2 border rounded-md min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Family</label>
          <select
            value={props.fontFamily}
            onChange={(e) =>
              setProp((props: TextProps) => (props.fontFamily = e.target.value))
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {fontFamilies.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Font Weight</label>
          <select
            value={props.fontWeight}
            onChange={(e) =>
              setProp((props: TextProps) => (props.fontWeight = e.target.value))
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {fontWeights.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Size</label>
          <div className="flex items-center">
            <input
              type="range"
              min="8"
              max="72"
              value={parseInt(props.fontSize || '16')}
              onChange={(e) =>
                setProp((props: TextProps) => (props.fontSize = `${e.target.value}px`))
              }
              className="flex-grow mr-2"
            />
            <span className="text-sm">{props.fontSize}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Line Height</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={parseFloat(props.lineHeight || '1.5')}
              onChange={(e) =>
                setProp((props: TextProps) => (props.lineHeight = `${e.target.value}`))
              }
              className="flex-grow mr-2"
            />
            <span className="text-sm">{props.lineHeight}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={props.color}
            onChange={(e) =>
              setProp((props: TextProps) => (props.color = e.target.value))
            }
            className="w-12 h-12 p-1 border rounded-md"
          />
          <input
            type="text"
            value={props.color}
            onChange={(e) =>
              setProp((props: TextProps) => (props.color = e.target.value))
            }
            placeholder="Color (hex)"
            className="flex-grow px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Text Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          {['left', 'center', 'right'].map((alignment) => (
            <button
              key={alignment}
              onClick={() =>
                setProp(
                  (props: TextProps) => (props.textAlign = alignment as TextProps['textAlign'])
                )
              }
              className={cn(
                'px-3 py-2 border rounded-md capitalize',
                props.textAlign === alignment
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {alignment}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="italic"
            checked={props.italic}
            onChange={(e) =>
              setProp((props: TextProps) => (props.italic = e.target.checked))
            }
          />
          <label htmlFor="italic" className="text-sm">Italic</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="underline"
            checked={props.underline}
            onChange={(e) =>
              setProp((props: TextProps) => (props.underline = e.target.checked))
            }
          />
          <label htmlFor="underline" className="text-sm">Underline</label>
        </div>
      </div>
    </div>
  );
};

export const Text = ({
  text,
  fontSize,
  fontFamily,
  fontWeight,
  color,
  textAlign,
  lineHeight,
  italic,
  underline,
}: TextProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative p-2',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {text ? (
        <p
          style={{
            fontSize,
            fontFamily,
            fontWeight,
            color,
            textAlign,
            lineHeight,
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
          }}
        >
          {text}
        </p>
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <TypeIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Add Text</p>
          </div>
        </div>
      )}
    </div>
  );
};

Text.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: TextSettings,
  },
};
