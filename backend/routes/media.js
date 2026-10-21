const express = require('express');
const { body, validationResult } = require('express-validator');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const router = express.Router();

const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

router.post(
  '/presigned-url',
  [
    body('fileName').trim().notEmpty().withMessage('fileName is required'),
    body('fileType').trim().notEmpty().withMessage('fileType is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fileName, fileType } = req.body;
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME || 'starxi-media-bucket',
      Key: `uploads/${Date.now()}-${cleanFileName}`,
      ContentType: fileType
    });

    try {
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      res.status(200).json({ success: true, uploadUrl: url });
    } catch (error) {
      console.error('S3 Presigned URL Error:', error);
      res.status(500).json({ success: false, error: 'Could not generate pre-signed upload URL' });
    }
  }
);

module.exports = router;
