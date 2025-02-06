import { v4 as uuidv4 } from 'uuid';
import { 
  FlexWidget, 
  WidgetCategory, 
  WidgetSize, 
  UserRole,
  PresetWidget,
  DashboardPreset,
  WidgetLayout,
  WidgetTemplate,
  CreateWidgetDTO
} from '../types/widget.types';

export class WidgetManager {
  private static instance: WidgetManager;
  private widgets: Map<string, FlexWidget>;
  private presets: Map<UserRole, DashboardPreset>;

  private constructor() {
    this.widgets = new Map();
    this.presets = new Map();
    this.initializePresets();
  }

  public static getInstance(): WidgetManager {
    if (!WidgetManager.instance) {
      WidgetManager.instance = new WidgetManager();
    }
    return WidgetManager.instance;
  }

  private initializePresets() {
    // Initialize default presets for different roles
    const adminPreset: DashboardPreset = {
      role: UserRole.ADMIN,
      widgets: [
        {
          category: WidgetCategory.OVERVIEW,
          type: 'stats',
          size: WidgetSize.LARGE
        },
        {
          category: WidgetCategory.FINANCIAL,
          type: 'chart',
          size: WidgetSize.MEDIUM
        }
      ]
    };

    const staffPreset: DashboardPreset = {
      role: UserRole.STAFF,
      widgets: [
        {
          category: WidgetCategory.EVENTS,
          type: 'calendar',
          size: WidgetSize.MEDIUM
        }
      ]
    };

    this.presets.set(UserRole.ADMIN, adminPreset);
    this.presets.set(UserRole.STAFF, staffPreset);
  }

  public static generateWidgetId(): string {
    return uuidv4();
  }

  public registerWidget(widget: FlexWidget): void {
    this.widgets.set(widget.id, widget);
  }

  public removeWidget(widgetId: string): void {
    this.widgets.delete(widgetId);
  }

  public getWidget(widgetId: string): FlexWidget | undefined {
    return this.widgets.get(widgetId);
  }

  public getAllWidgets(): FlexWidget[] {
    return Array.from(this.widgets.values());
  }

  public static getWidgetsForRole(role: UserRole): PresetWidget[] {
    const instance = WidgetManager.getInstance();
    const preset = instance.presets.get(role);
    return preset?.widgets || [];
  }

  public createWidget(dto: CreateWidgetDTO): FlexWidget {
    const widget: FlexWidget = {
      id: WidgetManager.generateWidgetId(),
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.registerWidget(widget);
    return widget;
  }

  public updateWidget(widgetId: string, updates: Partial<FlexWidget>): FlexWidget | null {
    const widget = this.getWidget(widgetId);
    if (!widget) return null;

    const updatedWidget = {
      ...widget,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.registerWidget(updatedWidget);
    return updatedWidget;
  }

  public getWidgetsByCategory(category: WidgetCategory): FlexWidget[] {
    return this.getAllWidgets().filter(widget => widget.category === category);
  }

  public getPresetForRole(role: UserRole): DashboardPreset | undefined {
    return this.presets.get(role);
  }
}
