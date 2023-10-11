import { useState, useEffect } from "react";
import { fetchMockData } from "../../fake-api/fetch";

const useMultiSelect = (query?: string) => {
  const [categories, setCategories] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const defaultSelectedCategories = JSON.parse(
    localStorage.getItem("selectedCategories") || "[]"
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultSelectedCategories
  );

  const onCategorySearch = (q?: string) => {
    setIsLoading(true);
    fetchMockData(q)
      .then((response: any) => {
        const filteredCategories = response
          ?.filter((x: any) => !selectedCategories.includes(x))
          .sort();
        setCategories(filteredCategories);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onCategorySearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onCategorySelect = (category: string) => {
    let newSelectedCategories = [...selectedCategories];
    let newCategories = categories || [];
    const indis = newSelectedCategories.indexOf(category);
    if (indis >= 0) {
      newSelectedCategories.splice(indis, 1);
      newCategories.push(category);
      setCategories(newCategories.sort());
    } else {
      newSelectedCategories.push(category);
      newCategories = newCategories.filter((item) => item !== category);
      setCategories(newCategories);
    }
    setSelectedCategories(newSelectedCategories);
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(newSelectedCategories)
    );
  };

  return {
    categories,
    selectedCategories,
    onCategorySelect,
    onCategorySearch,
    isLoading,
    isError,
    error,
  };
};

export { useMultiSelect };
