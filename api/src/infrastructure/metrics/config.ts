import * as promBundle from 'express-prom-bundle';

export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    app: 'e-commerce-api',
  },
  transformLabels: (labels, req, res) => {
    // Custom labels can be added or modified here
    labels.status_code = res.statusCode;
  },
  promClient: {
    collectDefaultMetrics: {},
  },
  metricsPath: '/metrics',
});
