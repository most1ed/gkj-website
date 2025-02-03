import { Widget, WidgetType } from '../types/dashboard.types';

export class WidgetRegistry {
  private static widgets: Map<string, Widget> = new Map();

  static registerWidget(widget: Widget) {
    this.widgets.set(widget.id, widget);
  }

  static getWidget(id: string): Widget | undefined {
    return this.widgets.get(id);
  }

  static getAllWidgets(): Widget[] {
    return Array.from(this.widgets.values());
  }

  static getWidgetsByType(type: WidgetType): Widget[] {
    return Array.from(this.widgets.values())
      .filter(widget => widget.type === type);
  }

  static removeWidget(id: string) {
    this.widgets.delete(id);
  }

  static clearRegistry() {
    this.widgets.clear();
  }
}
