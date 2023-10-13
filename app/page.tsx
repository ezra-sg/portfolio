import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>Experiments</h1>
      <ul>
        <li>
          <Link href="/starfield?fps=true">Starfield</Link>
        </li>
        <li>
          <Link href="/val">Val</Link>
        </li>
      </ul>
    </>
  )
}
