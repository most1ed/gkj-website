# Troubleshooting Guide

## Common Issues and Solutions

### Frontend Issues

#### 1. Build Failures

**Problem**: Build fails with dependency errors
```bash
Error: Cannot find module '@xyz/component'
```

**Solution**:
1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

#### 2. PDF Generation Issues

**Problem**: PDF generation fails or shows blank pages

**Solutions**:
1. Check font loading:
```typescript
// Ensure fonts are registered
Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto-Regular.ttf'
});
```

2. Verify data structure:
```typescript
// Ensure data is properly structured
const data = {
  title: string,
  content: string,
  date: Date
};
```

#### 3. Performance Issues

**Problem**: Slow page loads or rendering

**Solutions**:
1. Implement code splitting:
```typescript
const PDFViewer = React.lazy(() => import('./PDFViewer'));
```

2. Optimize images:
```typescript
// Use next/image or proper sizing
<Image
  src="/large-image.jpg"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Backend Issues

#### 1. Database Connection Issues

**Problem**: Cannot connect to database

**Solutions**:
1. Check connection string:
```go
// Verify environment variables
if os.Getenv("DB_HOST") == "" {
    log.Fatal("DB_HOST is not set")
}
```

2. Test connection:
```go
db, err := sql.Open("postgres", connectionString)
if err != nil {
    log.Printf("Error opening database: %v", err)
    return err
}

err = db.Ping()
if err != nil {
    log.Printf("Error connecting to database: %v", err)
    return err
}
```

#### 2. API Response Issues

**Problem**: API returns unexpected errors

**Solutions**:
1. Enable detailed logging:
```go
func logRequest() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path
        
        c.Next()
        
        latency := time.Since(start)
        status := c.Writer.Status()
        
        log.Printf("Path: %s | Status: %d | Latency: %v", path, status, latency)
    }
}
```

2. Implement proper error handling:
```go
func handleError(c *gin.Context, err error) {
    log.Printf("Error: %v", err)
    c.JSON(500, gin.H{
        "error": err.Error(),
    })
}
```

### Deployment Issues

#### 1. Container Issues

**Problem**: Container fails to start

**Solutions**:
1. Check logs:
```bash
docker logs container_name
```

2. Verify environment variables:
```bash
docker exec container_name env
```

#### 2. Network Issues

**Problem**: Services cannot communicate

**Solutions**:
1. Check network configuration:
```bash
docker network ls
docker network inspect network_name
```

2. Verify service discovery:
```bash
ping service_name
telnet service_name port
```

## Debugging Tools

### Frontend Debugging

#### 1. React Developer Tools
```typescript
// Enable React Dev Tools in development
if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}
```

#### 2. Performance Monitoring
```typescript
// Add performance marks
performance.mark('startOperation');
// ... operation
performance.mark('endOperation');
performance.measure('operation', 'startOperation', 'endOperation');
```

### Backend Debugging

#### 1. Logging Configuration
```go
func setupLogger() *zap.Logger {
    config := zap.NewProductionConfig()
    config.OutputPaths = []string{"stdout", "logs/app.log"}
    
    logger, err := config.Build()
    if err != nil {
        log.Fatal(err)
    }
    
    return logger
}
```

#### 2. Profiling
```go
import _ "net/http/pprof"

func main() {
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()
}
```

## Monitoring and Alerts

### System Health Checks

#### 1. Backend Health Check
```go
func healthCheck(c *gin.Context) {
    // Check database
    if err := db.Ping(); err != nil {
        c.JSON(500, gin.H{"status": "error", "message": "Database unavailable"})
        return
    }
    
    // Check cache
    if err := redis.Ping(); err != nil {
        c.JSON(500, gin.H{"status": "error", "message": "Cache unavailable"})
        return
    }
    
    c.JSON(200, gin.H{"status": "healthy"})
}
```

#### 2. Frontend Health Check
```typescript
const checkHealth = async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    
    if (data.status !== 'healthy') {
      notifyAdmin('System unhealthy');
    }
  } catch (error) {
    console.error('Health check failed:', error);
    notifyAdmin('Health check failed');
  }
};
```

## Recovery Procedures

### Database Recovery

#### 1. Backup Restoration
```bash
# Restore from backup
pg_restore -d database_name backup_file.dump

# Verify restoration
psql -d database_name -c "SELECT COUNT(*) FROM users;"
```

#### 2. Data Verification
```sql
-- Check data integrity
SELECT COUNT(*), status FROM orders GROUP BY status;
SELECT COUNT(*), date_trunc('day', created_at) FROM events GROUP BY date_trunc('day', created_at);
```

### System Recovery

#### 1. Service Restart
```bash
# Restart services in order
systemctl restart postgresql
systemctl restart redis
systemctl restart gkj-backend
systemctl restart nginx
```

#### 2. Cache Rebuild
```go
func rebuildCache() error {
    // Clear existing cache
    if err := redis.FlushAll(); err != nil {
        return fmt.Errorf("clearing cache: %w", err)
    }
    
    // Rebuild cache
    if err := rebuildUserCache(); err != nil {
        return fmt.Errorf("rebuilding user cache: %w", err)
    }
    
    return nil
}
```

## Performance Optimization

### Frontend Optimization

#### 1. Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze
```

#### 2. Performance Monitoring
```typescript
// Add performance monitoring
export function withPerformanceMonitoring(WrappedComponent: React.ComponentType) {
  return function PerformanceMonitoring(props: any) {
    useEffect(() => {
      performance.mark('componentStart');
      
      return () => {
        performance.mark('componentEnd');
        performance.measure(
          'componentRender',
          'componentStart',
          'componentEnd'
        );
      };
    }, []);
    
    return <WrappedComponent {...props} />;
  };
}
```

### Backend Optimization

#### 1. Query Optimization
```go
// Add query timing
func timeQuery(query string, args ...interface{}) {
    start := time.Now()
    result, err := db.Exec(query, args...)
    duration := time.Since(start)
    
    log.Printf("Query took %v: %s", duration, query)
}
```

#### 2. Cache Optimization
```go
func getCachedData(key string) (interface{}, error) {
    // Try cache first
    if data, err := cache.Get(key); err == nil {
        return data, nil
    }
    
    // Get from database
    data, err := db.Get(key)
    if err != nil {
        return nil, err
    }
    
    // Update cache
    cache.Set(key, data, time.Hour)
    return data, nil
}
```
