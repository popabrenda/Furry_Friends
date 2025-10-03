import React, { useEffect, useState } from 'react';
import { getPicturesByAnimalId } from '../utils/animal_picture-rest-calls.js';
import logoImage from '../images/FurryFriends-Logo.png';

import styles from "./AnimalDetails.module.css";

const AnimalDetails = ({animal}) => {
   const [animal_pictures, setAnimal_Pictures] = useState([]);

   // if (!animal) {
   //      return <div>Loading...</div>;  // Show loading state while animal details are being fetched
   //  }
    useEffect(() => {
        if (animal?.id) {
            getPicturesByAnimalId(animal.id)
                .then((pictures) => setAnimal_Pictures(pictures))
                .catch((error) => console.error('Error fetching pictures:', error));
        }
    }, [animal?.id]);

    // useEffect(() => {
    //     if(animal?.id){
    //         getPicturesByAnimalId(animal.id)
    //             .then((animal_pictures) => {setAnimal_Pictures(animal_pictures)})
    //             // console.log('Animal id', animal.id)})
    //             .catch((error) => console.log('Error while fetching animal pictures', error));
    //     }
    //
    //    }, [animal?.id]);

    console.log('Animal pictures', animal_pictures);

    return (
        <div className={styles.animal}>
            <img
                className={styles.animalChild}
                alt=""
                src={animal_pictures.length > 0 ? `data:image/png;base64,${animal_pictures[0].pictureData}` : logoImage}/>
            <img className={styles.moreHorizontalIcon} alt="" src="src/icons/UserDetails/More_Horizontal.svg"/>
            <div className={styles.detailsParent}>
                <div className={styles.details}>Details</div>
                <div className={styles.frameDiv}>
                    <div className={styles.pawParent}>
                        <img className={styles.sizeIcon} alt="" src="src/icons/AnimalDetails/paw.svg"/>
                        <div className={styles.primary}>{animal.type.breed || "Unknown Breed"}</div>
                    </div>
                    <div className={styles.sizeParent}>
                        <img className={styles.sizeIcon} alt="" src="src/icons/AnimalDetails/size.svg"/>
                        <div className={styles.primary}>{animal.type.size_category || "Unknown Size"}</div>
                    </div>
                </div>
            </div>
            <div className={styles.animalItem}/>
            <div className={styles.dailyCareRequirementParent}>
                <div className={styles.details}>Daily care requirement</div>
                <div className={styles.egLowMedium}>{animal.type.daily_care_requirement || "Unknown Care Level"}</div>
            </div>
            <div className={styles.frameParent1}>
                <div className={styles.nameParent}>
                    <div className={styles.primary}>{animal.name || "Unknown Name"}</div>
                    <img className={styles.sizeIcon} alt="" src="src/icons/AnimalDetails/help.svg"/>
                </div>
                <div className={styles.species}>{animal.type.species || "Unknown Species"}</div>
            </div>
        </div>
    );
};

export default AnimalDetails;

