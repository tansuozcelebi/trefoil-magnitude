# SiteGround Deployment Guide - Trefoil Knot Visualizer

## Overview
This guide explains how to deploy the Trefoil Knot Visualizer to SiteGround hosting.

## Prerequisites
- SiteGround hosting account
- Access to cPanel or Site Tools
- FTP client (optional, if not using File Manager)

## Deployment Steps

### 1. Prepare Files for Upload
All necessary files are included in this repository:
- `index.html` - Main application
- `styles.css` - Styling and animations
- `controls.js` - Interactive control panel
- `trefoil_knot.html` - Legacy/fallback version
- `.htaccess` - Performance and security optimizations
- `manifest.json` - PWA support
- `404.html` - Custom error page

### 2. Upload to SiteGround

#### Option A: Using File Manager (Recommended)
1. Login to your SiteGround account
2. Go to Site Tools > Website > File Manager
3. Navigate to `public_html` directory (or your domain's root directory)
4. Upload all project files to this directory
5. Ensure file permissions are set correctly (644 for files, 755 for directories)

#### Option B: Using FTP Client
1. Connect to your SiteGround FTP using your credentials
2. Navigate to `public_html` directory
3. Upload all project files
4. Set proper file permissions

### 3. SiteGround-Specific Optimizations

#### Enable SuperCacher
1. Go to Site Tools > Speed > SuperCacher
2. Enable Dynamic and Static caching
3. This will improve loading times for the 3D visualizer

#### Enable HTTPS (if not already active)
1. Go to Site Tools > Security > SSL Manager
2. Install/activate Let's Encrypt SSL
3. Uncomment the HTTPS redirect lines in `.htaccess` if needed

#### Optimize PHP (if using PHP features in future)
1. Go to Site Tools > Devs > PHP Manager
2. Select the latest stable PHP version
3. Enable OPCache for better performance

### 4. Test the Deployment

#### Primary Tests
1. Visit `https://yourdomain.com/` to test the main application
2. Visit `https://yourdomain.com/trefoil_knot.html` for the legacy version
3. Test on mobile devices for responsive design
4. Verify all interactive controls work properly

#### Browser Compatibility Tests
Test on multiple browsers:
- Chrome (desktop and mobile)
- Firefox
- Safari (desktop and mobile)
- Edge

### 5. Performance Optimization

#### CDN Configuration
The application uses external CDNs for Three.js:
- Primary: unpkg.com
- Fallback: jsdelivr.net

#### Monitoring
- Use SiteGround's built-in analytics
- Monitor loading times and user interactions
- Check for any console errors

### 6. Security Considerations

The included `.htaccess` file provides:
- Compression for faster loading
- Security headers
- Cache control for static assets
- Protection for sensitive files

### 7. Troubleshooting

#### Common Issues:
1. **Three.js not loading**: Check internet connection and CDN availability
2. **Controls not working**: Verify all JavaScript files are uploaded and accessible
3. **Mobile issues**: Ensure viewport meta tag is present and touch events work

#### SiteGround Support:
- Use SiteGround's ticket system for hosting-related issues
- Check SiteGround's status page for any service interruptions

### 8. Maintenance

#### Regular Tasks:
- Monitor site performance
- Update Three.js version periodically
- Check for browser compatibility updates
- Review security headers and .htaccess optimizations

#### Backup:
- Use SiteGround's automatic backup feature
- Keep local copies of all project files

### 9. Future Enhancements

#### Potential Improvements:
- Add service worker for offline functionality
- Implement local Three.js fallback
- Add Google Analytics or similar tracking
- Optimize for Core Web Vitals

## File Structure for SiteGround

```
public_html/
├── index.html              # Main application
├── styles.css              # Styling
├── controls.js             # Control panel
├── trefoil_knot.html       # Legacy version
├── manifest.json           # PWA manifest
├── 404.html               # Custom error page
├── .htaccess              # Server configuration
└── README.md              # Documentation
```

## Domain Configuration

If using a subdomain or specific path:
1. Update manifest.json start_url
2. Adjust any absolute paths in HTML files
3. Update .htaccess redirects if needed

## SSL and Security

SiteGround provides free SSL certificates. Ensure:
1. SSL is active on your domain
2. Mixed content warnings are avoided (all resources use HTTPS)
3. Security headers in .htaccess are properly configured

## Performance Metrics

Expected performance on SiteGround:
- Initial load: <3 seconds
- 3D rendering: <1 second after Three.js loads
- Interactive response: <100ms
- Mobile performance: Good with proper optimization

This deployment guide ensures optimal performance and security for your Trefoil Knot Visualizer on SiteGround hosting.