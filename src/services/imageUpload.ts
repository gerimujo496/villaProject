// import axios from "axios";

// const API_KEY = 'AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ '; 
// const BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o';

// export const uploadImageToFirebase = async (file: File): Promise<string> => {
//   // Construct the upload URL with the image name
//   const uploadUrl = `${BASE_URL}?uploadType=media&name=${encodeURIComponent(file.name)}&key=${API_KEY}`;

//   // Create a FormData object to send the file
//   const formData = new FormData();
//   formData.append('file', file);

//   // Make a POST request to upload the file
//   const response = await axios.post(uploadUrl, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   // Extract the image name from the response
//   const imageName = encodeURIComponent(file.name);
  
//   // Construct the URL to access the image
//   const imageUrl = `https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o/${imageName}?alt=media&token=${response.data.downloadTokens}`;
  
//   return imageUrl;
// };

import axios from "axios";

const API_KEY = 'AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ';
const BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o';
 
export const uploadImageToFirebase = async (file: any): Promise<string> => {

    console.log(file.originFileObj);
    const imageName = encodeURIComponent(file.name);
  const uploadUrl = `${BASE_URL}?uploadType=media&name=${imageName}&key=${API_KEY}`;
  const formData = new FormData();
  formData.append('file', file.originFileObj);

  const response = await axios.post(uploadUrl, formData, {
    headers: {
       'Content-Type':"multipart/form-data"
    },
  });

 
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/villas-4262f.appspot.com/o/${imageName}?alt=media&token=${response.data.downloadTokens}`;

  return imageUrl;
};

