import React from "react";
import "./multi-select.scss";
import { Button, CategoryItem, Input } from "../";
import { useMultiSelect } from "./use-multi-select";

export interface MultiSelectProps {}

export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const {
    categories,
    selectedCategories,
    isLoading,
    isError,
    error,
    onCategorySelect,
    onCategorySearch,
  } = useMultiSelect();

  return (
    <div className="multi-select">
      <h3>Kategoriler</h3>
      <Input onSearch={onCategorySearch} />

      <div className="categories">
        {isError ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {selectedCategories.map(
              (selectedCategory: string, indis: number) => {
                return (
                  <CategoryItem
                    key={selectedCategory + "_" + indis}
                    selected
                    onSelect={onCategorySelect}
                    label={selectedCategory}
                  />
                );
              }
            )}

            {categories && categories.length > 0
              ? categories?.map((category: string, indis: number) => {
                  return (
                    <CategoryItem
                      key={category + "_" + indis}
                      onSelect={onCategorySelect}
                      label={category}
                    />
                  );
                })
              : !isLoading && (
                  <div className="not-found">Sonuç bulunamadı...</div>
                )}
          </>
        )}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      <Button
        label="Ara"
        onClick={() => alert("Seçili kategoriler: " +JSON.stringify(selectedCategories))}
      />
    </div>
  );
};

export default MultiSelect;
