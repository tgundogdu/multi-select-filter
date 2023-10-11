import { isCode200 } from "../utils";
import _data from "../assets/items.json";
const fetchMockData = (query?: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isCode200()) {
        let data = _data.data as string[];
        data = query
          ? data.filter((item: string) => item.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
          : data;
        resolve(data);
      } else {
        reject("There was a problem with the server, please try again.");
      }
    }, 500);
  });
};

export { fetchMockData };
