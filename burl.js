class BURLElement extends HTMLElement {
  constructor() {
    super();

    if (!this.hasAttribute("href"))
      throw new Error("href attribute value missing");
  }

  #getFaviconLink(url) {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
  }

  #href = () => this.getAttribute("href");

  #getIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">  
    <path
      d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
    />
  </svg>`;
  }

  connectedCallback() {
    let urlHandler = new URL(this.#href());

    this.classList.add("burl");
    // creating essential elements
    const a = document.createElement("a");
    a.href = this.#href();
    if (this.hasAttribute("target")) {
      a.target = this.getAttribute("target");
    }
    // content
    const span = document.createElement("span");
    if (this.textContent.length > 0) {
      span.textContent = this.textContent;
      this.textContent = "";
    } else {
      span.textContent =
        urlHandler.pathname == "/" ? urlHandler.hostname : urlHandler.pathname;
      // max-width: 22ch;
      span.style.maxWidth = "22ch";
    }

    if (!this.hasAttribute("chip")) {
      // img
      if (!this.hasAttribute("no-icon")) {
        const img = document.createElement("img");
        if (this.hasAttribute("icon")) {
          img.src = this.getAttribute("icon");
        } else {
          img.src = this.#getFaviconLink(this.#href());
        }
        img.alt = urlHandler.href;
        a.appendChild(img);
      }
      a.appendChild(span);
      // icon
      if (!this.hasAttribute("no-indicator")) {
        const icon = document.createElement("div");
        icon.classList.add("icon");
        icon.innerHTML = this.#getIcon();

        a.appendChild(icon);
      }
    } else {
      a.appendChild(span);
    }
    // end
    this.appendChild(a);
  }
}

window.customElements.define("b-url", BURLElement);

/**
  @generated

<burl href="<link>">
   <a href="google.com">
      <img
         src="https://www.google.com/s2/favicons?domain=google.com&sz=64"
         alt="favicon"
         />
      <span>Google</span>
      <div class="icon">
         <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path
               d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
               />
         </svg>
      </div>
   </a>
</burl>
*/
