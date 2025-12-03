import LAURELS from "../assets/icons/laurels.svg";

interface ContactInformation {
    icon: ImageMetadata;
    information: string;
    href: string;
};

const contact_information: ContactInformation[] = [
    {
        icon: LAURELS,
        information: "(405) 555-1234",
        href: "tel:+14055551234"
    }, {
        icon: LAURELS,
        information: "(405) 555-1234",
        href: "tel:+14055551234"
    }, {
        icon: LAURELS,
        information: "(405) 555-1234",
        href: "tel:+14055551234"
    }
];

export { type ContactInformation };
export default contact_information;