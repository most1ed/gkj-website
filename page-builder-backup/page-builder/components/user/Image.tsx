import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { ImageIcon, UploadIcon } from 'lucide-react';
import { useState } from 'react';

interface ImageProps {
  src?: string;
  alt?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  maxWidth?: string;
  borderRadius?: string;
  grayscale?: boolean;
  lazy?: boolean;
}

const defaultProps: ImageProps = {
  src: '',
  alt: 'Image',
  aspectRatio: 'auto',
  objectFit: 'cover',
  maxWidth: '100%',
  borderRadius: '0px',
  grayscale: false,
  lazy: false,
};

const ImageSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const aspectRatios = [
    { value: 'auto', label: 'Auto' },
    { value: '1:1', label: 'Square' },
    { value: '16:9', label: 'Widescreen' },
    { value: '4:3', label: 'Standard' },
    { value: '3:2', label: 'Classic' },
    { value: '21:9', label: 'Ultrawide' },
  ];

  const objectFitOptions = [
    { value: 'cover', label: 'Cover' },
    { value: 'contain', label: 'Contain' },
    { value: 'fill', label: 'Fill' },
    { value: 'none', label: 'None' },
    { value: 'scale-down', label: 'Scale Down' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProp((props: ImageProps) => (props.src = reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Image Source</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={props.src}
            onChange={(e) =>
              setProp((props: ImageProps) => (props.src = e.target.value))
            }
            placeholder="Enter image URL or upload"
            className="flex-grow px-3 py-2 border rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            Upload
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alt Text</label>
        <input
          type="text"
          value={props.alt}
          onChange={(e) =>
            setProp((props: ImageProps) => (props.alt = e.target.value))
          }
          placeholder="Describe the image for accessibility"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Aspect Ratio</label>
          <select
            value={props.aspectRatio}
            onChange={(e) =>
              setProp(
                (props: ImageProps) => (props.aspectRatio = e.target.value as ImageProps['aspectRatio'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {aspectRatios.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Object Fit</label>
          <select
            value={props.objectFit}
            onChange={(e) =>
              setProp(
                (props: ImageProps) => (props.objectFit = e.target.value as ImageProps['objectFit'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {objectFitOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Width</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={parseInt(props.maxWidth || '100')}
              onChange={(e) =>
                setProp((props: ImageProps) => (props.maxWidth = `${e.target.value}%`))
              }
              className="flex-grow mr-2"
            />
            <span className="text-sm">{props.maxWidth}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Border Radius</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="50"
              value={parseInt(props.borderRadius || '0')}
              onChange={(e) =>
                setProp((props: ImageProps) => (props.borderRadius = `${e.target.value}px`))
              }
              className="flex-grow mr-2"
            />
            <span className="text-sm">{props.borderRadius}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="grayscale"
            checked={props.grayscale}
            onChange={(e) =>
              setProp((props: ImageProps) => (props.grayscale = e.target.checked))
            }
          />
          <label htmlFor="grayscale" className="text-sm">Grayscale</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="lazy"
            checked={props.lazy}
            onChange={(e) =>
              setProp((props: ImageProps) => (props.lazy = e.target.checked))
            }
          />
          <label htmlFor="lazy" className="text-sm">Lazy Load</label>
        </div>
      </div>
    </div>
  );
};

export const Image = ({
  src,
  alt,
  aspectRatio,
  objectFit,
  maxWidth,
  borderRadius,
  grayscale,
  lazy,
}: ImageProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const renderImage = () => {
    const imageClasses = cn(
      'w-full',
      grayscale && 'filter grayscale',
      `aspect-${aspectRatio === 'auto' ? 'auto' : aspectRatio.replace(':', '/')}`,
      `object-${objectFit}`
    );

    return (
      <img
        src={src || '/placeholder.png'}
        alt={alt || 'Placeholder Image'}
        className={imageClasses}
        style={{
          maxWidth,
          borderRadius,
        }}
        loading={lazy ? 'lazy' : 'eager'}
      />
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative p-2',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {src ? (
        renderImage()
      ) : (
        <div className="flex items-center justify-center h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Add Image</p>
          </div>
        </div>
      )}
    </div>
  );
};

Image.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: ImageSettings,
  },
};
