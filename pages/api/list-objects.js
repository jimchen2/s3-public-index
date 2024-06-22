import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const bucketName = process.env.S3_BUCKET_NAME;
  const prefix = req.query.prefix || '';
  const delimiter = '/';

  if (!bucketName) {
    return res.status(500).json({ error: "S3_BUCKET_NAME is not set in environment variables" });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      Delimiter: delimiter,
    });

    const response = await s3Client.send(command);
    
    const directories = (response.CommonPrefixes || []).map(prefix => ({
      name: prefix.Prefix.slice(prefix.Prefix.slice(0, -1).lastIndexOf('/') + 1, -1),
      path: prefix.Prefix,
      type: 'directory'
    }));

    const files = (response.Contents || []).filter(item => item.Key !== prefix).map(item => ({
      name: item.Key.slice(item.Key.lastIndexOf('/') + 1),
      path: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      type: 'file'
    }));

    const items = [...directories, ...files];

    res.status(200).json(items);
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    res.status(500).json({ error: "Error listing S3 objects", details: error.message });
  }
}