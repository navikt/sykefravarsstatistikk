export function scrollToBanner() {
    let scrollHeight = 0;
    const header = document.querySelector('.siteheader');
    if (header) {
        scrollHeight = header.getBoundingClientRect().height;
    }
    setTimeout(() => {
        if (process.env.NODE_ENV !== 'test') {
            window.scrollTo(0, scrollHeight);
        }
    }, 0);
}
