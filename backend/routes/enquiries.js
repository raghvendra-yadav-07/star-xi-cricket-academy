const express = require('express');
const { body, validationResult } = require('express-validator');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const router = express.Router();

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

router.post(
  '/',
  [
    body('full_name').trim().notEmpty().withMessage('Full Name is required.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.'),
    body('email').isEmail().withMessage('Valid email address is required.'),
    body('age_category').isIn(['Under 13', 'Under 16', 'Under 19', 'Senior']).withMessage('Invalid age category.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, phone, email, age_category, notes } = req.body;

    const emailText = `New Admission Enquiry Received:
---------------------------------
Name: ${full_name}
Phone: ${phone}
Email: ${email}
Age Category: ${age_category}
Notes: ${notes || 'N/A'}
Date: ${new Date().toLocaleString()}
`;

    const mailParams = {
      Source: process.env.ADMIN_EMAIL || 'admin@starxicricket.com',
      Destination: { ToAddresses: [process.env.ADMIN_EMAIL || 'admin@starxicricket.com'] },
      Message: {
        Subject: { Data: `New STARXI Academy Enquiry: ${full_name}` },
        Body: {
          Text: { Data: emailText }
        }
      }
    };

    try {
      if (process.env.AWS_SES_ENABLED === 'true') {
        await sesClient.send(new SendEmailCommand(mailParams));
      }
      return res.status(200).json({ success: true, message: 'Enquiry submitted successfully and notification sent.' });
    } catch (error) {
      console.error('SES Email Notification Warning:', error.message);
      return res.status(200).json({ success: true, message: 'Enquiry recorded successfully.' });
    }
  }
);

module.exports = router;
