import axios from "axios";

const API_KEY = "74a857ef0a804a7183ed53123a717fd7";
const BASE_URL = "https://newsapi.org/v2";

export const fetchArticles = async (
  category = "general",
  page = 1,
  keyword = ""
) => {
  try {
    const endpoint = keyword.length > 0 ? "everything" : "top-headlines";
    const params =
      keyword.length > 0
        ? {
            q: keyword,
            page,
            apiKey: API_KEY,
          }
        : {
            category,
            page,
            apiKey: API_KEY,
          };

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
