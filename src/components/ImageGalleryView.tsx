import { useState, type FunctionComponent, useEffect } from "react";
import type { ImageGallery } from "../posts.ts";
import { formatDateReadable } from "../utils.ts";

type Props = {
    imageGallery: ImageGallery;
};

export const ImageGalleryView: FunctionComponent<Props> = ({ imageGallery }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentIndex(null);
    };

    const prevImage = () => {
        if (currentIndex === null) return;
        setCurrentIndex((currentIndex - 1 + imageGallery.images.length) % imageGallery.images.length);
    };

    const nextImage = () => {
        if (currentIndex === null) return;
        setCurrentIndex((currentIndex + 1) % imageGallery.images.length);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!modalOpen) return;
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [modalOpen, currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        if (deltaX > 50) prevImage();
        else if (deltaX < -50) nextImage();
        setTouchStartX(null);
    };

    const currentImage = currentIndex !== null ? imageGallery.images[currentIndex] : null;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">{imageGallery.title}</h1>
            <p className="text-gray-700 mb-4">{formatDateReadable(imageGallery.date)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {imageGallery.images.map((image, index) => (
                    <div key={index} className="overflow-hidden mb-4 sm:mb-0">
                        <div className="hidden sm:block cursor-pointer" onClick={() => openModal(index)}>
                            <img src={image.path} alt={image.alt} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"/>
                        </div>
                        <div className="block sm:hidden">
                            <img src={image.path} alt={image.alt} className="w-full h-full object-cover"/>
                            {image.caption && (
                                <p className="mt-1 text-gray-700 text-sm">{image.caption}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && currentImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                        <figure>
                            <img src={currentImage.path} alt={currentImage.alt} className="max-w-full max-h-[90vh]"/>
                            {currentImage.caption && (
                                <figcaption className="mt-2 text-white text-center">
                                    {currentImage.caption}
                                </figcaption>
                            )}

                            <button className="absolute top-2 right-2 text-white text-4xl font-bold cursor-pointer" onClick={closeModal}>&times;</button>

                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold select-none cursor-pointer"
                            >
                                &#10094;
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold select-none cursor-pointer"
                            >
                                &#10095;
                            </button>
                        </figure>
                    </div>
                </div>
            )}
        </div>
    );
};
