// Import necessary modules
const { S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Initialize the S3 client
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to generate a pre-signed URL for uploading
async function generateUploadURL(key) {
  const command = new PutObjectCommand({
    Bucket: 'testmybucket-babugh',  // replace with your bucket name
    Key: key,
    ContentType: 'application/octet-stream', // specify the content type if needed
  });

  // Generate a pre-signed URL with a 15-minute expiration time (900 seconds)
  const url = await getSignedUrl(s3, command, { expiresIn: 900 });
  return url;
}

// Function to generate a pre-signed URL for downloading
async function generateDownloadURL(key) {
  const command = new GetObjectCommand({
    Bucket: 'testmybucket-babugh',  // replace with your bucket name
    Key: key,
  });

  // Generate a pre-signed URL with a 15-minute expiration time
  const url = await getSignedUrl(s3, command, { expiresIn: 900 });
  return url;
}

// Example usage:
(async () => {
  const uploadUrl = await generateUploadURL('Screenshot from 2024-09-26 21-46-31.png');
  console.log('Upload URL:', uploadUrl);

  const downloadUrl = await generateDownloadURL('Screenshot from 2024-09-26 21-46-31.png');
  console.log('Download URL:', downloadUrl);
})();
