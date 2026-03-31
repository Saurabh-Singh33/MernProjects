import type { DashboardItem, DashboardProps } from "../types/user";
import { DataList } from "./common/DataDisplay";

export interface DashboardWithTitleProps<
  T extends DashboardItem,
> extends DashboardProps<T> {
  title?: string;
}

export function Dashboard<T extends DashboardItem>({
  items,
  onItemClick,
  layout,
  title = "Dashboard",
}: DashboardWithTitleProps<T>) {
  const renderItem = (item: T) => (
    <div
      className={`dashboard-item dashboard-item-${item.type}`}
      onClick={() => onItemClick?.(item)}
    >
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <div className="dashboard-item-data">{renderItemData(item)}</div>
    </div>
  );

  const renderItemData = (item: T) => {
    switch (item.type) {
      case "metric":
        return <div className="metric-value">{item.data.value}</div>;
      case "chart":
        return (
          <div className="chart-placeholder">
            [Chart: {item.data.chartType}]
          </div>
        );
      case "list":
        return (
          <ul>
            {item.data.items?.map((listItem: string, idx: number) => (
              <li key={idx}>{listItem}</li>
            ))}
          </ul>
        );
      case "card":
        return <div className="card-content">{item.data.content}</div>;
      default:
        return <div>Unknown item type</div>;
    }
  };

  return (
    <div className={`dashboard dashboard-${layout}`}>
      <h2 className="dashboard-title">{title}</h2>
      <DataList
        items={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        emptyMessage="No dashboard items available"
        className="dashboard-grid"
      />
    </div>
  );
}

// Specialized dashboard components using generics
export function MetricDashboard<T extends DashboardItem & { type: "metric" }>(
  props: DashboardProps<T>,
) {
  return <Dashboard {...props} />;
}

export function ChartDashboard<T extends DashboardItem & { type: "chart" }>(
  props: DashboardProps<T>,
) {
  return <Dashboard {...props} />;
}

// Role-specific dashboards
export function UserDashboard<T extends DashboardItem>(
  props: DashboardProps<T>,
) {
  return <Dashboard {...props} />;
}

export function AdminDashboard<T extends DashboardItem>(
  props: DashboardProps<T>,
) {
  return <Dashboard {...props} />;
}
