class CustomDrawer extends HTMLElement {

    get open() {
      return this.hasAttribute('open');
    }

    set open(val) {
      if (val) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
      this.toggleDrawer();
    }

    constructor() {
      super();
      this.addEventListener('click', e => {
        this.toggleDrawer();
      });
    }

  }
  
  customElements.define('custom-drawer', CustomDrawer);