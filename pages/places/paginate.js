import Link from "next/link";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./paginate.module.css"
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaMapMarker } from "@react-icons/all-files/fa/FaMapMarker";
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe";
import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaFax } from "@react-icons/all-files/fa/FaFax";

const PER_PAGE = 6;

export default function App({allPlaces}) {
  
    const [currentPage, setCurrentPage] = useState(0);
    const [places, setPlaces] = useState(allPlaces);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const fetchPlaces = async (query) => {
    const res = await fetch(`https://health.data.ny.gov/resource/vn5v-hh5r.json?fac_zip=${query}`)
    const newData = await res.json()
    console.log(newData)
    return setData(newData)
}
    const onSubmit = (e) => {
        e.preventDefault()
        fetchPlaces(query)
    }

  useEffect(() => {
    fetchData();
  }, []);

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    const fetchData = async () => {
    const res = await fetch("https://health.data.ny.gov/resource/vn5v-hh5r.json")
    const newData = await res.json()
        return setData(newData)

  }

  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  };


  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;


  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map(place => (
        <div className={styles.card} key={place.fac_id}>
            <h4 className={styles.cardTitle}>{place.facility_name}</h4>
            <div className={styles.cardBody}>
                <p className={styles.address}>{place.address1}, {place.operator_city},{place.operator_state}
                </p>
                <p>
                  
                  <span className={styles.fa}><FaPhone/></span>
                  <span>{formatPhoneNumber(place.fac_phone) || "Not Listed"}</span>
                </p>
                {
                <p>
                  <span className={styles.fa}><FaFax/></span>
                  <span> {formatPhoneNumber(place.fac_fax) || "Not Listed"}</span>
                </p>}
            </div >
            <div className={styles.actions}>
                <a className={styles.pin} href={`http://www.google.com/maps/place/${place.latitude},${place.longitude}`}>
                  <FaMapMarker/> Drive
                </a>
                
                {
                    place.web_site ? <a className={styles.website} target="_blank" href={`http://${place.web_site}`} ><FaGlobe/>  Web</a>
                    : ""
                }
                
            </div>
        </div>
    )) 

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div className="App">
      <div className={styles.form}>
            <form onSubmit={onSubmit} onChange={(e) => {
                  onChange(e)
              }}>
                  <input type="text" placeholder="Enter your zipcode" name="name" />
                  <button type="submit" className={styles.btn}><FaSearch/></button>
            </form>
      </div>
        
        <div className={styles.flexContainer}>
            {currentPageData.length > 0  ? currentPageData:<h3>No data found</h3>}
        </div>

        <div style={{margin:"0 auto"}}>
          <ReactPaginate
          previousLabel={"← "}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        </div>

      
      
      
    </div>
  );
}
