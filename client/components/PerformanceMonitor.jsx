import React, { useEffect, useState } from 'react';

const PerformanceMonitor = ({ enabled = process.env.NODE_ENV === 'development' }) => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    if (!enabled) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const newMetrics = {};

      entries.forEach((entry) => {
        switch (entry.entryType) {
          case 'navigation':
            newMetrics.pageLoad = {
              domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
              loadComplete: entry.loadEventEnd - entry.loadEventStart,
              firstPaint: entry.responseEnd - entry.fetchStart
            };
            break;
          case 'paint':
            newMetrics[entry.name] = entry.startTime;
            break;
          case 'largest-contentful-paint':
            newMetrics.lcp = entry.startTime;
            break;
          case 'first-input':
            newMetrics.fid = entry.processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!newMetrics.cls) newMetrics.cls = 0;
            if (!entry.hadRecentInput) {
              newMetrics.cls += entry.value;
            }
            break;
          default:
            break;
        }
      });

      setMetrics(prev => ({ ...prev, ...newMetrics }));
    });

    // Observe different performance entry types
    const entryTypes = ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'];
    
    entryTypes.forEach(type => {
      try {
        observer.observe({ entryTypes: [type] });
      } catch (e) {
        // Some browsers might not support all entry types
        console.warn(`Performance observer for ${type} not supported`);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || Object.keys(metrics).length === 0) return;

    console.group('Performance Metrics');
    console.table(metrics);
    console.groupEnd();
  }, [metrics, enabled]);

  if (!enabled) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Performance Metrics</h4>
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {
            typeof value === 'object' 
              ? JSON.stringify(value, null, 2)
              : `${Math.round(value)}ms`
          }
        </div>
      ))}
    </div>
  );
};

export default PerformanceMonitor;
