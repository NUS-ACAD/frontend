import SITE from '../site.config';

const convertObjToQueryString = (query) =>
  Object.keys(query)
    .filter((key) => !!query[key])
    .map((key) => `${key}=${query[key]}`)
    .join('&');

const getOgImageUrl = ({ title, twitter, root }) => {
  const defaultParams = {
    md: '1',
    fontSize: '96px',
    siteTitle: encodeURIComponent(SITE.title),
    isTwitter: undefined,
  };
  const baseParams = `${SITE.ogImageGenerateURL}/${encodeURIComponent(
    title,
  )}.png?`;
  if (twitter) {
    if (!root) {
      return (
        baseParams +
        convertObjToQueryString({
          ...defaultParams,
          isTwitter: 'true',
        })
      );
    }
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
        isTwitter: 'true',
      })
    );
  }
  if (root) {
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
      })
    );
  }
  return baseParams + convertObjToQueryString(defaultParams);
};

export default getOgImageUrl;
