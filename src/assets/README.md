# Assets Folder Structure

Organized folder structure for all static assets used in the Ramsnehi Photography frontend.

## Folders

### `/gallery`
Store all static gallery images here
- Wedding photos
- Event photos
- Portfolio images

### `/testimonials`
Profile images for testimonials/client reviews
- Client profile pictures
- Avatar images

### `/blog`
Blog post featured images and blog-related media

### `/placeholders`
Placeholder images for loading states or defaults
- Loading skeletons
- Default image fallbacks

### `/icons`
SVG icons and icon assets
- Navigation icons
- UI icons
- Social media icons

## Upload Instructions

Push your images to the respective folders based on their type. The frontend will automatically reference them from these locations.

Example usage in components:
```jsx
import blogImage from '../assets/blog/image-name.jpg';
import testimonialImage from '../assets/testimonials/profile.jpg';
```
