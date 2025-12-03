import type { TranslationFileKey } from "../utils/content/translation";

interface Service {
    preview_image: ImageMetadata;
    name_translation_key: TranslationFileKey["services"];
    description_translation_key: TranslationFileKey["services"];
};

const services: Service[] = [

];

export { type Service };
export default services;