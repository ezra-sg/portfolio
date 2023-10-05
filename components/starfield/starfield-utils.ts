import { StarData } from "./starfield-types";

export function initStars(document: Document, window: Window): StarData[] {
    const starColors = ['f4e1e1', 'ffd9bc', 'fffde8', 'edfeff', 'edf1ff', 'f7edff', 'ffffff']

    const starsPerInch = 10;
    const dpi = getDPI(document);
    const numberOfStars = starsPerInch * dpi;

    const stars: StarData[] = [];
    for (let i = 0; i < numberOfStars; i++) {
        const rawSize = Math.abs(getRandomNumberGaussian(0.2, 1));
        const size = Math.max(rawSize, 0.8);
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            size,
            parallax: Math.random(),
        });
    }

    return stars;
}

export function getDPI(doc: Document) {
    let div = doc.createElement('div');
    div.style.width = '1in';
    div.style.height = '1in';
    div.style.position = 'absolute';
    div.style.left = '-100%';
    div.style.top = '-100%';
    doc.body.appendChild(div);
    const dpi = div.offsetWidth;
    doc.body.removeChild(div);

    return dpi;
}

export function getRandomNumberGaussian(mean: number, standardDeviation: number) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num * standardDeviation + mean; // Translate to desired mean and standard deviation

    return num;
}
