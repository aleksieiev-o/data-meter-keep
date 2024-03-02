import {Metadata} from 'next';

export const createAppMetaData = (metaData: Metadata): Metadata => {
  const {title, description} = metaData;

  if (description) {
    return {
      title: `${title} | Data meter keep`,
      description,
      openGraph: {
        title: `${title} | Data meter keep`,
        description,
      },
    };
  }
  
  return {
    title: `${title} | Data meter keep`,
    robots: {
      index: false,
      follow: false,
    },
  };
};
