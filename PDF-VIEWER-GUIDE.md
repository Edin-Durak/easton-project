# PDF Viewer Component Guide

## 📋 Overview

The PDF Viewer is a responsive, interactive component that displays PDF files with navigation controls. It automatically adapts to different screen sizes:

- **Desktop**: Shows 2 pages side-by-side
- **Mobile/Tablet**: Shows 1 page at a time

## 🚀 Quick Start

### Basic Usage

```astro
---
import PDFViewer from '../components/PDFViewer.astro';
---

<PDFViewer
  heading="My PDF Document"
  pdfPath="/pdf/my-document.pdf"
/>
```

### With Custom Props

```astro
<PDFViewer
  heading="Annual Report 2024"
  pdfPath="/pdf/annual-report.pdf"
/>
```

## 📁 Adding PDF Files

### Step 1: Add PDF to Public Directory

Place your PDF files in the `public/pdf/` directory:

```
public/
└── pdf/
    ├── example-pdf.pdf
    ├── annual-report.pdf
    ├── user-manual.pdf
    └── brochure.pdf
```

### Step 2: Use in Component

```astro
<!-- Different PDFs for different sections -->
<PDFViewer heading="User Manual" pdfPath="/pdf/user-manual.pdf" />

<PDFViewer heading="Product Brochure" pdfPath="/pdf/brochure.pdf" />

<PDFViewer heading="Annual Report" pdfPath="/pdf/annual-report.pdf" />
```

## 🎛️ Component Props

| Prop      | Type   | Default                | Description                                         |
| --------- | ------ | ---------------------- | --------------------------------------------------- |
| `heading` | string | "Annual Report 2024"   | Title displayed above the PDF viewer                |
| `pdfPath` | string | "/pdf/example-pdf.pdf" | Path to the PDF file (relative to public directory) |

## 📱 Responsive Behavior

### Desktop (992px+)

- Shows **2 pages** side-by-side
- Navigation moves by 2 pages
- Grid layout with gap

### Mobile/Tablet (<992px)

- Shows **1 page** at a time
- Navigation moves by 1 page
- Single column layout

## 🎨 Styling

The component uses your site's design system:

```css
/* Colors match your theme */
--color-warm-beige: #ddbd92
--color-dark-navy: #1b2a30
--color-deep-charcoal: #2f3c41
```

### Custom Styling

To customize the appearance, modify `src/assets/styles/components.css`:

```css
.pdf-viewer__heading {
  /* Custom heading styles */
  font-size: 3rem;
  color: var(--color-warm-beige);
}

.pdf-viewer__btn {
  /* Custom button styles */
  background-color: var(--color-dark-navy);
  border: 2px solid var(--color-warm-beige);
}
```

## 🔧 Technical Details

### File Structure

```
src/
├── components/
│   └── PDFViewer.astro          # Main component
├── assets/
│   └── styles/
│       └── components.css       # PDF viewer styles
public/
├── libs/
│   ├── pdf.min.js              # PDF.js library (320KB)
│   └── pdf.worker.min.js       # PDF.js worker (1MB)
└── pdf/
    └── your-files.pdf          # Your PDF files
```

### How It Works

1. **Dynamic Loading**: PDF.js loads only when component initializes
2. **Canvas Rendering**: PDF pages rendered to HTML5 canvas
3. **Responsive Logic**: Automatically switches between 1/2 page view
4. **Navigation**: Previous/Next buttons with proper disabled states

## 📝 Usage Examples

### Multiple PDFs on Same Page

```astro
---
import PDFViewer from '../components/PDFViewer.astro';
---

<main>
  <section>
    <h1>Documentation</h1>
    <PDFViewer heading="User Guide" pdfPath="/pdf/user-guide.pdf" />
  </section>

  <section>
    <PDFViewer heading="API Reference" pdfPath="/pdf/api-reference.pdf" />
  </section>

  <section>
    <PDFViewer heading="Troubleshooting" pdfPath="/pdf/troubleshooting.pdf" />
  </section>
</main>
```

### Conditional PDF Display

```astro
---
import PDFViewer from '../components/PDFViewer.astro';

const showReport = true;
const reportType = "annual";
---

{showReport && (
  <PDFViewer
    heading={`${reportType} Report`}
    pdfPath={`/pdf/${reportType}-report.pdf`}
  />
)}
```

### Dynamic PDF Selection

```astro
---
import PDFViewer from '../components/PDFViewer.astro';

const pdfFiles = [
  { title: "Q1 Report", path: "/pdf/q1-report.pdf" },
  { title: "Q2 Report", path: "/pdf/q2-report.pdf" },
  { title: "Q3 Report", path: "/pdf/q3-report.pdf" }
];

const selectedPdf = pdfFiles[0]; // Or use dynamic selection
---

<PDFViewer
  heading={selectedPdf.title}
  pdfPath={selectedPdf.path}
/>
```

## 🛠️ Maintenance

### Updating PDF.js Version

To update to a newer PDF.js version:

1. Edit `scripts/download-pdfjs.js`:

```javascript
const PDFJS_VERSION = "3.12.0"; // Update version number
```

2. Run the update command:

```bash
npm run download-pdfjs
```

### Adding New PDF Files

1. **Copy PDF to public directory**:

```bash
cp "path/to/your/file.pdf" "public/pdf/your-file.pdf"
```

2. **Use in component**:

```astro
<PDFViewer heading="Your Title" pdfPath="/pdf/your-file.pdf" />
```

## 🐛 Troubleshooting

### Common Issues

#### PDF Not Loading

- ✅ Check file exists in `public/pdf/`
- ✅ Verify path starts with `/pdf/`
- ✅ Ensure file is not corrupted

#### Navigation Not Working

- ✅ Check browser console for errors
- ✅ Verify PDF.js files are loaded
- ✅ Ensure PDF has multiple pages

#### Styling Issues

- ✅ Check CSS variables are defined
- ✅ Verify component CSS is imported
- ✅ Test responsive breakpoints

### Debug Mode

Add this to see detailed logs:

```javascript
// In PDFViewer.astro script section
console.log("PDF Path:", pdfPath);
console.log("PDF.js loaded:", !!window.pdfjsLib);
```

## 🚀 Performance Tips

### Optimization

1. **Compress PDFs**: Use tools like `ghostscript` to reduce file size
2. **Lazy Loading**: Component only loads when visible
3. **Caching**: PDF.js files are cached by browser
4. **CDN**: Serve from your CDN for better performance

### File Size Guidelines

- **PDF Files**: Keep under 10MB for good performance
- **PDF.js Library**: 1.3MB total (already optimized)
- **Loading Time**: ~200ms for local files vs ~800ms for CDN

## 📚 Advanced Usage

### Custom Navigation

```astro
<!-- Add custom navigation controls -->
<div class="custom-nav">
  <button onclick="goToPage(1)">First</button>
  <button onclick="goToPage(5)">Page 5</button>
  <button onclick="goToLast()">Last</button>
</div>

<PDFViewer heading="Document" pdfPath="/pdf/document.pdf" />
```

### Multiple Viewers

```astro
<!-- Each viewer is independent -->
<PDFViewer heading="Report 1" pdfPath="/pdf/report1.pdf" />
<PDFViewer heading="Report 2" pdfPath="/pdf/report2.pdf" />
<PDFViewer heading="Report 3" pdfPath="/pdf/report3.pdf" />
```

## 🔒 Security Notes

- PDFs are served from `public/` directory (publicly accessible)
- No server-side processing of PDF content
- Client-side rendering only
- Consider access controls for sensitive documents

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify file paths are correct
3. Test with different PDF files
4. Check network tab for failed requests

---

**Happy PDF Viewing!** 📄✨
