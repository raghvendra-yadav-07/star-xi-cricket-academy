# AWS Cost Optimization & Infrastructure Breakdown

## STARXI Cricket Academy (Barhalganj, Chillupar, UP)

### Projected Usage Profile
- **Target Monthly Visitors**: 100–200 unique visitors
- **Traffic Pattern**: Low-to-moderate static web traffic with form submissions and video embeds

### Recommended Cloud Architecture
1. **Frontend Hosting**: Amazon S3 static bucket + **AWS CloudFront** CDN distribution (SSL via ACM).
2. **API Backend**: Express REST API running on **AWS Lambda** (via Serverless Framework or HTTP API Gateway wrapper) or small EC2 t4g.nano instance.
3. **Storage**: **Amazon S3** for media asset storage with pre-signed direct browser uploads.
4. **Notifications**: **AWS SES** for instant email alerts to academy administrators upon enquiry submissions.

---

### Monthly Cost Projection (USD)

| Cloud Service | Config / Usage Metric | Estimated Monthly Cost |
| :--- | :--- | :--- |
| **Amazon S3 (Frontend)** | < 1 GB storage, ~5,000 requests | $0.03 |
| **AWS CloudFront (CDN)** | < 10 GB Data Transfer Out (AWS Free Tier: 1 TB/mo) | $0.00 |
| **AWS Lambda** | < 1,000 API invocations (AWS Free Tier: 1M calls/mo) | $0.00 |
| **Amazon API Gateway** | < 1,000 HTTP requests | $0.01 |
| **AWS SES** | ~50 Transactional Emails/month | $0.01 |
| **Amazon Route 53** | 1 Hosted Zone (Custom Domain DNS) | $0.50 |
| **Total Estimated Cost** | | **~$0.55 – $1.00 / month** |
