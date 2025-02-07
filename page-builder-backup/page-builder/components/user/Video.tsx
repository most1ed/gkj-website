import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { VideoIcon, PlayIcon, PauseIcon, VolumeXIcon, Volume2Icon } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const defaultProps: VideoProps = {
  src: '',
  alt: 'Video',
  width: '100%',
  height: 'auto',
  controls: true,
  autoPlay: false,
  loop: false,
  muted: false,
  objectFit: 'cover',
};

const VideoSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProp((props: VideoProps) => (props.src = reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Video Source</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={props.src}
            onChange={(e) =>
              setProp((props: VideoProps) => (props.src = e.target.value))
            }
            placeholder="Enter video URL or upload"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
          >
            Upload
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Width</label>
          <input
            type="text"
            value={props.width}
            onChange={(e) =>
              setProp((props: VideoProps) => (props.width = e.target.value))
            }
            placeholder="e.g., 100%, 500px"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Height</label>
          <input
            type="text"
            value={props.height}
            onChange={(e) =>
              setProp((props: VideoProps) => (props.height = e.target.value))
            }
            placeholder="e.g., auto, 300px"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Alt Text</label>
        <input
          type="text"
          value={props.alt}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.alt = e.target.value))
          }
          placeholder="Descriptive alt text"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Object Fit</label>
        <select
          value={props.objectFit}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.objectFit = e.target.value as VideoProps['objectFit']))
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
          <option value="scale-down">Scale Down</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="controls"
          checked={props.controls}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.controls = e.target.checked))
          }
        />
        <label htmlFor="controls" className="text-sm">Show Controls</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="autoPlay"
          checked={props.autoPlay}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.autoPlay = e.target.checked))
          }
        />
        <label htmlFor="autoPlay" className="text-sm">Auto Play</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="loop"
          checked={props.loop}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.loop = e.target.checked))
          }
        />
        <label htmlFor="loop" className="text-sm">Loop</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="muted"
          checked={props.muted}
          onChange={(e) =>
            setProp((props: VideoProps) => (props.muted = e.target.checked))
          }
        />
        <label htmlFor="muted" className="text-sm">Muted</label>
      </div>
    </div>
  );
};

export const Video = ({
  src,
  alt,
  width,
  height,
  controls,
  autoPlay,
  loop,
  muted,
  objectFit,
}: VideoProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative group',
        selected && 'outline outline-2 outline-blue-500'
      )}
      style={{ width, height }}
    >
      {src ? (
        <>
          <video
            ref={videoRef}
            src={src}
            alt={alt}
            width="100%"
            height="100%"
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            style={{ objectFit }}
            className="w-full h-full"
          />
          {controls && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-4 text-white">
                <button onClick={togglePlay}>
                  {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                </button>
                <button onClick={toggleMute}>
                  {isMuted ? <VolumeXIcon size={20} /> : <Volume2Icon size={20} />}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <VideoIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Upload or Drag a Video</p>
          </div>
        </div>
      )}
    </div>
  );
};

Video.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: VideoSettings,
  },
};
