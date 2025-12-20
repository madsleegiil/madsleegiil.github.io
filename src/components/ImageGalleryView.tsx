import type {FunctionComponent} from "react";
import type {ImageGallery} from "../posts.ts";
import {formatDateReadable} from "../utils.ts";

type Props = {
    imageGallery: ImageGallery
}

export const ImageGalleryView: FunctionComponent<Props> = ({imageGallery}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">{imageGallery.title}</h1>
            <p className="text-gray-700 mb-4">{formatDateReadable(imageGallery.date)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {imageGallery.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-md">
                        <img
                            src={image.path}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}