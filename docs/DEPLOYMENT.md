# Deployment Guide

## Environments

### Development
- URL: `https://dev.gkj-website.com`
- Branch: `develop`
- Auto-deploy: Yes
- Database: Development instance

### Staging
- URL: `https://staging.gkj-website.com`
- Branch: `staging`
- Auto-deploy: On PR merge
- Database: Staging instance

### Production
- URL: `https://gkj-website.com`
- Branch: `main`
- Auto-deploy: Manual trigger
- Database: Production cluster

## Infrastructure

```
                                   ┌─────────────┐
                                   │ CloudFlare  │
                                   │    CDN      │
                                   └──────┬──────┘
                                          │
                                   ┌──────┴──────┐
                                   │   Load      │
                                   │  Balancer   │
                                   └──────┬──────┘
                                          │
                    ┌──────────────┬──────┴───────┬──────────────┐
                    │              │              │              │
            ┌───────┴──────┐┌─────┴─────┐ ┌──────┴─────┐┌──────┴──────┐
            │  Frontend    ││  Backend   │ │  Backend   ││  Backend    │
            │   Server     ││  Server 1  │ │  Server 2  ││  Server 3   │
            └───────┬──────┘└─────┬─────┘ └──────┬─────┘└──────┬──────┘
                    │             │              │              │
            ┌───────┴──────┐┌─────┴─────┐ ┌──────┴─────┐┌──────┴──────┐
            │   Static     ││ Database   │ │   Redis    ││    S3       │
            │   Assets     ││  Cluster   │ │   Cache    ││  Storage    │
            └─────────────┘└────────────┘ └────────────┘└─────────────┘
```

## Deployment Process

### 1. Pre-deployment Checklist
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Database migrations ready
- [ ] Backup completed
- [ ] Monitoring configured

### 2. Frontend Deployment

```bash
# Build frontend
cd frontend
npm install
npm run build

# Deploy to CDN
aws s3 sync dist/ s3://gkj-website-static
aws cloudfront create-invalidation --distribution-id XXX
```

### 3. Backend Deployment

```bash
# Build backend
cd backend
go build -o app

# Deploy with Docker
docker build -t gkj-backend .
docker push gkj-backend:latest

# Apply Kubernetes configs
kubectl apply -f k8s/
```

### 4. Database Migrations

```bash
# Run migrations
cd backend
go run cmd/migrate/main.go up
```

## Monitoring Setup

### 1. Metrics
- Prometheus for system metrics
- Grafana for visualization
- Custom business metrics

### 2. Logging
- ELK Stack setup
- Log retention policies
- Alert configuration

### 3. Error Tracking
- Sentry integration
- Error notification setup
- Error grouping rules

## Backup Strategy

### 1. Database Backups
```bash
# Daily full backup
pg_dump -Fc -d gkj_db > backup.dump

# Store in S3
aws s3 cp backup.dump s3://gkj-backups/
```

### 2. File Backups
- Daily incremental
- Weekly full backup
- 30-day retention

## Scaling Configuration

### 1. Horizontal Scaling
```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gkj-backend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: gkj-backend
        image: gkj-backend:latest
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
```

### 2. Cache Configuration
```yaml
# redis-config.yaml
maxmemory 2gb
maxmemory-policy allkeys-lru
```

## Security Measures

### 1. SSL Configuration
```nginx
# nginx.conf
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
```

### 2. Firewall Rules
```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
```

## Rollback Procedures

### 1. Frontend Rollback
```bash
# Revert to previous version
aws s3 cp s3://gkj-website-static-backup/ s3://gkj-website-static/ --recursive
```

### 2. Backend Rollback
```bash
# Rollback Kubernetes deployment
kubectl rollout undo deployment/gkj-backend
```

### 3. Database Rollback
```bash
# Restore from backup
pg_restore -d gkj_db backup.dump
```

## Performance Optimization

### 1. CDN Configuration
```json
{
  "DefaultCacheBehavior": {
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  }
}
```

### 2. Database Optimization
```sql
-- Add necessary indexes
CREATE INDEX idx_warta_date ON warta(date);
CREATE INDEX idx_user_email ON users(email);
```

## Maintenance Procedures

### 1. Regular Updates
```bash
# Update dependencies
npm audit fix
go get -u all
```

### 2. System Updates
```bash
# Update system packages
apt update && apt upgrade -y
```

## Emergency Procedures

### 1. High Load
- Scale up resources
- Enable caching
- Disable non-critical features

### 2. Security Breach
- Isolate affected systems
- Rotate credentials
- Notify security team

## Compliance

### 1. Backup Verification
- Daily backup testing
- Monthly recovery testing
- Quarterly DR exercise

### 2. Security Audits
- Monthly security scans
- Quarterly penetration tests
- Annual security review

## Monitoring Alerts

### 1. Critical Alerts
- Server down
- High error rate
- Database issues
- Security alerts

### 2. Warning Alerts
- High CPU usage
- Low disk space
- Slow response time
- Cache miss rate
