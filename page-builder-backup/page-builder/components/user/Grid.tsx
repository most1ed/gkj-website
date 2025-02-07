import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';

interface GridProps {
  columns: number | string;
  customColumns?: string;
  gap: number | string;
  rowGap?: string;
  columnGap?: string;
  alignItems?: string;
  justifyContent?: string;
  autoFit?: boolean;
  minColumnWidth?: string;
  children?: React.ReactNode;
  padding?: number;
  background?: string;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const defaultProps: GridProps = {
  columns: 2,
  gap: 16,
  padding: 16,
  background: 'transparent',
  responsive: {
    sm: 1,
    md: 2,
    lg: 2,
  },
};

const GridSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const columnOptions = [
    { value: '1', label: '1 Column' },
    { value: '2', label: '2 Columns' },
    { value: '3', label: '3 Columns' },
    { value: '4', label: '4 Columns' },
    { value: '6', label: '6 Columns' },
    { value: 'custom', label: 'Custom' },
  ];

  const gapOptions = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'custom', label: 'Custom' },
  ];

  const alignmentOptions = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
    { value: 'stretch', label: 'Stretch' },
  ];

  const justifyOptions = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
    { value: 'between', label: 'Space Between' },
    { value: 'around', label: 'Space Around' },
    { value: 'evenly', label: 'Space Evenly' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Columns</label>
          <select
            value={props.columns}
            onChange={(e) =>
              setProp(
                (props: GridProps) => (props.columns = e.target.value as GridProps['columns'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {columnOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {props.columns === 'custom' && (
            <input
              type="text"
              value={props.customColumns}
              onChange={(e) =>
                setProp((props: GridProps) => (props.customColumns = e.target.value))
              }
              placeholder="Enter custom grid template (e.g., 1fr 2fr 1fr)"
              className="w-full px-3 py-2 border rounded-md mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gap</label>
          <select
            value={props.gap}
            onChange={(e) =>
              setProp(
                (props: GridProps) => (props.gap = e.target.value as GridProps['gap'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {gapOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {props.gap === 'custom' && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                placeholder="Row Gap"
                value={props.rowGap}
                onChange={(e) =>
                  setProp((props: GridProps) => (props.rowGap = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Column Gap"
                value={props.columnGap}
                onChange={(e) =>
                  setProp((props: GridProps) => (props.columnGap = e.target.value))
                }
                className="px-2 py-1 border rounded-md text-sm"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Align Items</label>
          <select
            value={props.alignItems}
            onChange={(e) =>
              setProp(
                (props: GridProps) => (props.alignItems = e.target.value as GridProps['alignItems'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {alignmentOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Justify Content</label>
          <select
            value={props.justifyContent}
            onChange={(e) =>
              setProp(
                (props: GridProps) => (props.justifyContent = e.target.value as GridProps['justifyContent'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {justifyOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoFit"
            checked={props.autoFit}
            onChange={(e) =>
              setProp((props: GridProps) => (props.autoFit = e.target.checked))
            }
          />
          <label htmlFor="autoFit" className="text-sm">Auto Fit Columns</label>
        </div>

        {props.autoFit && (
          <div className="space-y-2 mt-2">
            <label className="text-sm font-medium">Minimum Column Width</label>
            <input
              type="text"
              value={props.minColumnWidth}
              onChange={(e) =>
                setProp((props: GridProps) => (props.minColumnWidth = e.target.value))
              }
              placeholder="e.g., 200px, 10rem"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const Grid = ({
  columns,
  customColumns,
  gap,
  rowGap,
  columnGap,
  alignItems,
  justifyContent,
  autoFit,
  minColumnWidth,
  children,
  padding,
  background,
  responsive,
}: GridProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns:
      columns === 'custom'
        ? customColumns
        : autoFit
        ? `repeat(auto-fit, minmax(${minColumnWidth || '200px'}, 1fr))`
        : `repeat(${columns}, 1fr)`,
    gap: gap === 'custom' ? `${rowGap || '0px'} ${columnGap || '0px'}` : `var(--grid-gap-${gap})`,
    alignItems: `${alignItems}`,
    justifyContent: justifyContent === 'between'
      ? 'space-between'
      : justifyContent === 'around'
      ? 'space-around'
      : justifyContent === 'evenly'
      ? 'space-evenly'
      : justifyContent,
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      style={gridStyle}
      className={cn(
        'relative p-2',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {children && children.length > 0 ? (
        children
      ) : (
        <div className="flex items-center justify-center w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <LayoutGridIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Add Grid Items</p>
          </div>
        </div>
      )}
    </div>
  );
};

Grid.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: true,
    canMoveIn: true,
    canMoveOut: true,
  },
  related: {
    settings: GridSettings,
  },
};
