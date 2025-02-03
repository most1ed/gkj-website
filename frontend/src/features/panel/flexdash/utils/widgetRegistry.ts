import { FlexWidget, WidgetCategory } from '../types/dashboard.types';

export class WidgetRegistry {
  private static widgets: Map<string, FlexWidget> = new Map();

  static registerWidget(widget: FlexWidget) {
    this.widgets.set(widget.id, widget);
  }

  static getWidget(id: string): FlexWidget | undefined {
    return this.widgets.get(id);
  }

  static getAllWidgets(): FlexWidget[] {
    return Array.from(this.widgets.values());
  }

  static getWidgetsByCategory(category: WidgetCategory): FlexWidget[] {
    return Array.from(this.widgets.values())
      .filter(widget => widget.category === category);
  }

  static removeWidget(id: string) {
    this.widgets.delete(id);
  }

  static clearRegistry() {
    this.widgets.clear();
  }
}
