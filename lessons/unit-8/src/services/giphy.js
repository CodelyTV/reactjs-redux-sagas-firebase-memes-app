const GphApiClient = require('giphy-js-sdk-core');

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const client = GphApiClient(API_KEY);

const search = async (query, offset) => {
  const response = await client.search('gifs', {
    q: query,
    offset,
  });

  const { data } = response;
  let preview;

  // Sometimes giphy returns images with null values so we use this method
  // to remove invalid results.

  const filtered = data.map((item) => {
    preview = item.images.preview_gif;
    if (preview.gif_url && preview.height && preview.width) {
      return item;
    }
    return null;
  }).filter(item => item);

  response.data = filtered;

  return response;
};

export default {
  search,
};
