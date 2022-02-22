import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return(
        <nav>
            <div className="logo">
                <Image src="/vercel.svg" width={100} height={55}/>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/contact"><a>Contact</a></Link>
        </nav>
    )
}

export default Navbar