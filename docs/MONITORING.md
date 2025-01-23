# Monitoring and Observability Guide

## Overview

This document outlines the monitoring and observability strategy for the GKJ Website.

## Monitoring Stack

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Application │────►│ Prometheus  │────►│  Grafana    │
│  Metrics    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                   │
      │              ┌─────┴─────┐            │
      └────────────►│ AlertManager│◄───────────┘
                    │            │
                    └─────┬──────┘
                          │
                    ┌─────┴─────┐
                    │  Alerts   │
                    │(Email/SMS)│
                    └───────────┘
```

## Key Metrics

### 1. System Metrics

#### CPU Usage
```prometheus
# Prometheus query
rate(process_cpu_seconds_total[5m]) * 100
```

#### Memory Usage
```prometheus
# Prometheus query
process_resident_memory_bytes / 1024 / 1024
```

#### Disk Usage
```prometheus
# Prometheus query
node_filesystem_avail_bytes{mountpoint="/"}
```

### 2. Application Metrics

#### Request Rate
```prometheus
# Prometheus query
rate(http_requests_total[5m])
```

#### Error Rate
```prometheus
# Prometheus query
rate(http_requests_total{status=~"5.."}[5m])
```

#### Response Time
```prometheus
# Prometheus query
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

## Alerting Rules

### 1. High Priority Alerts

```yaml
# prometheus/alerts.yml
groups:
- name: critical
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High error rate detected
      description: Error rate is above 10% for 5 minutes

  - alert: ServiceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: Service is down
      description: Service has been down for more than 1 minute
```

### 2. Warning Alerts

```yaml
# prometheus/alerts.yml
groups:
- name: warnings
  rules:
  - alert: HighCPUUsage
    expr: rate(process_cpu_seconds_total[5m]) * 100 > 80
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: High CPU usage
      description: CPU usage is above 80% for 10 minutes

  - alert: LowDiskSpace
    expr: node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} * 100 < 20
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: Low disk space
      description: Less than 20% disk space available
```

## Logging

### 1. Log Levels

```go
// Backend logging
type LogLevel string

const (
    LogDebug   LogLevel = "debug"
    LogInfo    LogLevel = "info"
    LogWarning LogLevel = "warning"
    LogError   LogLevel = "error"
)

func logMessage(level LogLevel, message string, fields map[string]interface{}) {
    logger.Log(level, message, fields)
}
```

### 2. Log Format

```json
{
  "timestamp": "2025-01-23T13:45:00Z",
  "level": "info",
  "service": "api",
  "message": "Request processed",
  "details": {
    "method": "GET",
    "path": "/api/warta",
    "duration": 45,
    "status": 200
  },
  "trace_id": "abc123"
}
```

## Tracing

### 1. Distributed Tracing

```go
// Backend tracing
func tracingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        span := tracer.StartSpan("http_request")
        defer span.Finish()

        ctx := context.WithValue(r.Context(), "trace", span)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

### 2. Frontend Tracing

```typescript
// Frontend performance tracing
const tracePageLoad = () => {
  const timing = window.performance.timing;
  const pageLoad = timing.loadEventEnd - timing.navigationStart;
  
  sendMetric('page_load', pageLoad);
};
```

## Dashboard Templates

### 1. System Overview

```yaml
# grafana/dashboards/system.json
{
  "title": "System Overview",
  "panels": [
    {
      "title": "CPU Usage",
      "type": "graph",
      "targets": [
        {
          "expr": "rate(process_cpu_seconds_total[5m]) * 100"
        }
      ]
    },
    {
      "title": "Memory Usage",
      "type": "graph",
      "targets": [
        {
          "expr": "process_resident_memory_bytes"
        }
      ]
    }
  ]
}
```

### 2. Application Performance

```yaml
# grafana/dashboards/application.json
{
  "title": "Application Performance",
  "panels": [
    {
      "title": "Request Rate",
      "type": "graph",
      "targets": [
        {
          "expr": "rate(http_requests_total[5m])"
        }
      ]
    },
    {
      "title": "Error Rate",
      "type": "graph",
      "targets": [
        {
          "expr": "rate(http_requests_total{status=~\"5..\"}[5m])"
        }
      ]
    }
  ]
}
```

## Incident Response

### 1. Alert Response

```yaml
# runbook/alerts.yml
alerts:
  high_error_rate:
    description: Error rate above threshold
    severity: critical
    steps:
      - Check error logs
      - Identify error pattern
      - Check recent deployments
      - Roll back if necessary
    contacts:
      - primary: tech-lead@gkj-website.com
      - secondary: devops@gkj-website.com
```

### 2. Incident Documentation

```markdown
# Incident Report Template

## Summary
- Date: [Date]
- Duration: [Duration]
- Impact: [Impact]

## Timeline
- [Time] Issue detected
- [Time] Investigation started
- [Time] Root cause identified
- [Time] Fix implemented
- [Time] Service restored

## Root Cause
[Description of what caused the incident]

## Resolution
[Description of how the incident was resolved]

## Prevention
[Steps to prevent similar incidents]
```

## Performance Monitoring

### 1. Frontend Performance

```typescript
// Performance monitoring
const monitorPerformance = () => {
  const metrics = {
    FCP: performance.getEntriesByName('first-contentful-paint')[0].startTime,
    LCP: getLargestContentfulPaint(),
    TTI: getTimeToInteractive(),
    FID: getFirstInputDelay()
  };
  
  sendMetrics(metrics);
};
```

### 2. Backend Performance

```go
// Performance middleware
func performanceMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        
        next.ServeHTTP(w, r)
        
        duration := time.Since(start)
        path := r.URL.Path
        
        metrics.RecordRequestDuration(path, duration)
    })
}
```

## Capacity Planning

### 1. Resource Monitoring

```prometheus
# CPU Usage Prediction
predict_linear(cpu_usage_rate[1h], 24 * 3600)

# Memory Growth
rate(memory_usage_bytes[1h])
```

### 2. Scaling Thresholds

```yaml
# kubernetes/autoscaling.yml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: gkj-backend
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: gkj-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 80
```

## Security Monitoring

### 1. Security Metrics

```prometheus
# Failed Login Attempts
rate(login_failures_total[5m])

# Suspicious IP Access
rate(suspicious_ip_access_total[5m])
```

### 2. Security Alerts

```yaml
# Security alert rules
groups:
- name: security
  rules:
  - alert: HighLoginFailures
    expr: rate(login_failures_total[5m]) > 10
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High number of login failures
      description: More than 10 login failures per minute
```
