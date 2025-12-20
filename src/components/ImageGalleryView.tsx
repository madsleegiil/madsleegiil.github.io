import { useState, type FunctionComponent } from "react";
import type {Image, ImageGallery} from "../posts.ts";
import { formatDateReadable } from "../utils.ts";

type Props = {
    imageGallery: ImageGallery;
};

export const ImageGalleryView: FunctionComponent<Props> = ({ imageGallery }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<Image | null>(null);

    const openModal = (image: Image) => {
        setCurrentImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentImage(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">{imageGallery.title}</h1>
            <p className="text-gray-700 mb-4">{formatDateReadable(imageGallery.date)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {imageGallery.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-md cursor-pointer" onClick={() => openModal(image)}>
                        <img src={image.path} alt={image.alt} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"/>
                    </div>
                ))}
            </div>

            {modalOpen && currentImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-full">
                        <figure>
                            <img src={currentImage.path} alt={currentImage.alt}
                                 className="max-w-full max-h-[90vh] rounded-md"/>
                            {currentImage.caption && (
                                <figcaption className="mt-2 text-white text-center">{currentImage.caption}</figcaption>
                            )}
                            <button className="absolute top-2 right-2 text-white text-4xl font-bold"
                                    onClick={closeModal}>
                                &times;
                            </button>
                        </figure>
                    </div>
                </div>
            )}
        </div>
    );
};
