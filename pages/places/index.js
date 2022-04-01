import { useState } from "react"
import Link from "next/link"
import styles from "./places.module.css"

const Places = ({ allPlaces }) => {
    const [places, setPlaces] = useState(allPlaces);
    const [query, setQuery] = useState('');

    const fetchPlaces = async (query) => {
        const res = await fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json?fac_zip=${query}`)
        const newData = await res.json()
        return setPlaces(newData)
    }

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetchPlaces(query)
    }
    
    return(
        <>
       
        <div className={styles.form}>
            <form onSubmit={onSubmit} onChange={(e) => {
                onChange(e)
            }}>
                <input type="text" placeholder="Enter your zipcode" name="name" />
                <button type="submit" className={styles.btn}>Search</button>
            </form>
        </div>
        
        <div className={styles.flexContainer}>
        
        {
            places.length ?
             places.map(place => (
                <div className={styles.card} key={place.fac_id}>
                    <h4 className={styles.cardTitle}>{place.facility_name}</h4>
                    <div className={styles.cardBody}>
                        <p>{place.address1}</p>
                        <p>City: <strong>{place.operator_city}</strong>, {place.operator_state}</p>
                        <p>Tel: <strong>{place.fac_phone || "Not Listed"}</strong></p>
                        {<p>Fax: <strong>{place.fac_phone || "Not Listed"}</strong></p>}

                    </div>
                    <button className={styles.cardBtn}>Get Directions</button>
                </div>
            )
            ):<h3>No Places</h3>
        }
        </div>
        
        </>
    )
}

export default Places

export const getStaticProps = async () =>
{
    const res = await fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json`)
    const data = await res.json()
    

        return {
            props:{ allPlaces:data }
        }
}