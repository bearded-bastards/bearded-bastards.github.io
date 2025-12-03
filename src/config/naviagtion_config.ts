import type { TranslationFileKey } from "../utils/content/translation";

interface NavigationLink {
    common_translation_key: TranslationFileKey["common"];
    href: string;
};

const home_link: NavigationLink = {
    common_translation_key: "nav_home",
    href: "#hero-section",
};

const about_link: NavigationLink = {
    common_translation_key: "nav_about",
    href: "#about-section",
};

const certifications_link: NavigationLink = {
    common_translation_key: "nav_certifications",
    href: "#certifications-section",
};

const services_link: NavigationLink = {
    common_translation_key: "nav_services",
    href: "#services-section",
};

const contact_link: NavigationLink = {
    common_translation_key: "nav_contact",
    href: "#contact-section",
};

const navigation_links: NavigationLink[] = [
    home_link,
    about_link,
    certifications_link,
    services_link,
    contact_link
];

export { type NavigationLink, home_link, about_link, certifications_link, services_link, contact_link };
export default navigation_links;