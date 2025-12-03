const RIGHTS_TEXT_ID: string = "bbgs-footer-rights-container";

function updateRightsYear(): void {
    const rights_text_element: HTMLElement | null = document.getElementById(RIGHTS_TEXT_ID);

    if (rights_text_element === null) {
        throw new Error(`Element with ID '${RIGHTS_TEXT_ID}' not found.`);
    }

    const current_year: number = new Date().getFullYear();
    rights_text_element.textContent += ` ${current_year}`;
}

updateRightsYear();