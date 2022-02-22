import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"


const NotFound = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 5000);
    },[])

    return(
        <div className="not-found">
            <h1>OOPS!</h1>
            <h2>Page Not Found</h2>
            <Link href="/"><a>Go Back</a></Link>
        </div>
        
    )
}

export default NotFound