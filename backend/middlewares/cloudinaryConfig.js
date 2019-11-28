import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: 'dhelire9h',
  api_key: '584658524337813',
  api_secret: 'sRDUJPzUW0-4SuWMEhoU4lQePQI',
});

// eslint-disable-next-line import/prefer-default-export
export function uploads(file) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({ url: result.url, id: result.public_id });
    }, { resource_type: 'auto' });
  });
}
