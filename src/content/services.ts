import inspect_preview from "../assets/images/inspection.webp";
import deep_cleaning_preview from "../assets/images/deep_clean.webp";
import scope_mount_preview from "../assets/images/scope_mounting.webp";
import type { TranslationFileKey } from "../utils/content/translation";
import basic_cleaning_preview from "../assets/images/basic_clean.webp";
import hydrographics_preview from "../assets/images/hyrdrographics.webp";
import part_installation_preview from "../assets/images/part_installation.webp";
import ultrasonic_cleaning_preview from "../assets/images/ultrasonic_clean.webp";
import scope_ring_lapping_preview from "../assets/images/scope_ring_lapping.webp";

interface Service {
    preview_image: ImageMetadata;
    name_translation_key: TranslationFileKey["services"];
    description_translation_key: TranslationFileKey["services"];
    cost: number;
};

const minimum_service_hours: number = 2
const labor_cost_per_hour_usd: number = 25.00

const services: Service[] = [
    {
        preview_image: inspect_preview,
        name_translation_key: "inspect_title",
        description_translation_key: "inspect_description",
        cost: 0.00
    }, {
        preview_image: scope_mount_preview,
        name_translation_key: "scope_mount_title",
        description_translation_key: "scope_mount_description",
        cost: 25.00
    }, {
        preview_image: part_installation_preview,
        name_translation_key: "part_installation_title",
        description_translation_key: "part_installation_description",
        cost: 50.00
    }, {
        preview_image: scope_ring_lapping_preview,
        name_translation_key: "scope_ring_lapping_title",
        description_translation_key: "scope_ring_lapping_description",
        cost: 50.00
    }, {
        preview_image: basic_cleaning_preview,
        name_translation_key: "basic_cleaning_title",
        description_translation_key: "basic_cleaning_description",
        cost: 30.00
    }, {
        preview_image: deep_cleaning_preview,
        name_translation_key: "deep_cleaning_title",
        description_translation_key: "deep_cleaning_description",
        cost: 50.00
    }, {
        preview_image: ultrasonic_cleaning_preview,
        name_translation_key: "ultrasonic_cleaning_title",
        description_translation_key: "ultrasonic_cleaning_description",
        cost: 75.00
    }, {
        preview_image: hydrographics_preview,
        name_translation_key: "hydrographics_title",
        description_translation_key: "hydrographics_description",
        cost: 200.00
    }
];

export { type Service, minimum_service_hours, labor_cost_per_hour_usd };
export default services;