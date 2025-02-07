import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { 
  MusicIcon, 
  PlayIcon, 
  PauseIcon, 
  VolumeXIcon, 
  Volume2Icon, 
  RepeatIcon, 
  SkipForwardIcon, 
  SkipBackIcon 
} from 'lucide-react';
import { useState, useRef } from 'react';

interface AudioProps {
  src?: string;
  title?: string;
  artist?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const defaultProps: AudioProps = {
  src: '',
  title: 'Audio Track',
  artist: 'Unknown Artist',
  controls: true,
  autoPlay: false,
  loop: false,
  muted: false,
};

const AudioSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const audioControlOptions = [
    { value: 'default', label: 'Default' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'none', label: 'None' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProp((props: AudioProps) => (props.src = reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Audio Source</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={props.src}
            onChange={(e) =>
              setProp((props: AudioProps) => (props.src = e.target.value))
            }
            placeholder="Enter audio URL or upload"
            className="flex-grow px-3 py-2 border rounded-md"
          />
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="audioUpload"
          />
          <label
            htmlFor="audioUpload"
            className="px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            Upload
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={props.title}
          onChange={(e) =>
            setProp((props: AudioProps) => (props.title = e.target.value))
          }
          placeholder="Enter audio title"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Controls</label>
          <select
            value={props.controls}
            onChange={(e) =>
              setProp(
                (props: AudioProps) => (props.controls = e.target.value as AudioProps['controls'])
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            {audioControlOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Volume</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={props.volume}
              onChange={(e) =>
                setProp((props: AudioProps) => (props.volume = Number(e.target.value)))
              }
              className="flex-grow mr-2"
            />
            <span className="text-sm">{props.volume}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="loop"
            checked={props.loop}
            onChange={(e) =>
              setProp((props: AudioProps) => (props.loop = e.target.checked))
            }
          />
          <label htmlFor="loop" className="text-sm">Loop</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoplay"
            checked={props.autoplay}
            onChange={(e) =>
              setProp((props: AudioProps) => (props.autoplay = e.target.checked))
            }
          />
          <label htmlFor="autoplay" className="text-sm">Autoplay</label>
        </div>
      </div>
    </div>
  );
};

export const Audio = ({
  src,
  title,
  controls,
  volume,
  loop,
  autoplay,
}: AudioProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative group p-4 bg-white rounded-lg shadow-md',
        selected && 'outline outline-2 outline-blue-500'
      )}
    >
      {src ? (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <MusicIcon className="w-12 h-12 text-gray-400" />
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold">{title || 'Untitled Track'}</h3>
              {/* <span className="text-xs text-gray-500">by {artist}</span> */}
            </div>

            <audio
              ref={audioRef}
              src={src}
              autoPlay={autoplay}
              loop={loop}
              muted={false}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {controls && (
              <div className="mt-2 flex items-center space-x-2">
                <button 
                  onClick={togglePlay} 
                  className="text-gray-600 hover:text-black"
                >
                  {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                </button>

                <div className="flex-grow flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-grow bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-500 rounded-full h-1" 
                      style={{ 
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <MusicIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Upload or Drag an Audio File</p>
          </div>
        </div>
      )}
    </div>
  );
};

Audio.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: AudioSettings,
  },
};
