# Component Documentation

## Table of Contents
1. [UI Components](#ui-components)
2. [Layout Components](#layout-components)
3. [Feature Components](#feature-components)
4. [Page Components](#page-components)
5. [PDF Components](#pdf-components)

## UI Components

### Button (`components/ui/Button.tsx`)
Modern, accessible button component with multiple variants.

#### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}
```

#### Usage
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Input (`components/ui/Input.tsx`)
Form input component with validation support.

#### Props
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  error?: string
  value: string
  onChange: (value: string) => void
}
```

### Select (`components/ui/Select.tsx`)
Dropdown select component with search functionality.

#### Props
```typescript
interface SelectProps {
  options: Array<{ label: string; value: string }>
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
```

## Layout Components

### Layout (`components/layout/Layout.tsx`)
Main layout wrapper with navigation and footer.

#### Usage
```tsx
<Layout>
  <YourPageContent />
</Layout>
```

### Navigation (`components/layout/Navigation.tsx`)
Main navigation bar with responsive menu.

### Footer (`components/layout/Footer.tsx`)
Site footer with links and social media.

## Feature Components

### WartaPDF (`components/WartaPDF.tsx`)
Generates PDF for church bulletins.

#### Props
```typescript
interface WartaPDFProps {
  wartaData: WartaData
  onGenerated?: (url: string) => void
  onError?: (error: Error) => void
}
```

### PDFDownloadButton (`components/PDFDownloadButton.tsx`)
Button component for downloading PDFs.

#### Props
```typescript
interface PDFDownloadButtonProps {
  pdfUrl: string
  fileName: string
  onDownload?: () => void
}
```

## Page Components

### Home (`pages/Home.tsx`)
Landing page component with featured content.

### Warta (`pages/Warta.tsx`)
Church bulletin page with PDF generation.

### Offerings (`pages/Offerings.tsx`)
Offerings management page with forms and reports.

### Media (`pages/Media.tsx`)
Media content management with gallery and uploads.

## PDF Components

### PDFGenerator (`components/PDFGenerator.tsx`)
Generic PDF generation component.

#### Props
```typescript
interface PDFGeneratorProps {
  template: PDFTemplate
  data: any
  options?: PDFOptions
}
```

## Best Practices

### Component Development
1. Keep components focused and single-responsibility
2. Implement proper TypeScript types
3. Add proper documentation
4. Include error handling
5. Implement loading states
6. Add proper accessibility attributes

### Performance
1. Use React.memo for expensive renders
2. Implement proper code splitting
3. Optimize re-renders
4. Use proper key props
5. Implement proper caching

### Accessibility
1. Use semantic HTML
2. Implement ARIA attributes
3. Support keyboard navigation
4. Provide proper contrast
5. Add proper focus management

## Testing

### Unit Tests
```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
```

### Integration Tests
```typescript
describe('WartaPDF', () => {
  it('generates PDF correctly', async () => {
    render(<WartaPDF wartaData={mockData} />)
    await waitFor(() => {
      expect(screen.getByText('Download PDF')).toBeEnabled()
    })
  })
})
```