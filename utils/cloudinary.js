import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME || 'dc32903nb', 
  api_key: process.env.CLOUD_KEY || 871444795815127, 
  api_secret: process.env.CLOUD_SECRET || 'NM4G-BFnTzfxe8mN2r4PkGWnXMI'
});
export default cloudinary;