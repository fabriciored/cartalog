import { S3 } from 'aws-sdk';

export class BucketS3 {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY_ID,
      },
      endpoint: process.env.OBJECT_STORAGE_ENDPOINT_URL,
      s3ForcePathStyle: true,
      params: {
        Bucket: process.env.CATEGORIES_OBJECT_STORAGE_BUCKET_NAME,
      },
    });
  }

  async save(
    filename: string,
    content: string | Buffer,
    contentType: string,
    path: string,
  ): Promise<void> {
    await this.s3
      .putObject({
        Bucket: path,
        Key: filename,
        ACL: 'public-read',
        Body: content,
        ContentType: contentType,
      })
      .promise()
      .catch();
  }

  async delete(id: string, path: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: path,
        Key: id,
      })
      .promise();
  }

  async findObject(id: string, path: string): Promise<unknown> {
    const params = {
      Bucket: path,
      Key: id,
    };

    try {
      await this.s3.headObject(params).promise();
      const getObject = await this.s3.getObject(params).promise();

      return JSON.parse(getObject.Body.toString('utf-8'));
    } catch (headErr) {
      if (headErr.code === 'NotFound') {
        console.log('not found');
        return false;
      }
    }
  }
}

export const ObjectStorage = new BucketS3();
