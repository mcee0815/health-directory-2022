import Link from "next/link"
export const getStaticProps = async () =>
{
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    return {
        props:{ ninjas:data }
    }
}

const Ninjas = ({ ninjas }) => {
    return(
        <>
        <h1>Ninja List Page</h1>
        {
            ninjas.map(ninja => (
                <div key={ninja.id}>
                    <Link href={`ninjas/${ninja.id}`} key={ninja.id}>
                        <a><h3>{ninja.name}</h3></a>
                    </Link>
                </div>
            ))
        }
        </>
    )
}

export default Ninjas