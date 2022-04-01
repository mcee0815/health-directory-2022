
export const getStaticPaths = async() => {
    const res = await fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json`)
    const data = await res.json();
    
    const paths = data.map(place => {
        return {
            params:{ id:place.fac_id}
        }
    })

    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async (context) =>
{
    const id  = context.params.id
    const res = await fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json?/${id}`)
    const data = await res.json()
    console.log("res.json()")
    return {
        props:{ place:data }
    }
}

const Details = ({place}) => {
    return(
        <div>
            <h2>Place Details</h2>
            <h3>{place.facility_name}</h3>
        </div>
    )
}

export default Details