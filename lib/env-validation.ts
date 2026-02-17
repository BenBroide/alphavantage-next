/**
 * Environment Variable Validation
 * Checks for required environment variables at startup
 */

function validateEnv() {
  // Skip validation in test environment
  if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined) {
    console.log('[INFO] Test environment detected, skipping environment validation');
    return;
  }
  
  const requiredEnvVars = [
    'ALPHAVANTAGE_API_KEY',
    'ALPHAVANTAGE_API_KEY_2',
  ];

  const optionalEnvVars = [
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET_NAME',
  ];

  const missing: string[] = [];
  const missingOptional: string[] = [];

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional AWS variables (all or none should be set)
  const awsVarsSet = optionalEnvVars.filter(varName => process.env[varName]);
  const hasPartialAwsConfig = awsVarsSet.length > 0 && awsVarsSet.length < optionalEnvVars.length;

  if (hasPartialAwsConfig) {
    optionalEnvVars.forEach(varName => {
      if (!process.env[varName]) {
        missingOptional.push(varName);
      }
    });
  }

  // Report errors
  if (missing.length > 0) {
    console.error('[ERROR] Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease add them to your .env.local file');
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (missingOptional.length > 0) {
    console.warn('[WARN] Partial AWS configuration detected. Missing:');
    missingOptional.forEach(varName => console.warn(`   - ${varName}`));
    console.warn('\nS3 caching will be disabled. Add all AWS variables to enable caching.');
  }

  // Success message
  console.log('[OK] Environment variables validated');
  if (awsVarsSet.length === optionalEnvVars.length) {
    console.log('[OK] AWS S3 caching enabled');
  } else {
    console.log('[INFO] AWS S3 caching disabled (no AWS credentials configured)');
  }
}

// Run validation
validateEnv();
