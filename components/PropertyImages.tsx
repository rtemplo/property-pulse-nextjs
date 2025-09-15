'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

interface PropertyImagesProps {
  images: string[];
}

const PropertyImages: React.FC<PropertyImagesProps> = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50">
        <div className="container m-auto p-6">
          {images.length === 0 ? (
            <Item original={images[0]} thumbnail={images[0]} width="1000" height="600">
              {({ ref, open }) => (
                <Image
                  alt=""
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length % 2 === 1 && index === images.length - 1
                      ? 'col-span-2'
                      : 'col-span-1'
                  }`}
                >
                  <Item original={image} thumbnail={image} width="1000" height="600">
                    {({ ref, open }) => (
                      <Image
                        alt=""
                        ref={ref}
                        onClick={open}
                        src={image}
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
