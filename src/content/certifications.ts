import type { TranslationFileKey } from "../utils/content/translation";

interface Certification {
    title_translation_key: TranslationFileKey["certifications"];
    issuer_translation_key: TranslationFileKey["certifications"];
};

const certifications: Certification[] = [
    {
        title_translation_key: "example_title",
        issuer_translation_key: "example_institution"
    }, {
        title_translation_key: "example_title",
        issuer_translation_key: "example_institution"
    }, {
        title_translation_key: "example_title",
        issuer_translation_key: "example_institution"
    }, {
        title_translation_key: "example_title",
        issuer_translation_key: "example_institution"
    }
];

export { type Certification };
export default certifications;