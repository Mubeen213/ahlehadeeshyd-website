import React from 'react';
import image1 from '../../assets/programs/image1.jpeg';
import image2 from '../../assets/programs/image2.jpeg';
import image3 from '../../assets/programs/image3.jpeg';
import image4 from '../../assets/programs/image4.jpeg';
import image5 from '../../assets/programs/image5.jpeg';

interface ImageItem {
  src: any; // Using 'any' here because imported images are webpack objects
  alt: string;
}

const Photos: React.FC = () => {
  const images: ImageItem[] = [
    { src: image1, alt: "Gallery image 1" },
    { src: image2, alt: "Gallery image 2" },
    { src: image3, alt: "Gallery image 3" },
    { src: image4, alt: "Gallery image 4" },
    { src: image5, alt: "Gallery image 5" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={image.src.src || image.src} // Handle both imported images and string paths
              alt={image.alt}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;