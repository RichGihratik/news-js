import { View } from '../../interfaces';

export class BurgerMenu implements View<undefined> {
    private btn: HTMLElement | null = null;
    private overlay: HTMLElement | null = null;
    private burgerMenu: HTMLElement | null = null;

    init() {
        this.btn = document.getElementById('burger-btn');
        this.overlay = document.getElementById('overlay');
        this.burgerMenu = document.getElementById('burger-menu');

        if (this.btn) this.btn.onclick = () => this.toggleMenu();
        if (this.overlay) this.overlay.onclick = () => this.toggleMenu();
    }

    draw() {
        // Do nothing...
    }

    private toggleMenu() {
        if (this.overlay && this.burgerMenu) {
            this.overlay.classList.toggle('overlay_hidden');
            this.burgerMenu.classList.toggle('burger-menu_hidden');
        } else throw new Error('Burger menu elements was not found!');
    }
}
