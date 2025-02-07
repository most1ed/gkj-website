import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Github,
  Twitch,
  Dribbble,
  Send 
} from 'lucide-react';

interface SocialFollowProps {
  profiles?: {
    platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github' | 'twitch' | 'dribbble' | 'telegram';
    url: string;
  }[];
  layout?: 'horizontal' | 'vertical';
  size?: number;
  showLabels?: boolean;
  colorMode?: 'default' | 'colored' | 'outlined';
}

const defaultProps: SocialFollowProps = {
  profiles: [
    { platform: 'facebook', url: '' },
    { platform: 'twitter', url: '' },
    { platform: 'linkedin', url: '' },
  ],
  layout: 'horizontal',
  size: 24,
  showLabels: false,
  colorMode: 'default',
};

const SOCIAL_PLATFORMS = {
  facebook: {
    icon: Facebook,
    label: 'Facebook',
    color: '#3b5998',
  },
  twitter: {
    icon: Twitter,
    label: 'Twitter',
    color: '#1da1f2',
  },
  linkedin: {
    icon: Linkedin,
    label: 'LinkedIn',
    color: '#0077b5',
  },
  instagram: {
    icon: Instagram,
    label: 'Instagram',
    color: '#e4405f',
  },
  youtube: {
    icon: Youtube,
    label: 'YouTube',
    color: '#cd201f',
  },
  github: {
    icon: Github,
    label: 'GitHub',
    color: '#333',
  },
  twitch: {
    icon: Twitch,
    label: 'Twitch',
    color: '#6441a5',
  },
  dribbble: {
    icon: Dribbble,
    label: 'Dribbble',
    color: '#ea4c89',
  },
  telegram: {
    icon: Send,
    label: 'Telegram',
    color: '#0088cc',
  },
};

const SocialFollowSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const updateProfile = (platform: string, url: string) => {
    setProp((props: SocialFollowProps) => {
      const existingProfileIndex = props.profiles?.findIndex(p => p.platform === platform);
      
      if (existingProfileIndex !== -1 && existingProfileIndex !== undefined) {
        if (props.profiles) {
          props.profiles[existingProfileIndex].url = url;
        }
      } else {
        props.profiles?.push({ platform: platform as any, url });
      }
    });
  };

  const removeProfile = (platform: string) => {
    setProp((props: SocialFollowProps) => {
      props.profiles = props.profiles?.filter(p => p.platform !== platform);
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Social Profiles</label>
        {Object.keys(SOCIAL_PLATFORMS).map((platform) => (
          <div key={platform} className="flex items-center gap-2 mb-2">
            <span className="w-24 text-sm">
              {SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS].label}
            </span>
            <input
              type="text"
              placeholder={`Enter ${platform} profile URL`}
              value={props.profiles?.find(p => p.platform === platform)?.url || ''}
              onChange={(e) => updateProfile(platform, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            {props.profiles?.find(p => p.platform === platform)?.url && (
              <button 
                onClick={() => removeProfile(platform)}
                className="text-red-500 hover:bg-red-50 rounded-full p-1"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Layout</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="horizontal"
              checked={props.layout === 'horizontal'}
              onChange={() =>
                setProp((props: SocialFollowProps) => (props.layout = 'horizontal'))
              }
            />
            Horizontal
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="vertical"
              checked={props.layout === 'vertical'}
              onChange={() =>
                setProp((props: SocialFollowProps) => (props.layout = 'vertical'))
              }
            />
            Vertical
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Size</label>
        <input
          type="number"
          value={props.size}
          onChange={(e) =>
            setProp((props: SocialFollowProps) => (props.size = Number(e.target.value)))
          }
          min="16"
          max="48"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color Mode</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="default"
              checked={props.colorMode === 'default'}
              onChange={() =>
                setProp((props: SocialFollowProps) => (props.colorMode = 'default'))
              }
            />
            Default
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="colored"
              checked={props.colorMode === 'colored'}
              onChange={() =>
                setProp((props: SocialFollowProps) => (props.colorMode = 'colored'))
              }
            />
            Colored
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="outlined"
              checked={props.colorMode === 'outlined'}
              onChange={() =>
                setProp((props: SocialFollowProps) => (props.colorMode = 'outlined'))
              }
            />
            Outlined
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showLabels"
          checked={props.showLabels}
          onChange={(e) =>
            setProp((props: SocialFollowProps) => (props.showLabels = e.target.checked))
          }
        />
        <label htmlFor="showLabels" className="text-sm">Show Labels</label>
      </div>
    </div>
  );
};

export const SocialFollow = ({
  profiles,
  layout,
  size,
  showLabels,
  colorMode,
}: SocialFollowProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const getIconStyle = (platform: keyof typeof SOCIAL_PLATFORMS) => {
    const platformColor = SOCIAL_PLATFORMS[platform].color;
    
    switch (colorMode) {
      case 'colored':
        return { color: platformColor };
      case 'outlined':
        return { 
          stroke: platformColor, 
          fill: 'none',
          strokeWidth: 1.5 
        };
      default:
        return { color: 'currentColor' };
    }
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'flex items-center',
        layout === 'horizontal' ? 'space-x-3' : 'flex-col space-y-3',
        selected && 'outline outline-2 outline-blue-500 p-2'
      )}
    >
      {profiles?.map(({ platform, url }) => {
        const Platform = SOCIAL_PLATFORMS[platform];
        const PlatformIcon = Platform.icon;

        return url ? (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center',
              layout === 'vertical' && 'w-full',
              showLabels ? 'space-x-2 px-3 py-2 bg-gray-100 rounded-md' : 'hover:bg-gray-100 p-2 rounded-full'
            )}
          >
            <PlatformIcon 
              size={size} 
              {...getIconStyle(platform)} 
            />
            {showLabels && <span className="text-sm">{Platform.label}</span>}
          </a>
        ) : null;
      })}
    </div>
  );
};

SocialFollow.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: SocialFollowSettings,
  },
};
