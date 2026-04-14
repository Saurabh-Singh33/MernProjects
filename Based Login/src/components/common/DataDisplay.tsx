import React from "react";

// Generic component for displaying lists of data
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items to display",
  className = "",
}: DataListProps<T>) {
  if (items.length === 0) {
    return <div className={`data-list-empty ${className}`}>{emptyMessage}</div>;
  }

  return (
    <div className={`data-list ${className}`}>
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} className="data-list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Generic component for displaying key-value pairs
interface KeyValueDisplayProps<T> {
  data: T;
  fields: Array<{
    key: keyof T;
    label: string;
    formatter?: (value: any) => string;
  }>;
  className?: string;
}

export function KeyValueDisplay<T extends Record<string, any>>({
  data,
  fields,
  className = "",
}: KeyValueDisplayProps<T>) {
  return (
    <div className={`key-value-display ${className}`}>
      {fields.map(({ key, label, formatter }) => (
        <div key={String(key)} className="key-value-pair">
          <span className="key-value-label">{label}:</span>
          <span className="key-value-value">
            {formatter ? formatter(data[key]) : String(data[key])}
          </span>
        </div>
      ))}
    </div>
  );
}
