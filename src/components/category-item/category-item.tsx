import * as React from "react";
import "./category-item.scss";

export interface CategoryItemProps {
  selected?: boolean;
  label: string;
  onSelect: (category: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`category-item ${selected && "selected"}`}
      onClick={() => onSelect(label)}
    >
      <span className="check"></span>
      <span className="label">{label}</span>
    </div>
  );
};

export default CategoryItem;
