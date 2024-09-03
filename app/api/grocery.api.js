import axios from "axios";

export const fetchGroceries = async (search, sortBy, sortDir) => {
  let request = `limit=20&sortBy=${sortBy.value}`;

  if (sortDir) {
    sortDir = "asc";
  } else {
    sortDir = "desc";
  }

  request = request + `&sortDir=${sortDir}`;

  if (search) {
    request = request + `&search=${search}`;
  }
  try {
    const { data } = await axios.get(`${process.env.BE_URL}?${request}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGrocery = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.BE_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGrocery = async (id, values) => {
  try {
    axios
      .put(`${process.env.BE_URL}/${id}`, values)
      .then((response) => {
        return "success";
      })
      .catch((error) => {
        // Handling the error if the request fails
        console.error("The error is:", error);
      });
  } catch (error) {
    console.error(error);
  }
};
