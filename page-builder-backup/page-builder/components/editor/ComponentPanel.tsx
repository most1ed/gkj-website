import React from 'react';
import { Element, useEditor, Editor } from '@craftjs/core';
import { usePageBuilderStore } from '../../stores/pageBuilderStore';
import { cn } from '@/lib/utils';
import { Text } from '../user/Text';
import { Container } from '../user/Container';
import { Image } from '../user/Image';
import { Button } from '../user/Button';
import { Grid } from '../user/Grid';
import { FormInput } from '../user/FormInput';
import { FormSelect } from '../user/FormSelect';
import { FormCheckbox } from '../user/FormCheckbox';
import { FormTextarea } from '../user/FormTextarea';
import { Video } from '../user/Video';
import { Audio } from '../user/Audio';
import { Icon } from '../user/Icon';
import { SocialShare } from '../user/SocialShare';
import { SocialFollow } from '../user/SocialFollow';
import { NavigationMenu } from '../user/NavigationMenu';
import { Breadcrumb } from '../user/Breadcrumb';
import { Tabs } from '../user/Tabs';
import { Accordion } from '../user/Accordion';
import { 
  LayoutGridIcon,
  TypeIcon,
  ImageIcon,
  SquareIcon,
  BoxIcon,
  GripHorizontalIcon,
  FormInputIcon,
  CheckSquareIcon,
  ListIcon,
  TextIcon,
  VideoIcon,
  PlayIcon,
  StarIcon,
  ShareIcon,
  UsersIcon,
  MenuIcon,
  LayoutIcon,
  ColumnsIcon
} from 'lucide-react';

const COMPONENT_CATEGORIES = [
  {
    name: 'Layout',
    components: [
      {
        type: 'Container',
        icon: <BoxIcon className="w-4 h-4" />,
        component: <Container />,
        description: 'Flexible container for content',
      },
      {
        type: 'Grid',
        icon: <LayoutGridIcon className="w-4 h-4" />,
        component: <Grid columns={2} gap={16} />,
        description: 'Responsive grid layout',
      },
    ],
  },
  {
    name: 'Content',
    components: [
      {
        type: 'Text',
        icon: <TypeIcon className="w-4 h-4" />,
        component: <Text text="Text Block" />,
        description: 'Add and style text content',
      },
      {
        type: 'Image',
        icon: <ImageIcon className="w-4 h-4" />,
        component: <Image alt="Image" />,
        description: 'Upload and display images',
      },
      {
        type: 'Button',
        icon: <GripHorizontalIcon className="w-4 h-4" />,
        component: <Button text="Button" />,
        description: 'Interactive button element',
      },
    ],
  },
  {
    name: 'Form',
    components: [
      {
        type: 'Input',
        icon: <FormInputIcon className="w-4 h-4" />,
        component: <FormInput />,
        description: 'Text input field',
      },
      {
        type: 'Select',
        icon: <ListIcon className="w-4 h-4" />,
        component: <FormSelect />,
        description: 'Dropdown selection',
      },
      {
        type: 'Checkbox',
        icon: <CheckSquareIcon className="w-4 h-4" />,
        component: <FormCheckbox />,
        description: 'Checkbox input',
      },
      {
        type: 'Textarea',
        icon: <TextIcon className="w-4 h-4" />,
        component: <FormTextarea />,
        description: 'Multi-line text input',
      },
    ],
  },
  {
    name: 'Media',
    components: [
      {
        type: 'Video',
        icon: <VideoIcon className="w-4 h-4" />,
        component: <Video />,
        description: 'Embed video content',
      },
      {
        type: 'Audio',
        icon: <PlayIcon className="w-4 h-4" />,
        component: <Audio />,
        description: 'Add audio player',
      },
      {
        type: 'Icon',
        icon: <StarIcon className="w-4 h-4" />,
        component: <Icon />,
        description: 'Customizable icon',
      },
    ],
  },
  {
    name: 'Navigation',
    components: [
      {
        type: 'Navigation Menu',
        icon: <MenuIcon className="w-4 h-4" />,
        component: <NavigationMenu />,
        description: 'Interactive website navigation menu',
      },
      {
        type: 'Breadcrumb',
        icon: <LayoutIcon className="w-4 h-4" />,
        component: <Breadcrumb />,
        description: 'Show current page location in site hierarchy',
      },
    ],
  },
  {
    name: 'Social',
    components: [
      {
        type: 'Social Share',
        icon: <ShareIcon className="w-4 h-4" />,
        component: <SocialShare />,
        description: 'Share content on social media',
      },
      {
        type: 'Social Follow',
        icon: <UsersIcon className="w-4 h-4" />,
        component: <SocialFollow />,
        description: 'Follow social media profiles',
      },
    ],
  },
  {
    name: 'Advanced Layout',
    components: [
      {
        type: 'Tabs',
        icon: <LayoutGridIcon className="w-4 h-4" />,
        component: <Tabs />,
        description: 'Interactive tab-based content organization',
      },
      {
        type: 'Accordion',
        icon: <ColumnsIcon className="w-4 h-4" />,
        component: <Accordion />,
        description: 'Expandable/collapsible content sections',
      },
    ],
  },
];

interface ComponentPanelProps {
  connectors?: any;
}

export const ComponentPanel: React.FC<ComponentPanelProps> = ({ connectors: externalConnectors }) => {
  const editor = useEditor();
  const components = usePageBuilderStore((state) => state.components);

  // Safely get connectors from editor or use external connectors
  const connectors = externalConnectors || editor?.connectors;

  if (!connectors) {
    console.warn('Connectors not available. ComponentPanel may not function correctly.');
    return (
      <div className="w-64 bg-white border-r h-full overflow-y-auto p-4">
        <p className="text-red-500 text-sm">Unable to load component panel</p>
      </div>
    );
  }

  const createComponentRef = (item: any) => (ref: HTMLDivElement | null) => {
    if (ref && connectors.create) {
      connectors.create(ref, item.component);
    }
  };

  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Components</h3>
          <GripHorizontalIcon className="w-4 h-4 text-gray-400" />
        </div>

        <div className="space-y-6">
          {COMPONENT_CATEGORIES.map((category) => (
            <div key={category.name}>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                {category.name}
              </h4>
              <div className="space-y-2">
                {category.components.map((item) => (
                  <div
                    key={item.type}
                    ref={createComponentRef(item)}
                    className={cn(
                      'border rounded-md p-3 cursor-move',
                      'hover:border-blue-500 transition-colors'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <div>
                        <span className="text-sm font-medium">{item.type}</span>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
