import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  ShareIcon,
  CopyIcon,
  MailIcon,
  MessageCircleIcon,  
  SendIcon,
  PinIcon,  
  RefreshCwIcon  
} from 'lucide-react';

interface SocialShareProps {
  title?: string;
  url?: string;
  platforms?: ('facebook' | 'twitter' | 'linkedin' | 'instagram' | 'email' | 'copy')[];
  layout?: 'horizontal' | 'vertical';
  size?: number;
  showLabels?: boolean;
  buttonStyle?: 'default' | 'rounded' | 'outlined';
  showCount?: boolean;
}

const defaultProps: SocialShareProps = {
  title: 'Check this out!',
  url: '',
  platforms: ['facebook', 'twitter', 'linkedin'],
  layout: 'horizontal',
  size: 24,
  showLabels: false,
  buttonStyle: 'default',
  showCount: false,
};

const SOCIAL_PLATFORMS = {
  facebook: {
    icon: FacebookIcon,
    label: 'Facebook',
    shareUrl: (url: string, title: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  twitter: {
    icon: TwitterIcon,
    label: 'Twitter',
    shareUrl: (url: string, title: string) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  linkedin: {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    shareUrl: (url: string, title: string) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  instagram: {
    icon: InstagramIcon,
    label: 'Instagram',
    shareUrl: (url: string) => 
      `https://www.instagram.com/create/select/?url=${encodeURIComponent(url)}`,
  },
  email: {
    icon: MailIcon,
    label: 'Email',
    shareUrl: (url: string, title: string) => 
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  copy: {
    icon: CopyIcon,
    label: 'Copy Link',
    shareUrl: () => '',
  },
};

const SocialShareSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const socialPlatforms = [
    { name: 'Facebook', icon: FacebookIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'LinkedIn', icon: LinkedinIcon },
    { name: 'WhatsApp', icon: MessageCircleIcon },
    { name: 'Telegram', icon: SendIcon },
    { name: 'Pinterest', icon: PinIcon },
    { name: 'Reddit', icon: RefreshCwIcon },
  ];

  const togglePlatform = (platform: string) => {
    const currentPlatforms = props.platforms || [];
    const updatedPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter((p) => p !== platform)
      : [...currentPlatforms, platform];

    setProp((props: SocialShareProps) => (props.platforms = updatedPlatforms));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Share URL</label>
        <input
          type="text"
          value={props.url}
          onChange={(e) =>
            setProp((props: SocialShareProps) => (props.url = e.target.value))
          }
          placeholder="Enter URL to share"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Select Platforms</label>
        <div className="grid grid-cols-3 gap-2">
          {socialPlatforms.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => togglePlatform(name.toLowerCase())}
              className={cn(
                'flex items-center justify-center p-2 border rounded-md transition-colors',
                props.platforms?.includes(name.toLowerCase())
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="mr-2" size={20} />
              <span className="text-sm">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Button Style</label>
        <div className="grid grid-cols-3 gap-2">
          {['default', 'rounded', 'outlined'].map((style) => (
            <button
              key={style}
              onClick={() =>
                setProp(
                  (props: SocialShareProps) => (props.buttonStyle = style as SocialShareProps['buttonStyle'])
                )
              }
              className={cn(
                'px-3 py-2 border rounded-md capitalize',
                props.buttonStyle === style
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Layout</label>
        <div className="grid grid-cols-2 gap-2">
          {['horizontal', 'vertical'].map((layout) => (
            <button
              key={layout}
              onClick={() =>
                setProp(
                  (props: SocialShareProps) => (props.layout = layout as SocialShareProps['layout'])
                )
              }
              className={cn(
                'px-3 py-2 border rounded-md capitalize',
                props.layout === layout
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {layout}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showCount"
            checked={props.showCount}
            onChange={(e) =>
              setProp((props: SocialShareProps) => (props.showCount = e.target.checked))
            }
          />
          <label htmlFor="showCount" className="text-sm">Show Share Count</label>
        </div>
      </div>
    </div>
  );
};

export const SocialShare = ({
  url,
  platforms,
  buttonStyle,
  layout,
  showCount,
}: SocialShareProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const shareUrl = url || window.location.href;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}`,
  };

  const platformDetails = {
    facebook: { icon: FacebookIcon, name: 'Facebook' },
    twitter: { icon: TwitterIcon, name: 'Twitter' },
    linkedin: { icon: LinkedinIcon, name: 'LinkedIn' },
    whatsapp: { icon: MessageCircleIcon, name: 'WhatsApp' },
    telegram: { icon: SendIcon, name: 'Telegram' },
    pinterest: { icon: PinIcon, name: 'Pinterest' },
    reddit: { icon: RefreshCwIcon, name: 'Reddit' },
  };

  const renderShareButton = (platform: string) => {
    const { icon: Icon } = platformDetails[platform as keyof typeof platformDetails];
    
    const buttonClasses = cn(
      'flex items-center justify-center transition-colors duration-200',
      buttonStyle === 'default' && 'p-2 rounded',
      buttonStyle === 'rounded' && 'p-2 rounded-full',
      buttonStyle === 'outlined' && 'p-2 rounded border',
      `hover:bg-${platform}-500 hover:text-white`
    );

    return (
      <a
        key={platform}
        href={shareLinks[platform as keyof typeof shareLinks]}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <Icon size={24} />
        {showCount && <span className="ml-2 text-sm">0</span>}
      </a>
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref!))}
      className={cn(
        'relative p-2',
        selected && 'outline outline-2 outline-blue-500',
        layout === 'horizontal' ? 'flex space-x-2' : 'flex flex-col space-y-2'
      )}
    >
      {platforms && platforms.length > 0 ? (
        platforms.map(renderShareButton)
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <ShareIcon className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-500">Select Share Platforms</p>
          </div>
        </div>
      )}
    </div>
  );
};

SocialShare.craft = {
  props: defaultProps,
  rules: {
    canDrag: true,
    canDrop: false,
    canMoveIn: false,
    canMoveOut: true,
  },
  related: {
    settings: SocialShareSettings,
  },
};
