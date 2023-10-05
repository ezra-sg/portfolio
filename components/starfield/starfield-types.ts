export interface StarData {
    x: number;
    y: number;
    size: number;
    color: string;
    parallax: number;
}

// a cache of vertices used to draw individual stars
export type VertexCache = { [size: string]: [number, number][] };
